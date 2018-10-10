// all of our users routes, authentication, login, passport
// to use router we need to bring in express
const express = require("express");
const router = express.Router();
// we dont have to include '/api/users becuase thats done in server.js
// this api will output and serve json

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "Users path works" });
});

// export router so server.js can pick it up
module.exports = router;
