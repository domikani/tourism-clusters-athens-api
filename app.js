const express = require("express");
const cors = require("cors"); // allowed to run from every domain
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
const DuplicatesController = require("./controllers/DuplicatesController");
const AttractionsController = require("./controllers/AttractionsController");
const ClustersController = require("./controllers/ClustersController");
const StatisticController = require("./controllers/StatisticController");


//Initialize app
const app = express();
/*app.listen(process.env.PORT || 3000);*/
const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server started successfully")
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Home route
app.get("/", (req, res) => {
    res.send("Welcome");
});

//Posts route
app.post("/posts/request", PostsController.index);
app.get("/posts", PostsController.list);
app.get("/posts/update", UpdateController.update);
app.get("/posts/stats/years", YearsStatsController.yearStats);
app.get("/posts/stats/months", MonthsStatsController.monthsStats);
app.get("/posts/stats/countries", CountriesController.countries);
app.get("/posts/delete", DeleteController.cleanData);
app.get("/posts/duplicate", DuplicatesController.duplicates);
app.get("/posts/attractions", AttractionsController.attractions);
app.get("/posts/clusters", ClustersController.clusters);
app.get("/posts/statistics", StatisticController.statistics);



