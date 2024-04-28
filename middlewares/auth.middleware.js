const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.split("Bearer ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json(err);
  }
};
module.exports = {
  checkAuth,
};
