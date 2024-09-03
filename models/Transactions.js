import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hash: {
    type: String,
    required: true,
    unique: true,
  },
  nonce: String,
  transactionIndex: String,
  from: String,
  to: String,
  value: String,
  gas: Number,
  gasPrice: Number,
  input: String,
  methodId: String,
  functionName: String,
  contractAddress: String,
  cumulativeGasUsed: String,
  txreceipt_status: String,
  gasUsed: Number,
  confirmations: String,
  isError: String,
  blockNumber: String,
  blockHash: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
