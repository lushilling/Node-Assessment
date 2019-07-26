const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//User login
const login = require("./routes/login.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/login", login);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));