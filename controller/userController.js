import User from "../models/User.js";
import AppError from "../utils/appError.js";
export async function createUser(req, res, next) {
  const address = req.params.address;
  const userExists = await User.findOne({ address });
  if (userExists) {
    return next(new AppError("User already exists", 400));
  }
  await User.create({
    address: address,
  });
  res.send(`User address: ${address}`);
}
