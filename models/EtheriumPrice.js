import mongoose from "mongoose";
const EthereumPriceSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
const Ethereum = mongoose.model("EthereumPrice", EthereumPriceSchema);

export default Ethereum;
