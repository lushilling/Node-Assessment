const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(login) {
    let errors = {};

    // if these values are not present in the user object we are validating then they will be set to empty strings for the Validator.isEmpty
    login.email = !isEmpty(login.email) ? login.email : "";
    login.password = !isEmpty(login.password) ? login.password : "";

    //email validation rules
    if (Validator.isEmpty(login.email)) {
        errors.email = "Email field is required";
    }

    if (!Validator.isLength(login.email, { min: 3, max: 320 })) {
        errors.email = "Email is invalid";
    }

    //password validation rules
    if (Validator.isEmpty(login.password)) {
        errors.password = "Password field is required";
    }

    if (!Validator.isLength(login.username, { min: 5, max: 100 })) {
        errors.password = "Password is invalid";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};