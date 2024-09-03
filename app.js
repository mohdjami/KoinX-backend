import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cron from "node-cron";
import userRouter from "./routes/userRouter.js";
import globalErrorHandler from "./utils/errorHandler.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import bodyParser from "body-parser";
import axios from "axios";
import Ethereum from "./models/EtheriumPrice.js";
import expensRouter from "./routes/expenseRoutes.js";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import { acquireLock, releaseLock } from "./utils/redis.js";
import AppError from "./utils/appError.js";
import redis from "./utils/redis.js";

const app = express();
//DB Connection
export const db = process.env.MONGO_URI;
mongoose.connect(db).then(() => {
  console.log("Connected to MongoDB");
});

//Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

//Cron Job
cron.schedule("*/10 * * * *", async () => {
  console.log("Cron job started");
  const lock = "ethPriceFetchLock";
  const ttl = 1000 * 60 * 10;
  try {
    const isLocked = await acquireLock(lock, ttl);
    if (!isLocked) {
      console.log(
        "Another instance is already fetching Ethereum price. Skipping this run."
      );
      return;
    }
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
    );
    const price = response.data.ethereum.inr;
    await Ethereum.create({
      price,
    });
    await redis.set("etherium Price", price);
  } catch (error) {
    console.error("Error fetching Ethereum price", error);
  } finally {
    await releaseLock(lock);
  }
});

//Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/users", userRouter);
app.use("/api/transactions", transactionRoutes);
app.use("/api/expenses", expensRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
