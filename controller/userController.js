import User from "../models/User.js";
import AppError from "../utils/appError.js";
export async function createUser(req, res, next) {
  const address = req.params.address;
  const userExists = await User.findOne({ address });
  console.log(userExists);
  await User.create({
    address: address,
  });
  res.send(`User address: ${address}`);
}
