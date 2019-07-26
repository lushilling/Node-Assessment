const express = require("express");
const router = express.Router();

//Add a user


// @route   GET item/test
// @desc    Tests route
// @access  Public
router.get("/test", (req, res) => {
    res.json({
      message: "Login route works"
    });
  });

module.exports = router;