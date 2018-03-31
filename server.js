const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();

const api = 'eb9754b841abdb27b4590ddfbf81282e';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('index', {weather: null, error: null});
});

app.post('/', function(req, res){
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`;
  request(url, function(err, response, body){
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    }else{
      let weather = JSON.parse(body);
      if(weather.main == null){
        res.render('index', {weather: null, error: 'Error, please try again'});
      }else{
        let message = `It's ${weather.main.temp} degree Celsius in ${weather.name}`;
        res.render('index', {weather: message, error: null});
      }
    }
  });
});

app.listen(9000, function(){
  console.log('Listening to port 9000');
});
