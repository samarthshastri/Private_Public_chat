/**
 * Created by Samarth_Shastri on 6/27/16.
 */
var express = require('express');
var path    = require("path");
var app = express();
var server  = require('http').createServer(app);
var io = require('socket.io')(server);
var mongo = require('mongodb').MongoClient;
var connectedUsers = {};


mongo.connect('mongodb://localhost:27017/private', function (err, db)
{



    io.on('connection',function (client) {
        console.log("server is running");
    });

    app.use(express.static(__dirname + '/../client'));


    app.get('/',function(req,res){
        res.sendFile(path.join(__dirname+'/../client/index'));
        //__dirname : It will resolve to your project folder.
    });

    io.on('connection', function(socket){
        console.log('a user connected');

        var users = db.collection('users');
        socket.on('name',function (data) {
                currUser = data;
                users.insert({user_name:data},function () {
                    connectedUsers[data] = socket;
                });

            users.find().toArray(function (err,res) {
                io.emit('output', res);
                console.log("emitted");
            });

            socket.on('msg',function (data) {
                    connectedUsers[data.name].emit("sent",data);

            })

            socket.on('msg1',function (data) {
                console.log(data.m);
                io.emit('sent1',data);
            });

            socket.on('disconnect',function() {
                users.remove({'user_name':data},function () {
                    console.log("deleted");
                });
                users.find().toArray(function (err,res) {
                    io.emit('output', res);
                    console.log("emitted");
                });

            });
        });




        });

    server.listen(8080);


});

