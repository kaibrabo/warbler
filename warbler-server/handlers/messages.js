const db = require("../models");

exports.createMessage = async function(req, res, next) {
  try {
    // Creates message
    let message = await db.Message.create({
      text: req.body.text,
      user: req.params.id
    });

    // Finds user
    let foundUser = await db.User.findById(req.params.id);
    // Add message.id to user's message arr
    foundUser.messages.push(message.id);
    await foundUser.save();

    let foundMessage = await db.Message.findById(message._id).populate("user", {
      username: true,
      profileImageUrl: true
    });

    let successfulMessage = await res.status(200).json(foundMessage);

    return successfulMessage;
  } catch (err) {
      return next(err);
  };
};

exports.getMessage = async function(req, res, next) {};

exports.deleteMessage = async function(req, res, next) {};
