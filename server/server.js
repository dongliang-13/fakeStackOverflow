// Application server
var express = require('express');
var app = express();
var port = 8000;
var session = require('express-session');
var MongoStore = require('connect-mongo');
var bcrypt = require('bcrypt');

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

//import all model
var Question = require("./model/question");
var Answer = require("./model/answer");
var Tag = require("./model/tag");
var Comment = require("./model/comment");
var User = require("./model/user");

//import prebuilt createModel functions
var createModel = require("./createModel");

//middleware
var cors = require('cors');
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json())
app.use(express.urlencoded({extend:true}));

app.use(session({
    secret: "superSecretKey",
    cookie: {
      maxAge: 30000,
    },
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/fake_so'})
}));
  
  

app.get('/', (req, res) => {
    if(req.session.user){
        let name = req.session.user;
        res.send({userType:'registered', username: name})
    }
    else{
        res.send({userType:'guest', username: null});
    }
})

app.post('/register', async (req,res) => {
    const {username, email, password} = req.body;
    const sameUsername = (await User.find({username:username}).exec()).length > 0;
    const sameEmail = (await User.find({email:email}).exec()).length > 0;
    if(sameUsername && sameEmail){
        res.send("Username and Email already exist");
    }
    else if(sameUsername){
        res.send("Username already exist");
    }
    else if (sameEmail){
        res.send("Email was already used");
    }
    else{
        createModel.createUser(email, username, password, 0, new Date(), "registered", [], [])
            .then(()=>{
                res.send("successful");
            })
            .catch(error=>{
                res.send(error);
            })
    }
});

app.post('/login', async (req,res)=>{
    console.log(req.sessionID);
    const {email, password} = req.body;
    const user = (await User.find({email: email}).exec())[0];
    if(user){
        const verdict = await bcrypt.compare(password, user.password);
        if(verdict){
            req.session.user = user.username;
            res.send(req.session.user);
        }
        else {
            return res
              .status(401)
              .json({errorMessage: "Wrong email address or password"})    
        }
    }
});