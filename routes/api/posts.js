// Step 3: Posts will have routes
const express = require("express");
const router = express.Router();

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "Posts path works" });
});

// export router so server.js can pick it up
module.exports = router;
