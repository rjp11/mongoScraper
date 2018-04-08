var express = require("express");
var bodyParser = require("body-parser");
var exprhbs = require("express-handlebars");
var routes = require("./routes");
var mongoose = require("mongoose");
var logger = require("morgan");
var cheerio = require("cheerio");

// Initialize Express
var PORT = process.env.PORT || 3000;
var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static content for the app from the "public" directory in the application directory.
//app.use(express.static("public"));

app.engine("handlebars", exprhbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper"
mongoose.connect(MONGODB_URI);


// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);
app.use(routes);



// Listen on port 3000
app.listen(PORT, function () {
    console.log("Listening on port %s", PORT);
});