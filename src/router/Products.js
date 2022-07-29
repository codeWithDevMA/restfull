const express = require("express");
const rout = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/checkAuth");
const Products=require('../controllers/Products')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 40,
  },
  fileFilter: fileFilter,
});
/*-----------------------------getting all  product-----------------------------*/
rout.get("/",Products.get_product_id);
/*-----------------------------posting a product-----------------------------*/
rout.post("/", checkAuth,upload.single("productImage")
, Products.post_product);
/*-----------------------------getting  product-----------------------------*/
rout.get("/:productId", Products.get_product);
/*-----------------------------update product-----------------------------*/
rout.patch("/:productId",Products.patch_product);
/*-----------------------------delete product-----------------------------*/
rout.delete("/:delete", Products.delete_product);
module.exports = rout;
