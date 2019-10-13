const db = require("../models"); // models/index.js
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next) {
  try {
    // Find a user
    let user = await db.User.findOne({
      email: req.body.email
    });
    let { id, username, profileImageUrl } = user;
    let isMatch = await user.comparePassword(req.body.password);

    // Check if password matches what was sent to the server
    if (isMatch) {
      let token = jwt.sign(
        {
          id,
          username,
          profileImageUrl
        },
        process.env.SECRET_KEY // Signs and verify's JWT
      );

      // If it all matches, log user in
      return (
        res.status(200).json({
          id,
          username,
          profileImageUrl,
          token
        })
      );
    } else {
      return next({
        status: 400,
        message: "Invalid Email and/or Password"
      });
    }
  } catch (e) {
    return next({
      status: 400,
      message: "Invalid Email and/or Password"
    });
  }
};

exports.signup = async function(req, res, next) {
  // Try/catch is useful for async funcs for error handling
  try {
    // Create a user (awaiting the promise to resolve)
    let user = await db.User.create(req.body);
    // Destructure user object
    let { id, username, profileImageUrl } = user;
    // Create a token (signing a token)
    let token = jwt.sign(
      {
        id,
        username,
        profileImageUrl
      },
      process.env.SECRET_KEY // ref. env variable
    );

    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    });
  } catch (err) {
    // See what kind of error:
    // If it's a certain error (validation fails),
    // respond with "username/email already taken"
    if (err.code === 11000) {
      err.message = "Sorry, that username and/or email is taken";
    }

    // Otherwise return a generic 400 w/ message
    return next({
      status: 400,
      message: err.message
    });
  }
};
