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


//time
app.get('/time', function (req, res) {
  res.sendfile('time.html');
});

//`update \`count\` set cnt=cnt+${req.body.i} where 1=1`;
//time
app.get('/timePost', function (req, res) {
  var updateQuery = `update \`count\` set cnt=cnt+1 where 1=1`;
  var selectQuery = `select * from count`;
  connection.query(updateQuery,
    function (err, rows, fields) {
      if (err) throw err;
      connection.query(selectQuery,
        function (err, rows, fields) {
          if (err) throw err;
          res.send(rows)
          }
        )
      }
    )
    //res.send("success");
});



//글목록
app.get('/postListPage', function (req, res) {
  res.sendfile('postListPage.html');
});

//글쓰기
app.get('/writePostPage', function (req, res) {
  res.sendfile('postWritePage.html');
});

//글상세

app.get('/postDetailPage', function (req, res) {
  res.sendfile('postDetailPage.html');
});

//글쓰기
app.post('/writePost', function (req, res) {
  var insertQuery = `insert into post (\`writer\`, title, context) values ('${req.body.writer}','${req.body.title}','${req.body.context}')`;
  connection.query(insertQuery,
    function (err, rows, fields) {
      if (err) throw err;

      res.send("success");
      }
    )
    //res.send("success");
});

//글목록
app.get('/getPostList', function (req, res) {
  var selecttQuery = `select no, title, writer from post`;
  connection.query(selecttQuery,
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows)
      }
    )
});


//글상세
app.get('/getPost', function (req, res) {
  var no = req.query.no;
  var selecttQuery = `select no, title, writer, context from post where no = ${no}`;
  connection.query(selecttQuery,
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows)
      }
    )
});
