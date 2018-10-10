// create users profile
// location, bio, exp, edu, social network links, etc
// all will change cause its for insurance!
const express = require("express");
const router = express.Router();
// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "Profile path works" });
});

// export router so server.js can pick it up
module.exports = router;
