require("dotenv").config(); // loads environment variables
const express = require("express");
const app = express();
const cors = require("cors"); // important for making requests from another domain 
const bodyParser = require("body-parser"); // allows use of form data via POST req.
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");

const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

// If there is any request from "/api/auth",
// Use authRoutes
app.use("/api/auth", authRoutes);

// all routes will be here

app.use(function(req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);  // passes err to express
});

app.use(errorHandler); // standard error handler before starting the server

app.listen(PORT, function() {
    console.log(`Server is starting on port ${PORT}`);
});