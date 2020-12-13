//const { url } = require("inspector");

/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',us&appid=bae4607475c5b1f680537d0dfbfb4994';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Link The Generate Button with an Event Listener
document.getElementById('generate').addEventListener('click',generateWeather);
function generateWeather(e){
    const zipCode = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
    fetchWeather(baseURL , zipCode , apiKey).then(function(data)
    {
    postWeatherData('/add',{date:d ,temp:data.main['temp'],feel:feeling});
    displayWeather();
    });

}
//Get Weather Function that fetch the api to get weather by zip code
const fetchWeather = async(URL , Zip , Key) => {
    const res = await fetch(URL+Zip+Key);
    try{
        const data = await res.json();
        return data;
    }catch(err){
        console.log(err);
    }
}
//Post Weather Data Function
const postWeatherData = async(url='',data={}) => {
    const res = await fetch(url ,{
        method:'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    });
    try{
        const myres = await res.json();
        return myres;
    }catch(err){
        console.log(err);
    }
}
//Display Weather Info Function
const displayWeather = async() => {
    const request = await fetch('/data');
    try{
        const mydata = await request.json();
        document.getElementById('temp').innerHTML = mydata[0].temp;
        document.getElementById('date').innerHTML = mydata[0].date;
        document.getElementById('content').innerHTML = mydata[0].feel;
        //console.log(weatherData);
        //Update My Webpage With Weather Attributes
    }catch(err){
        console.log(err);
    }
}