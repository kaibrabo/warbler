require("dotenv").load();
const jwt = require("jsonwebtoken");

// Authentication - user is logged in
exports.loginRequired = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if (decoded) {
        return next();
      } else {
        return next({
          status: 401,
          message: "Please log in first"
        });
      }
    });
  } catch (err) {
    return next({
      status: 401,
      message: "Please log in first"
    });
  }
};
// Authorization - correct user
exports.ensureCorrectUser = function(req, res, next) {};
