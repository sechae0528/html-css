var express = require('express');
//var mysql = require('mysql');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);


app.get('/translateFile', function (req, res) {
  res.sendfile('translate.html');
});

app.get('/checklang', function (req, res) {
 console.log(req.query.context);
 console.log(req.query.lang);
 var context = req.query.context;
 var lang = req.query.lang;

 var translate = [];
 translate[0] = ["Hello","Nice to meet you","Thank you","Sorry","How much"];
 translate[1] = ["こんにちは","はじめまして","ありがとうございます","ごめんなさい","いくらですか"];

 var result = translate[lang][context];
  res.send(result);
});
