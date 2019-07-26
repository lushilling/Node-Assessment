const mongoose = require("mongoose")
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 320
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
});

let User = mongoose.model('users', UserSchema);

module.exports = User;