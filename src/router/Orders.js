const express = require("express");
const router = express.Router();
const Oreders=require('../controllers/Ordres')
/*-----------------------------get all orders-----------------------------*/
router.get("/",Oreders.get_order);
/*-----------------------------post order -----------------------------*/
router.post("/", Oreders.post_order);
/*-----------------------------update order-----------------------------*/
router.patch("/:orderId",Oreders.patch_order);
/*----------------------------delete order-----------------------------*/
router.delete("/:delete", Oreders.delete_order);
module.exports = router;