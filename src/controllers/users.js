const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.Login=async(req, res, next) => {
    try {
      const data =await User.find(req.body.email);
      if (!data) return res.status(404).send("user not found");
      const isPassword=await bcrypt.compare(req.body.password, data.password);
      if (!isPassword) return res.status(404).send("invalid password ");
      const token = jwt.sign(
        { message: "valid id", data: data },
        prooces.env.jwt_key,
        { expiresIn: "1h" })
      return res.status(202).json(token);
    } catch (error) {
      return res.status(404).send(`${error}`);
    }
  }
  ///////////////////////////////
  exports.Signup= async (req, res) => {
    try {
      const isUser=await User.find({ email: req.body.email })
        if (isUser.length>=1) return res.status(202).send("this mail exist");
        const hasPassword=await bcrypt.hash(req.body.password, 10)
        if (!hasPassword) return res.status(404).json("error:err");     
        const user = new User({
          email: req.body.email,
          password: hash,
        });
        const data=await user.save()
        res.status(202).json({ message: "signup  successfuly ", doc: data });
    } catch (error) {
      return res.status(404).json("error:error");
    }
  }
  ////////////////////////
  exports.GetAll=async (req, res, next) => {
    try {
      const data =await  User.find();
      id(!data);
      res.status(404).send("user does'nt exist");
      res.status(202).json(data);
    } catch (error) {
      return res.status(404).send("${error}");
    }
  }
  //////////////////////
  exports.DeleteUser=async  (req, res, next) => {
    try {
      const _id = req.params.delete;
      if (!mongoose.Types.ObjectId(_id))
        return res.status(200).send("invalid id");
      const data_removed =await  User.findByIdAndDelete({ _id });
      if (!data_removed) {
        return res.status(404).send("this user doesn'nt exist");
      } else {
        return res
          .status(202)
          .json({ message: "this user deleted successfuly", data: data_removed });
      }
    } catch (error) {
      res.status(404).send("${error}");
    }
  }