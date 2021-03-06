// Step 3: Develop Route files: user routes and all of our authentication, login, passport
// Step 3A: To use router we need to bring in express
const express = require("express");
const router = express.Router();

// Step 5: Develop registration. Need to bring in user model, gravatar and bcrypt
// Step 5C: Bcrypt and hash the password
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

// Step 7: Bring in JWT
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Step 8C: Bring in Passport
const passport = require("passport");

// Step 9: Bring in validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "Users path works" });
});

// Step 5B: Register functionality
// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  // Step 9C: Check for errors by pulling errors object from validation > register.js
  const { errors, isValid } = validateRegisterInput(req.body);
  // return errors if isvalid is false
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // looking for a recod that the user is trying to register with
  // to use req.body, we need body parser in server.js
  // Map the passed-in email with saved emails
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      // Create new user following User model and pulling data from request body
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      // Step 5C: Generate salt which takes 10 characters, and we call a callback which takes in err if there is one, and returns salt
      bcrypt.genSalt(10, (err, salt) => {
        // Once we get salt, we hash the password by passing in the old password, the salt, and a callback.
        // if theres and error the callback will give it to us, else, it returns new password.
        // then we save the hashed password as the new password
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save() // mongoose method
            .then(user => res.json(user)) // Respond with newly created user
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// Step 6: Login functionality
// @route   POST api/users/login (Step 6: Login functionality)
// @desc    Login user
// @access  Public
router.post("/login", (req, res) => {
  // Step 9D: Check for errors by pulling errors object from validation > login.js
  const { errors, isValid } = validateLoginInput(req.body);
  // return errors if isvalid is false
  if (!isValid) {
    return res.status(404).json(errors);
  }

  // User will send form which will be in req.body
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email })
    // Check for user in mongodb by email
    .then(user => {
      if (!user) {
        errors.email = "User not found";
        res.status(404).json(errors);
      }
      // Compare unhashed password with hashed password to see if password is correct
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // Step 7: Sign the token with sign() which will take in payload(user info), key and expiration and return JWT in response
          // This creates token. The user is embedded in the token
          const payload = { id: user.id, name: user.name, avatar: user.avatar };
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          errors.password = "Password incorrect";
          res.status(400).json(errors);
        }
      });
    });
});

// @route   POST api/users/quote
// @desc    Create quote for user
// @access  Private

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // User now in request.user becuase of done() method in passport.js
    res.json(req.user);
  }
);

module.exports = router;
