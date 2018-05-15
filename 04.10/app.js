//app.js파일을 먼저 만들어주기.
//cmd창에서 app.js가 있는 폴더로 들어가기.
//npm 패키지 깔아주기.
//npm install express
//npm install mysql
//실행확인 node app.js

var express = require('express');
var mysql = require('mysql');
var http = require('http');
var app = express();


//데이터베이스 connection 설정 (mysql접속 함수)
var connection = mysql.createConnection({
  host: 'localhost'
  , port : 3306
  , user : 'root'
  , password : 'root'
  , database : 'test'
});

//port 800에 접속 node app.js 실행
var server = http.createServer(app).listen(800);
connection.connect();
console.log("hello nodejs");

//node app.js 실행시
// 'localhost:800/폴더명' 에서 확인 가능
app.get('/test', function (req, res) {
  res.send('hello 채성은');
});

//db에 접속하여 데이터 가져오기
connection.query('select * from member2',
  function (err, rows, fields) {
    if (err) throw err;
    console.log(rows);
  });

  app.get('/cssPractice', function (req, res) {
    res.sendfile('css2.html');
  });

  app.get('/getAllMember2', function (req, res) {
    connection.query('select * from member2',
      function (err, rows, fields) {
        if (err) throw err;
        res.send(rows);
      });
  });

//localhost에 데이터 불러오기 예제

// /getAuthcode1or2 - authcode가 1이거나 2인사람
  app.get('/getAuthcode1or2', function (req, res) {
    connection.query('select * from member where authcode in (1,2)',
      function (err, rows, fields) {
        if (err) throw err;
        res.send(rows);
      });
  });

// /getNameFromBoard - 글을 쓴 적이 있는 사람의 이름 목록
  app.get('/getNameFromBoard', function (req, res) {
    connection.query('select name from member where id in (select id from board)',
      function (err, rows, fields) {
        if (err) throw err;
        res.send(rows);
      });
  });

// /getEmailOfAdmin -  권한이 '관리자' 인 사람의 이메일 주소만 가져오기
  app.get('/getEmailOfAdmin', function (req, res) {
    connection.query('select email from member where authcode ' +
    '= (select authcode from auth where authority ="관리자" )',
      function (err, rows, fields) {
        if (err) throw err;
        res.send(rows);
      });
  });

// /getLongestEmail - 이메일 주소가 가장 긴 사람가져오기
  app.get('/getLongestEmail', function (req, res) {
    connection.query('select * from member where length(email)' +
    ' = (select max(length(email)) from member)',
      function (err, rows, fields) {
        if (err) throw err;
        res.send(rows);
      });
  });
