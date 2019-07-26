const express = require("express");
const router = express.Router();
const Login = require("../models/schema");
const loginValidation = require("../validation/login");


// const bcrypt = require("bcryptjs");
// // const _=require("lodash");


// @route   GET login/test
// @desc    Tests route
// @access  Public
router.get("/test", (req, res) => {
    res.json({
        message: "Login route works"
    });
});

// @route   GET login/userDetails
// @desc    Get all items from user email and password
// @access  Public
router.get("/userDetails", (req, res) => {
    const {errors, isValid} = loginValidation(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    };
    Login.find({'email': req.body.email}, {'password': req.body.password}, '-password')
      .then(logins => {
        if (!logins) {
          errors.noLogins = "Incorrect details";
          res.status(404).json(errors);
        }
        res.json("Login Successful");
      })
      .catch(err => res.status(404).json({ Message: "User does not exist" }));
  });
  

// get user details from email and password and return success










// // @route   POST login/addUser
// // @desc    Add user
// // @access  Public
// router.post("/create", (req, res) =>{
//     const {errors, isValid} = loginValidation(req.body);
//     if (!isValid) {
//         return res.status(400).json(errors);
//     };
//     const login = new Login({
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password
//     });
//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(login.password, salt, (err, hash) =>{
//             if (err) throw err;
//             login.password = hash;
//             login.save()
//             .then(() => {
//                 res.json(login)
//             })
//             .catch(err => res.status(404).json(err));
//         });
//     });
// });

// // @route   DELETE login/deleteUsername
// // @desc    Delete items from one username
// // @access  Public
// router.delete("/delete", (req, res) => {
//     Login.deleteOne({'email': req.body.email})
//     .then(({ok, n}) => {
//         res.json({ Login: "Deleted :)" });
//     })
//       .catch(err => res.status(404).json({ Message: "Can not delete login" }));
//   });

module.exports = router;