var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);


app.get('/test', function (req, res) {
  res.sendfile('test.html');
});


app.get('/getCarPrice', function (req, res) {
 //console.log(req.query.car);
 //console.log(req.query.color);
 var car = req.query.car;
 var color = req.query.color;

 var carPrice = [2100, 1300, 1500, 3500, 3200];
 var colorPrice = [100, 120, 200, 130, 80];

 var result = carPrice[car] + colorPrice[color] ;
  res.send(result+"만원");
});
