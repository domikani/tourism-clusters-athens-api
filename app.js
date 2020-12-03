const express = require("express");
const cors = require("cors"); // epitrepei apo opoiodipote domain na trexei
const bodyParser = require('body-parser');
require('dotenv').config(); // vivliothiki //

//Require MongoDB connection and models
require("./config/database");

// Require Controllers
const YearsStatsController = require("./controllers/YearsStatsController");
const PostsController = require("./controllers/PostsController");
const UpdateController = require("./controllers/UpdateController");
const CountriesController = require("./controllers/CountriesController");
const MonthsStatsController = require("./controllers/MonthsStatsController");
const DeleteController = require("./controllers/DeleteController");


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
app.post("/posts", PostsController.index);
/*app.get("/posts", PostsController.index);*/
/*app.get("/posts", PostsController.list);*/
app.get("/posts/update", UpdateController.update);
app.get("/posts/stats/years", YearsStatsController.yearStats);
app.get("/posts/stats/months", MonthsStatsController.monthsStats);
app.get("/posts/stats/countries", CountriesController.countries);
app.get("/posts/delete", DeleteController.cleanData);


