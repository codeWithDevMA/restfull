const mongoose = require("mongoose");
const product_shcema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  productImage: { type: String, required: true },
});
module.exports = mongoose.model("db_product", product_shcema);
