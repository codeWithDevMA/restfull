const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const auth = req.headers.authorisation.split(" ")[1];
    jwt.verify(auth, proccess.env.jwt_key);
    req.userdata = decoded;
    next();
  } catch (error) {
    return res.status(404).send("${error}");
  }
};
