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

app.post('/getOrPost', function (req, res) {
  console.log(req.body.inputText1, req.body.inputText2);
  res.send('post');
});

app.get('/getOrPost', function (req, res) {
  console.log(req.query.inputText1, req.query.inputText2);
  res.send('get');
});

app.get('/getPostPage', function (req, res) {
  res.sendfile('post.html');
});
