const express = require("express");
const router = express.Router();
const { Product } = require("../models/product");

router.get("/", async (req, res) => {
  Product.find(
    {},
    await function (err, products) {
      if (err || !products)
        return res.status(500).json({
          error: err,
          success: false,
        });
      res.send(products);
    }
  );
});

router.post("/", (req, res) => {
  const product = new Product({
    name: req.body.name,
    images: req.body.images,
    countInStock: req.body.countInStock,
  });
  product
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

router.delete("/", function (req, res) {
  const id = req.params.id;
  Product.findByIdAndDelete(id, function (err, product) {
    if (err) return console.log(err);
    res.send(product);
  });
});

module.exports = router;
