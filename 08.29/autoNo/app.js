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
//connection.connect();
//console.log("hello nodejs");

// app.get('/signin', function (req, res) {
//   res.send('test ok');
// });

//회원가입
app.get('/signinPage', function (req, res) {
  res.sendfile('signinPage.html');
});

app.get('/getNameByNo', function (req, res) {
  var id = req.query.id;
  var pass = req.query.pass;

  var insertQuery = `select name from nametable where no=${no}`;

  connection.query(insertQuery,
    function (err, rows, fields) {
      if (err) throw err;
        //res.send(rows);
      console.log(rows);
      if(rows.length==0){
        res.send('회원가입 실패');
      }else {
        res.send('회원가입 성공');
      }
      });
});

//로그인
app.get('/loginPage', function (req, res) {
  res.sendfile('loginPage.html');
});

app.get('/login', function (req, res) {
  var id = req.query.id;
  var pass = req.query.pass;

  var selectQuery = `select * from loginmemberinfo where id='${id}' and pass='${pass}'`;

  connection.query(selectQuery,
    function (err, rows, fields) {
      if (err) throw err;

      if(rows.length==0) {
        res.send('로그인 실패');
      }else {
        res.send('로그인 성공');
        //console.log(rows);
      }
    });
});
