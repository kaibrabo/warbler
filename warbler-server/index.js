require("dotenv").config(); // loads environment variables
const express = require("express");
const app = express();
const cors = require("cors"); // important for making requests from another domain
const bodyParser = require("body-parser"); // allows use of form data via POST req.
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

// If there is any request from "/api/auth", use authRoutes
app.use("/api/auth", authRoutes);
app.use(
  "/api/users/:id/messages",
  loginRequired,
  ensureCorrectUser,
  messageRoutes
);

// all routes will be here
app.get("/api/messages", loginRequired, async function(req, res, next) {
  try {
    let messages = await db.Message.find()
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true,
        profileImageUrl: true
      });

      return res.status(200).json(messages);
  } catch (err) {
    return next(err);
  }
});

app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err); // passes err to express
});

app.use(errorHandler); // standard error handler before starting the server

app.listen(PORT, function() {
  console.log(`Server is starting on port ${PORT}`);
});
