const express = require("express");
const cors = require("cors"); // epitrepei apo opoiodipote domain na trexei
const bodyParser = require('body-parser');
require('dotenv').config(); // vivliothiki //

//Require MongoDB connection and models
require("./config/database");

// Require Controllers
const PostsController = require("./controllers/PostsController");

//Initialize app
const app = express();
app.listen(process.env.PORT);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.send("Welcome");
});

app.get("/posts", PostsController.index);
