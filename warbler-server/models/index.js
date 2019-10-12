const mongoose = require("mongoose");

mongoose.set("debug", true); // displays mongo queries in the terminal
mongoose.Promise = Promise; // native es2015 Promise library to negate a callback pattern
mongoose.connect("mongodb://localhost/warbler", {
  keepAlive: true,
  useNewUrlParser: true
});

module.exports.User = require("./user");