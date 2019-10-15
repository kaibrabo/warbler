const mongoose = require("mongoose");
const User = require("./user");

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxLength: 160
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" // ref. User schema in db & user model
  }
});

// Remove hook
messageSchema.pre("remove", async function(next) {
  try {
    // Find a user
    let user = await User.findById(this.user);
    // Remove the id of message from messages list
    user.messages.remove(this.id);
    // Save user
    await user.save();
    // Return next
    return next();
  } catch (err) {
    return next(err);
  }
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
