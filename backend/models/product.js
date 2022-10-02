const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: String,
    images: String,
    countInStock: {
      type: Number,
      required: false,
    },
  })

exports.Product =  mongoose.model("Product", productSchema);