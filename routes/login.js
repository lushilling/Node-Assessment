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
    // const {errors, isValid} = userValidation(req.body);
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // };
    const newLogin = new Login {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    array.push(newLogin);

    res.send(array);

});

router.post("/addUser", (req, res) =>{
    const {errors, isValid} = userValidation(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    };
    const user = new User({
        username: req.body.username,
        content: req.body.content,
        email: req.body.email
    });
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.email, salt, (err, hash) =>{
            if (err) throw err;
            user.email = hash;
            user.save()
            .then(() => {
                res.json(user)
            })
            .catch(err => res.status(404).json(err));
        });
    });
});

