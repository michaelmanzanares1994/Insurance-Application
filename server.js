/*
Creating a full stack application, for insurance
================================================
Step 0A: Initialize React application
$ npm init

Step 0B: Install dependencies and developer dependency that updates app after changes
$ npm i express mongoose passport passport-jwt jsonwebtoken body-parser bcryptjs validator
$ npm i -D nodemon

Step 1: Use Express to set up and run the server (in server.js)

Step 2: Connect to MongoDB through mongoose (in server.js using config > keys.js)

Step 3: Develop route files with Express Router (in routes)

Step 4: Develop models (in models)

Step 5: Develop Registration! Server side logic. Create register route. Accept users form data and register them into mongodb
Step 5A: Bring in body parser (in server.js)
Step 5B: Bring in gravatar (in routes > api > users)
Step 5C: Bring in bcrypt and hash the password (in routes > api > users)

Step 6: Develop Login logic and functionality: Create login route, accept users email, validate that it exists, validate password (in routes > api > users)

Step 7: jsonwebtoken. This creates token (in routes > api > users)

Step 8: passport. This validates and pulls user info from token 
Step 8A: passport middleware (in server.js)
Step 8B: passport stratgey (in config )


===========================================
*/

// Step 1: Use Express to set up and run the server (in server.js)
// Step 1A: Spin up a server using express
const express = require("express");

// Step 2: Connect to MongoDB through mongoose
const mongoose = require("mongoose");

// Step 3: Develop route files with Express Router
const posts = require("./routes/api/posts");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");

// Step 5A: registration (bring in body parser)
const bodyParser = require("body-parser");

// Step 8: bring in passport
const passport = require("passport");

const app = express();
// body parser middlewear
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config : requires the connection string
const db = require("./config/keys").mongoURI;

// Connect to MongoDB through mongoose
mongoose
  .connect(db)
  .then((req, res) => console.log("MongoDB connected successfully."))
  .catch(err => console.log(err));

// Passport middleware (step 8A)
app.use(passport.initialize());
// Passport Config and pass in passport
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Run on port 50000
const port = process.env.PORT || 5000;
// Listen to the port
app.listen(port, () => console.log(`Server running on port ${port}.`));

/*
Insurance app design
=======================================================================================================
Design Walkthrough
------------------
An agent logs on
Agent sees a dashboard with pending and finished policies
Agent can click on a pending policy finished policy
  Pending Policy Page will bring up the Transaction Page
  Transaction Page will have Customers Details, Vechicle Details, Coverage Details.
    On Form Submit, Coverage Package Details will be calculated
  If New Buisness, there will be Bind Details as well
If Finished Policy, Transaction Summay will dispaly

------------
Server Side
------------
Models
------
Agent (instead of user)
Customer 
Profile (of customer)
Profile (of agent)
Dashboard (for agent to view things like their number of customers, pending quotes/policies)
Quote (policy without binding or payment screen)
Policy

Routes
------
agents routes
  register agent
  login agent
  return agent

transactions (for quotes and policies)
  get all transactions
  get transaction by id
  create transaction
  delete transaction

profile routes
  get profile by agent id
  create or edit agent profile
  add education to agent profile
  delete agent and agent profile

calculations?
 might just be a helper class

--------------
--------------

--------------
Client Side
--------------

Actions
-------
types
authorization
transactions
profile

Components
----------
authorization
profile
profiles
transaction
transactions
layout
dashboard
common
edit-profile

Reducers
--------
index
errors
authorization
=======================================================================================================
*/
