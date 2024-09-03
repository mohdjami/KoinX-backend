import axios from "axios";
import User from "../models/User.js";
import Transaction from "../models/Transactions.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
const key = process.env.API_KEY;
const apiEndpoint = process.env.FETCH_TRANSACTION_API_ENDPOINT;
export const fetchTransactions = catchAsync(async (req, res, next) => {
  const address = req.params.address;
  if (!address) {
    return next(new AppError("Please provide address", 400));
  }
  if (!key || !apiEndpoint) {
    return next(new AppError("Please provide API_KEY and API_ENDPOINT", 400));
  }
  const response = await axios.get(
    `${process.env.FETCH_TRANSACTION_API_ENDPOINT}/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.API_KEY}`
  );
  const user = await User.findOne({
    address: address,
  });
  const transactions = response.data.result;
  const deleted = await Transaction.deleteMany();

  const bulkOps = transactions.map((item) => {
    item.user = user._id;
    return {
      updateOne: {
        filter: { hash: item.hash },
        update: { $setOnInsert: item },
        upsert: true,
      },
    };
  });

  await Transaction.bulkWrite(bulkOps);
  res.status(201).json({
    status: "success",
    data: {
      transactions,
    },
  });
});

export const getTransactions = catchAsync(async (req, res, next) => {
  const address = req.params.address;
  const user = await User.findOne({
    address: address,
  });
  const transactions = await Transaction.find({
    user: user._id,
  });
  res.status(200).json({
    status: "success",
    data: {
      transactions,
    },
  });
});

export const createTransaction = catchAsync(async (req, res, next) => {
  const address = req.params.address;
  if (!address) {
    return next(new AppError("Please provide address", 400));
  }
  const transaction = req.body;
  if (!transaction) {
    return next(new AppError("Please provide transaction", 400));
  }
  const user = await User.findOne({
    address: address,
  });
  transaction.user = user._id;
  await Transaction.create(transaction);
  res.send(transaction);
});
