const mongoose = require("mongoose");
const user = new mongoose.Schema({
  email: { type: String, required: true ,unique:true,match:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/},
  password: { type: String, required: true },
});
module.exports = mongoose.model("User", user);
