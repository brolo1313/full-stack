const { config } = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

require("dotenv/config");

const API = process.env.API_URL;
const port = 3000;

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

//Model product
const productSchema = mongoose.Schema({
  name: String,
  images: String,
  countInStock: {
    type: Number,
    required: true,
  },
})

const Product = mongoose.model('Product' , productSchema);


//APIs
app.get(`${API}/products`,async (req, res) => {
  Product.find({},await function(err, products){
 
    if(err || !products) return console.log(err);
    res.send(products)
});
});

app.post(`${API}/products`, (req, res) => {
  const product = new Product({
    name: req.body.name,
    images: req.body.images,
    countInStock: req.body.countInStock,

  })
  product.save().then( (createdProduct) => {
    res.status(201).json(createdProduct);
  }).catch( (err) => {
    res.status(500).json({
      error: err,
      success: false
    });
  })
});

app.delete(`${API}/products/:id`, function(req, res){
         
  const id = req.params.id;
  Product.findByIdAndDelete(id, function(err, product){
              
      if(err) return console.log(err);
      res.send(product);
  });
});



//Connected to DataBase
mongoose.connect(process.env.DATA_BASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'e-shop'
})
.then(() => {
  console.log('DataBase is connected...');
})
.catch(err => console.log(err))


//Server starting
app.listen(port, () => {
  console.log(API);
  console.log(`server listening on port ${port}`);
});
