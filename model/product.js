const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: String, min: [0, "wrong  price"], required: true },
  discountPercentage: {
    type: Number,
    min: [0, "wrong min discount got {VALUE}"],
    max: [50, "wrong max discount got {VALUE}"],
  },
  rating: {
    type: Number,
    min: [0, "wrong min rating got {VALUE}"],
    max: [5, "wrong max rating got {VALUE}"],
    default: 0,
  },
  stock: Number,
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: [String],
});

exports.Product = mongoose.model("Product", productSchema);
