const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");
/*-----------------------------get all orders-----------------------------*/
exports.get_order = async (req, res, next) => {
  try {
    const data = await Order.find().populate("product", "-__v").select("-__v");
    if (!data) return res.status(404).json({ message: "user not found" });
    return res.status(202).json({ data: data });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};
/*----------------------------- post orders-----------------------------*/

exports.post_order = async (req, res, next) => {
  try {
    const product_id = req.body.product_id;
    const isproduct = Product.findById(product_id);
    if (isproduct.lenght < 1) res.status(202).json("product not found");
    const order = new Order({
      product: req.body.product_id,
      quantity: req.body.quantity,
    });
    const result = await order.save();
    res.status(200).send({
      result: result,
      request: {
        type: "GET",
        url: "localhost:3000/order/" + result._id,
      },
    });
  } catch (error) {
    res.status(404).json({ message: "invalid id", error: err });
  }
};
/*-----------------------------get all orders-----------------------------*/
exports.patch_order = async (req, res, next) => {
  try {
    const _id = req.params.orderId;
    if (!mongoose.Types.ObjectId.isValid(_id))
      res.status(404).json({ message: "invalid id" });
    const data = await Order.findByIdAndUpdate(id, req.body, { new: true });
    if (!data) res.status(404).send("this id does'nt exist");
    res.status(200).json({
      message: "ordered updated",
      doc: data,
      request: {
        type: "GET",
        url: "localhost:3000/order",
      },
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

/*-----------------------------get all orders-----------------------------*/
exports.delete_order = async(req, res, next) => {
  try {
    const _id = req.params.delete;
    if (!mongoose.Types.ObjectId.isValid(_id))
      res.status(404).send("invalid id");
    const data =await Order.findByIdAndDelete({ _id });
    if (!data) res.status(404).send("this id doesn'nt exist");
    res.status(200).send({
      message: "oredered is deleted",
      doc: data,
      request: {
        type: "GET",
        url: "localhost:3000/order",
      },
    });
  } catch (error) {
    res.status(404).send("$err");
  }
};
