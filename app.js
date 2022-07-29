const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

//-----------------------------add routers paths-----------------------------//

const productsRouter = require("./src/router/Products");
const ordersRouter = require("./src/router/Orders");
const usersRouter = require("./src/router/Users");

//-----------------------------Connect with mongodb-----------------------------//

mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("mongo connected"))
  .catch((err) => console.log(err));

//-----------------------------middleware-----------------------------//

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("access-control-allow-origin", "*");
  res.header(
    "access-control-allow-headers",
    "origin,x-requested-with,content-type,accept,authorisation"
  );
  if (req.method === "options") {
    res.header("access-control-allow-methods", "PUT,PATCH,GET,POST,DELETE");
    res.json();
  }
  next();
});
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));

//-----------------------------Routers---------------------------//

app.use("/products",productsRouter);
app.use("/orders", ordersRouter);
app.use("/users", usersRouter);

//-----------------------------Handling errors---------------------//

app.use((req, res, next) => {
  const error = new Error("Not found");
  res.status(404);
  next(error);
});
app.use((error, req, res, next) => {
  res.status(500 | Error.status).json({
    message: error.message,
  });
});
module.exports = app;
