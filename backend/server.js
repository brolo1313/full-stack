const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.setHeader("Anything-i-wont", "Boo");

  res.statusCode = 200;
  res.send("New123222");
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
