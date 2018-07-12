var express = require('express');
var mysql = require('mysql');
var http = require('http');
var app = express();


var connection = mysql.createConnection({
  host: '192.168.110.112'
  , port : 3306
  , user : 'root'
  , password : 'P@ssw0rd'
  , database : 'kopo'
});


var server = http.createServer(app).listen(800);
connection.connect();
console.log("hello nodejs");


app.get('/getitemFile', function (req, res) {
  res.sendfile('line_chart.html');
});

app.get('/getitemFile1', function (req, res) {
  res.sendfile('test.html');
});




  app.get('/getSeasonality', function (req, res) {
    connection.query('select regionid,product,week,qty,ma from KOPO_CHANNEL_SEASONALITY_RESULT_OMZ '+
"where PRODUCT = 'PRODUCT1' and regionid = 'A01'",
      function (err, rows, fields) {
        if (err) throw err;
        res.send(rows);
      });
  });
