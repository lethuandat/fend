// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8090;

// Spin up the server
const server = app.listen(port, listening);

// Callback to debug
function listening() {
    console.log(`Server running on localhost: ${port}`);
}

// Initialize all route with a callback function
const getAll = (request, response) => response.status(200).send(projectData);
const postData = (request, response) => {
    projectData = request.body;
    response.status(200).send(projectData);
};

// Callback function to complete GET '/all'
app.get("/all", getAll);

// Callback function to complete POST '/add'
app.post("/add", postData);




