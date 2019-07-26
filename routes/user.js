const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const userValidation = require("../validation/user");

// @route   GET user/test
// @desc    Tests route
// @access  Public
router.get("/test", (req, res) => {
    res.json({
        message: "User route works"
    });
});

// @route    POST user/register
// desc      Add a user
// @access   PUBLIC
// router.post("/register", (req, res) => {
//     const { errors, isValid } = userValidation(req.body);
//     if (!isValid) {
//         return res.status(400).json(errors);
//     };
//     const user = new User({
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//     });
//     let repeatPassword = req.body.repeatPassword;
//     User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] }).then(findUser => {
//         if (findUser.length != 0) {
//             if (repeatPassword === user.password) {
//                 bcrypt.genSalt(10, (err, salt) => {
//                     bcrypt.hash(user.password, salt, (err, hash) => {
//                         if (err) throw err;
//                         user.password = hash;
//                         user.save()
//                             .then(() => {
//                                 res.json(user)
//                             })
//                             .catch(err => res.status(404).json(err));
//                     });
//                 });
//             } else res.json("Passwords do not match")
//         } else { res.json("User already exists") };
//     }).catch(err => res.status(404).json(err));
// });


router.post("/register", (req, res) => {
    const { errors, isValid } = userValidation(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    };
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    let repeatPassword = req.body.repeatPassword;
    User.find({ $or: [{ username: req.body.username }, { email: req.body.email }] }).then(findUser => {
        if (findUser.length != 0) {
            res.json({ "User already exists" })
        }
        else {
            if (repeatPassword === user.password) {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
                        user.save()
                            .then(() => {
                                res.json(user)
                            })
                            .catch(err => res.status(404).json(err));
                    });
                });
            } else res.json("Passwords do not match")
        }).catch(err => res.status(404).json(err));

});

// @route   GET user/login
// @desc    Get all items from user email and password
// @access  Public
router.get("/login", (req, res) => {
    let errorlog = {};
    User.findOne({ email: req.body.email }).then(user => {
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if (isMatch) {
                console.log(user);
                res.json("Login Successful")
            } else {
                errorlog.password = "Password Incorrect";
                return res.status(400).json(errorlog);
            }
        })
            .catch(err => res.status(404).json(err));
    }).catch(err => res.status(404).json(err));
});

// @route   DELETE user/delete
// @desc    Delete items from one user email
// @access  Public
router.delete("/delete", (req, res) => {
    User.deleteOne({ 'email': req.body.email })
        .then(({ ok, n }) => {
            res.json({ Login: "Deleted :)" });
        })
        .catch(err => res.status(404).json({ Message: "Can not delete login" }));
});

// @route   PUT user/update
// @desc    Update items from one username
// @access  Public
router.put("/update", (req, res) => {
    User.replaceOne({ 'email': req.body.email },
        { 'username': req.body.username, 'email': req.body.email, 'password': req.body.password })
        .then(({ ok, n }) => {
            res.json({ noUsers: "updated :)" });
        })
        .catch(err => res.status(404).json({ Message: "User can not be updated" }));
});

//@route   GET user/all
//@desc    Get all usernames
//@access  Public
router.get("/all", (req, res) => {
    const errors = {};
    User.find({}, '-password')
        .then(users => {
            if (!users) {
                errors.onUsers = "There are no users";
                res.status((404).json(errors))
            }
            res.json(users);
        })
        .catch(err => res.status(404).json({ Message: "There are no users" }));
});

module.exports = router;