import Transaction from "../models/Transactions.js";
import mongoose from "mongoose";
import db from "../app.js";
export async function updateData() {
  await mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const transactions = await Transaction.find({});

  for (const tx of transactions) {
    tx.gas = Number(tx.gas);
    tx.gasPrice = Number(tx.gasPrice);
    tx.gasUsed = Number(tx.gasUsed);

    await tx.save();
  }

  console.log("Data update complete.");
  mongoose.disconnect();
}
