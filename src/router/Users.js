const express = require("express");
const router = express.Router();
const UserController=require('../controllers/users')
const checkAuth=require('../middleware/checkAuth')
/*----------------------------- router user-----------------------------*/
router.post("/signup",UserController.Signup);
/*----------------------------- get user-----------------------------*/
router.get("/",checkAuth,UserController.GetAll );
/*----------------------------- delete user-----------------------------*/
router.delete("/:delete",checkAuth,UserController.DeleteUser);
/*----------------------------- sign up-----------------------------*/
router.post("/signin",UserController.Login);

module.exports = router;
