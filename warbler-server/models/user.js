const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImageUrl: {
    type: String
  }
});

// Hashing Password
userSchema.pre("save", async function(next) {
  try {
    // If pwd has not been modified, move on
    if (!this.isModified("password")) {
      return next();
    }

    // Create hash pwd
    let hashedPassword = await bcrypt.hash(this.password, 10);
    // Set pwd to user document (obj)
    this.password = hashedPassword;
    // Move on
    return next();
  } catch {
    // Otherwise send to error handler
    return next(err);
  }
});

// Helper func. for user password
userSchema.method.comparePassword = async function(candidatePassword, next) {
  // Compares bcrypt pwd to user pwd
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch(err) {
    // Otherwise send to error handler
    return next(err);
  }
}

const User = mongoose.model("User", userSchema);

module.exports = User;
