//The Array To Store Weather Info(Temprature , Feeling)
weatherData = [];

// Require Express to run server and routes
const express =  require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup the Local Server
const myport = 3002;
const server = app.listen(myport,() => {console.log('Server is Running');console.log(`Listening on port: ${myport}`);});

//Get Weather Data Route
app.get('/data',getWeather);

//getWeather Data Implementation
function getWeather(req,res){
    //Send The Weather Data Info
    res.send(weatherData);
    //Empty the array to receive the new weather data in the next time
    weatherData = [];
}

//Post Weather Data Route
app.post('/add',saveWeather);

//saveWeather data Impelementation
function saveWeather(req,res){
    //Create Entity and fill it with the data server receive
    const data = {
        temp : req.body.temp,
        date : req.body.date,
        feel : req.body.feel
    };
    //push the entity into the array
    weatherData.push(data);
}