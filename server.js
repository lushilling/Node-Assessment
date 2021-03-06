const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//connect to mongoose
mongoose.connect(
    'mongodb://localhost:27017/example',
    { userNewUrlParser: true }
).then(
    () => { console.log("connected to mongoose") },
    (err) => console.log(err)
);

//User login
const user = require("./routes/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", user);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));