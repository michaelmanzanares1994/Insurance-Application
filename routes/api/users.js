// Step 3: Develop Route files: user routes and all of our authentication, login, passport
// To use router we need to bring in express
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

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "Users path works" });
});

// @route   GET api/users/register (Step 5)
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  // looking for a recod that the user is trying to register with
  // to use req.body, we need body parser in server.js
  // Map the passed in email with saved emails
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

// @route   GET api/users/login (Step 6: Login functionality)
// @desc    Login user
// @access  Public
router.post("/login", (req, res) => {
  // User will send form which will be in req.body
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email })
    // Check for user in mongodb by email
    .then(user => {
      if (!user) {
        res.status(404).json({ email: "User not found." });
      }
      // Compare unhashed password with hashed password to see if password is correct
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          //res.json({ msg: "Success" });
          // User matched. Sign the token (Step 7) sign() will take in payload(user info), key and expiration and return JWT in response
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
          res.status(400).json({ password: "Password incorrect" });
        }
      });
    });
});

module.exports = router;
