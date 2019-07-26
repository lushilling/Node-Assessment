const express = require("express");
const router = express.Router();

let array = []; //Delete later on

// @route   GET login/test
// @desc    Tests route
// @access  Public
router.get("/test", (req, res) => {
    res.json({
        message: "Login route works"
    });
});

//Add user
// @route   POST login/create
// @desc    Create a user
// @access  Public
router.post("/create", (res, req) => {

    const newLogin = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    array.push(newLogin);

    res.send("success");

});


// @route   GET login/all
// @desc    Get all items
// @access  Public

router.get("/all", (req, res) => {
    res.send(array);
});


module.exports = router;