import express from "express";
import {
  createTransaction,
  fetchTransactions,
  getTransactions,
} from "../controller/transactionController.js";

const router = express.Router();

router.route("/:address").get(fetchTransactions).post(createTransaction);
router.get("/get/:address", getTransactions);

export default router;
