const { config } = require("dotenv");
const express = require("express");
const morgan = require("morgan");

const app = express();

require("dotenv/config");

const API = process.env.API_URL;
const port = 3000;

app.use(morgan("tiny"));
app.use(express.json());

app.get(`${API}/products`, (req, res) => {
  res.setHeader("Anything-i-wont", "Boo");
  const product = {
    id: 12,
    name: "Product",
    images: "http://localhost",
  };
  res.send(product);
});

app.post(`${API}/products`, (req, res) => {
  const newProduct = req.body;
  console.log(newProduct);
  res.send(newProduct);
});

app.listen(port, () => {
  console.log(API);
  console.log(`server listening on port ${port}`);
});
