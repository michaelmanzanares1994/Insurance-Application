// Step 1: Use Express to set up and run the server (in server.js)
const express = require("express");

// Step 2: Connect to MongoDB through mongoose (in server.js)
const mongoose = require("mongoose");

// Step 3: Develop route files with Express Router
const posts = require("./routes/api/posts");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");

// Step 4: Develop models (in models)

// Step 5A: Bring in body parser for registration functionality(in api > users > registration route)
const bodyParser = require("body-parser");

// Step 6: Login functionality (in api > users > login route)

// Step 7: Json Web token security (in api > users > login route)

// Step 8: Bring in passport. This validates and pulls user info from token.
const passport = require("passport");

const app = express();

// Step 5A: Body parser middlewear
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Step 2A: DB config requires the connection string
const db = require("./config/keys").mongoURI;

// Step 2B: Connect to MongoDB through mongoose
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then((req, res) => console.log("MongoDB connected successfully"))
  .catch(err => console.log(err));

// Step 8A: Passport middleware and Passport Config. Pass in passport
app.use(passport.initialize());
require("./config/passport")(passport);

// Step 9: Validation (in validation)

// Step 3: Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Step 1A: Run on horuku or port 50000
const port = process.env.PORT || 5000;

// Step 1B: Listen to the port
app.listen(port, () => console.log(`Server running on port ${port}`));
