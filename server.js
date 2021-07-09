// Import dependencies
const express = require('express');

// body-parser midleware for parsing incoming request bodies to JSON
const bodyParser = require('body-parser');

// a package for providing midleware that can be used to enable CORS with various options
const cors = require('cors');

const path = require('path');

// Create a new express application named 'app'
const app = express();

// Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 5000;

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req,res,next)=>{
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
})

// Configure the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Configure the CORS middleware
app.use(cors());


// Require Route

const api = require('./routes/routes');

// Configure app to user route

app.use('/api/v1/', api);

// This middleware informs the express application to server our compiled React files
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));   
    });
}

// Catch any bad requests

app.get('*', (req, res)=>{
    res.status(200).json({
        msg: 'Catch All'
    });
});

// Configure our server to listen on the port defined by our port variable
app.listen(port, ()=> console.log(`Back_End_SERVICE_PORT: ${port}`));