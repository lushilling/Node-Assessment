const mongoose = require("mongoose")
let Schema = mongoose.Schema;

let LoginSchema = new Schema({
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
        typr: String,
        required: true,
        minlength: 5
    }
});

let Login = mongoose.model('logins', LoginSchema);

module.exports = Login;