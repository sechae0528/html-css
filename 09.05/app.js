var express = require('express');
var mysql = require('mysql');
var http = require('http');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

var connection = mysql.createConnection({
  host: '127.0.0.1'
  , port : 3306
  , user : 'root'
  , password : 'root'
  , database : 'test'
});

var server = http.createServer(app).listen(800);
connection.connect();

app.get('/mainPage', function (req, res) {
  res.sendfile('time.html');
});



app.get('/countcnt', function (req, res) {
  var updateQuery = `update test1 set cnt=cnt+1`;
  var selectQuery = `select cnt from test1`;
  // console.log(selectQuery);

  connection.query(updateQuery,
    function (err, rows, fields) {
      if (err) throw err;
      connection.query(selectQuery,
        function (err, rows, fields) {
          if (err) throw err;
          res.send(rows);
        }
      )
    }
  )
});
