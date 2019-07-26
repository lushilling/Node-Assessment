const express = require("express");
const router = express.Router();
const Login = require("../models/schema");
const bcrypt = require("bcryptjs");
// const _=require("lodash");
// const loginValidation = require("../validator/validator");



// @route   GET login/test
// @desc    Tests route
// @access  Public
router.get("/test", (req, res) => {
    res.json({
        message: "Login route works"
    });
});

//@route   GET name/all
//@desc    Get all usernames
//@access  Public
router.get("/all", (req, res) => {
    const errors = {};
    Login.find({}, '-password')
        .then(logins => {
            if (!logins) {
                errors.onLogins = "There are no users";
                res.status((404).json(errors))
            }
            res.json(logins);
        })
        .catch(err => res.status(404).json({ Message: "There are no users" }));
});

// @route   POST name/addUser
// @desc    Add user
// @access  Public
router.post("/create", (req, res) =>{
    const login = new Login({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(login.password, salt, (err, hash) =>{
            if (err) throw err;
            login.password = hash;
            login.save()
            .then(() => {
                res.json(login)
            })
            .catch(err => res.status(404).json(err));
        });
    });
});

// @route   DELETE name/deleteUsername
// @desc    Delete items from one username
// @access  Public
router.delete("/delete", (req, res) => {
    Login.deleteOne({'email': req.body.email})
    .then(({ok, n}) => {
        res.json({ Login: "Deleted :)" });
    })
      .catch(err => res.status(404).json({ Message: "Can not delete login" }));
  });

module.exports = router;