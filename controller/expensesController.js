import Transaction from "../models/Transactions.js";
import User from "../models/User.js";
import redis from "../utils/redis.js";
import catchAsync from "../utils/catchAsync.js";
import Ethereum from "../models/EtheriumPrice.js";
import AppError from "../utils/appError.js";

export const getExpensesAndPrice = catchAsync(async (req, res) => {
  const { address } = req.query;
  //   console.log(address);
  const user = await User.findOne({
    address: address,
  });
  const aggregate = await Transaction.aggregate([
    {
      $match: {
        user: user._id,
      },
    },
    {
      $group: {
        _id: null,
        totalExpense: {
          $sum: {
            $divide: [{ $multiply: ["$gasPrice", "$gasUsed"] }, 1e18],
          },
        },
      },
    },
  ]);
  console.log(aggregate);
  const totalExpense = aggregate.length > 0 ? aggregate[0].totalExpense : 0;
  let price = await redis.get("etherium Price");
  if (!price) {
    price = await Ethereum.findOne().sort({ _id: -1 }).exec();
  }
  if (!price) {
    return next(new AppError("Price not found", 404));
  }
  res.json({ totalExpense, price });
});
