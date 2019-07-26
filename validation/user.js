const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateUserInput(user) {
    let errors = {};

    // if these values are not present in the user object we are validating then they will be set to empty strings for the Validator.isEmpty
    user.username = !isEmpty(user.username) ? user.username : "";
    user.email = !isEmpty(user.email) ? user.email : "";
    user.password = !isEmpty(user.password) ? user.password : "";
    user.repeatPassword = !isEmpty(user.repeatPassword) ? user.repeatPassword : "";

    //username validation rules
    if (Validator.isEmpty(user.username)) {
        errors.username = "Username field is required";
    }

    if (!Validator.isLength(user.username, { min: 3, max: 20 })) {
        errors.username = "Username is invalid";
    }

    if (!Validator.isAlphanumeric(user.username)) {
        errors.username = "Username must contain only letters and numbers";
    }

    //email validation rules
    if (Validator.isEmpty(user.email)) {
        errors.email = "Email field is required";
    }

    if (!Validator.isLength(user.email, { min: 3, max: 320 })) {
        errors.email = "Email is invalid";
    }

    //password validation rules
    if (Validator.isEmpty(user.password)) {
        errors.password = "Password field is required";
    }

    if (!Validator.isLength(user.password, { min: 5, max: 100 })) {
        errors.password = "Password is invalid";
    }

    //password validation rules
    if (Validator.isEmpty(user.repeatPassword)) {
        errors.repeatPassword = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};