const model = require("../model/product");
const Product = model.Product;

exports.createProduct = (req, res) => {
  const product = new Product(req.body);
  console.log(product._id);
  product
    .save()
    .then((doc) => {
      console.log("inside then");
      console.log(doc);
      res.status(201).json(doc);
    })
    .catch((err) => {
      console.log("inside error");
      console.log(err);
      res.status(400).json(err);
    });
};

exports.getAllProducts = async (req, res) => {
  // const products = await Product.find();
  // console.log(products);
  // res.json(products);

  Product.find()
    .then((products) => {
      console.log(products);
      res.json(products);
    })
    .catch((err) => console.log(err));
};

exports.getProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.status(201).json(product);
};

exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  const doc = await Product.findOneAndReplace({ _id: id }, req.body, {
    new: true,
  });
  res.status(201).json(doc);
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  const doc = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  res.status(201).json(doc);
};

exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOneAndDelete({ _id: id });
  console.log(product);
  res.status(201).json(product);
};
