const { config } = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv/config"); // important

const app = express();

//Router
const productsRouter = require("./routes/product");
const usersRouter = require("./routes/users");


//Network variables
const API = process.env.API_URL;
const port = 3000;

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

//API routes
app.use(`${API}/products`, productsRouter);
app.use(`${API}/users`, usersRouter);
// app.use(`${API}/products`, productsRouter);

//Connected to DataBase
mongoose
  .connect(process.env.DATA_BASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "e-shop",
  })
  .then(() => {
    console.log("DataBase is connected...");
  })
  .catch((err) => console.log(err));

//Server starting
app.listen(port, () => {
  console.log(API);
  console.log(`server listening on port ${port}`);
});
