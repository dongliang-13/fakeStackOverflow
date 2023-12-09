// Application server
var express = require('express');
var app = express();
var port = 8000;

var server = app.listen(port, ()=>{
    console.log(`express server is listening on port ${port}`);
})

//handles program termination
process.on('SIGINT', ()=>{
    console.log('Received SIGINT. Closing server gracefully...');
    server.close(()=>{
        console.log('Server closed. Exiting process');
        process.exit(0);
    })
});

//start mongodb server on 127.0.0.1 port 270127, and uses the fake_so database
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/fake_so';
mongoose.connect(mongoDB, {useNewUrlParser:true, useUnifiedTopology:true});

var db = mongoose.connection;

//check if error in connecting database
db.on('error', function(err){
    console.err("failed to connect: ", err);
});

db.on('connected', ()=>{
    console.log("database connected");
});

//import all collections or related page
var Question = require("./models/questions");
var Answer = require("./models/answers");
var Tag = require("./models/tags");
const Home = require('./pages/homePage');
