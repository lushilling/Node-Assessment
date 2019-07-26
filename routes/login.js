const express = require("express");
const router = express.Router();
const Login = require("../models/schema");
// const _=require("lodash");
// const loginValidation = require("../validator/validator");
// const bcrypt = require("bcryptjs");

let array = []; //Delete later on

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


//Add user
// @route   POST login/create
// @desc    Create a user
// @access  Public
router.post("/create", (req, res) => {
    // const {errors, isValid} = userValidation(req.body);
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // };
    const login = new Login({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    // bcrypt.genSalt(10, (err, salt) => {
    //     bcrypt.hash(user.email, salt, (err, hash) =>{
    //         if (err) throw err;
    //         user.email = hash;
    //         user.save()
    //         .then(() => {
    //             res.json(user)
    //         })
    //         .catch(err => res.status(404).json(err));
    //     });
    login.save().then(login => res.json(login))
    .catch(err => console.log(err));
});



module.exports = router;