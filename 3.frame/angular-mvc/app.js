/**
 * Created by lihongji on 2015/7/30.
 */

var express = require('express');
var app = express();//生成express中间件
var path=require("path");
var socket
//app.use(logger('dev'));
//设置静态文件目录
app.use(express.static(path.join(__dirname,'static')));
var server = app.listen(8080);
var io = require('socket.io').listen(server);

io.on('connection',function(socket){
    socket.on('message',function(message){
        socket.emit('message',message);
    });
});