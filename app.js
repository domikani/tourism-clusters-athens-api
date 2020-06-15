const express = require("express");
const cors = require("cors"); // epitrepei apo opoiodipote domain na trexei
const bodyParser = require('body-parser');
require('dotenv').config(); // vivliothiki //

//Require MongoDB connection and models
require("./config/database");

// Require Controllers
/*const PostsController = require("./controllers/PostsController");*/
const YearsStatsController = require("./controllers/YearsStatsController");
const NewPostsController = require("./controllers/NewPostsController");


//Initialize app
const app = express();
app.listen(process.env.PORT);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Home route
app.get("/", (req, res) => {
    res.send("Welcome");
});

//Posts route
/*app.get("/posts/2010", PostsController.data2010);
app.post("/posts", PostsController.index);
app.get("/posts", PostsController.list);*/
app.get("/posts/stats/years", YearsStatsController.yearStats);
app.get("/posts/stats/years/months", YearsStatsController.monthsStats);
/*app.get ("/posts", NewPostsController.index);*/
app.post("/get", NewPostsController.index);
app.get("/posts", NewPostsController.list);
