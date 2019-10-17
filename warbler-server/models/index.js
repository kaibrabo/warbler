const mongoose = require("mongoose");

mongoose.set("debug", true); // displays mongo queries in the terminal
mongoose.Promise = Promise; // native es2015 Promise library to negate a callback pattern
mongoose.connect("mongodb://localhost/warbler", {
  keepAlive: true,
  useNewUrlParser: true // 'current URL string parser is deprecated' warning
});

mongoose.set('useCreateIndex', true); // 'collection.ensureIndex is deprecated' warning


module.exports.User = require("./user");
module.exports.Message = require("./message");
