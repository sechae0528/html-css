//app.js파일을 먼저 만들어주기.
//cmd창에서 app.js가 있는 폴더로 들어가기.
//npm 패키지 깔아주기.
//npm install express
//npm install mysql
//실행확인 node app.js
//npm install supervisor -g
var express = require('express');
var mysql = require('mysql');
var http = require('http');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
var server = http.createServer(app).listen(800);
var connection = mysql.createConnection({
  host: '127.0.0.1'
  , port : 3306
  , user : 'root'
  , password : 'root'
  , database : 'test'
});


//비행기목록
app.get('/getFlightListPage', function (req, res) {
  res.sendfile('getFlightListPage.html');
});

//비행기입력
app.get('/getInsertFlightPage', function (req, res) {
  res.sendfile('getInsertFlightPage.html');
});


//비행기 입력
app.post('/writePost', function (req, res) {
  var flightName = req.body.flightName;
  var departure = req.body.departure;
  var destination = req.body.destination;
  var departTime = req.body.departTime;
  var arrivalTime = req.body.arrivalTime;
  var aircraftCode = req.body.aircraftCode;
  var insertQuery = `insert into flight (flightName, departure, destination, departTime, arrivalTime, aircraftCode) values ('${flightName}','${departure}','${destination}','${departTime}','${arrivalTime}','${aircraftCode}')`;
  connection.query(insertQuery,
    function (err, rows, fields) {
      if (err) throw err;
      res.send("success");
      }
    )
    //res.send("success");
});

//비행기 목록
app.get('/getFlightList1', function (req, res) {
  var selecttQuery = `select a.flightName, a.departure, a.destination, a.departTime, a.arrivalTime, b.aircraftName, b.seats from flight a, aircraft b
	where a.aircraftCode = b.aircraftCode and a.departTime < now();`;
  connection.query(selecttQuery,
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows)
      }
    )
});

app.get('/getFlightList2', function (req, res) {
  var selecttQuery = `select a.flightName, a.departure, a.destination, a.departTime, a.arrivalTime, b.aircraftName, b.seats from flight a, aircraft b
	where a.aircraftCode = b.aircraftCode and a.departTime > now();`;
  connection.query(selecttQuery,
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows)
      }
    )
});
