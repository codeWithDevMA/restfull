const mongoose = require("mongoose");
const Product = require("../models/Product");
/*-----------------------------post orders-----------------------------*/
exports.get_product = (req, res, next) => {
  try {
    Product
      .find()
      .select("-__v")
      .exec()
      .then((doc) => {
        res.status(200).json(doc);
      });
  } catch (error) {
    res.status(500).json({ error: err });
  }
};
/*-----------------------------get all product-----------------------------*/
exports.post_product = (req, res) => {
  try {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      productImage: req.file.path,
    });
    product.save().then((doc) => {
      return res.status(202).json({
        message: "Created product successfuly",
        product: {
          doc: doc,
          request: {
            type: "GET",
            url: `http://localhost:3000/product/${doc._id}`,
          },
        },
      });
    });
  } catch (error) {
    res.status(404).send("${error}");
  }
};
/*-----------------------------patch a product-----------------------------*/
exports.patch_product = (req, res, next) => {
  try {
    const id = req.params.productId;
    Product.findByIdAndUpdate(id, req.body, { new: true }, (err, doc) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json(doc);
      }
    });
  } catch (error) {
    res.status(404).json("{$error");
  }
};
/*-----------------------------delete a product-----------------------------*/
exports.delete_product = async (req, res, next) => {
  try {
    const _id = req.params.delete;
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send(`No post with id: ${_id}`);
    const data = await Product.findByIdAndDelete({ _id: _id });
    return res.status(202).json({
      message: "product deleted successfully.",
      product_deleted: data,
    });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};
/*-----------------------------getting a product by id-----------------------------*/

exports.get_product_id = (req, res, next) => {
  try {
    const id = req.params.productId;
    Product
      .findById(id)
      .select("-__v")
      .exec()
      .then((doc) => {
        if (doc) {
          res.status(200).json(doc);
        } else {
          res.status(404).json({ message: "invalid id" });
        }
      });
  } catch (error) {
    res.status(500).json({
      error: err,
    });
  }
};
