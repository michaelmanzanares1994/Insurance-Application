/*
Creating a full stack insurance application
===========================================
Step 0A: Initialize React application
$ npm init

Step 0B: Install dependencies
$ npm i express mongoose passport passport-jwt jsonwebtoken body-parser bcryptjs validator

Step 0C: Install developer dependency that updated app after changes
$ npm i -D nodemon

Step 1: Use Express to set up and run the server (in server.js)

Step 2: Connect to MongoDB through mongoose (in server.js using config > keys.js)

Step 3: Develop route files with Express Router ()


===========================================
*/

// Step 1: Use Express to set up and run the server (in server.js)
// Step 1A: Spin up a server using express
const express = require("express");
const app = express();
// Simple route to show server is running when we visit this webpage
app.get("/", (req, res) => {
  res.send("Hello!");
});
// Run on port 50000
const port = process.env.PORT || 5000;
// Listen to the port
app.listen(port, () => console.log(`Server running on port ${port}.`));

// Step 2: Connect to MongoDB through mongoose
const mongoose = require("mongoose");
// DB config : requires the connection string
const db = require("./config/keys").mongoURI;
// Connect to MongoDB through mongoose
mongoose
  .connect(db)
  .then((req, res) => console.log("MongoDB connected successfully"))
  .catch(err => console.log(err));

// Step 3: Develop route files with Express Router
// Step 30: Bring them into server
const posts = require("./routes/api/posts");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
