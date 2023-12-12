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
app.use(cors({ credentials: true, origin: ['http://127.0.0.1:3000','http://localhost:3000'] }));
app.use(express.json())
app.use(express.urlencoded({extend:true}));

app.use(session({
    secret: "superSecretKey",
    cookie: {},
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/fake_so'})
}));
  
app.get('/', (req, res) => {
    if(req.session.user){
        let name = req.session.user;
        res.send({userType:'registered', username: name, id: req.sessionID})
    }
    else{
        res.send({userType:'guest', username: null});
    }
});

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
    const {email, password} = req.body;
    const user = (await User.find({email: email}).exec())[0];
    if(user){
        const verdict = await bcrypt.compare(password, user.password);
        if(verdict){
            req.session.user = user.username;
            res.send({
                success : true,
                username : user.username,
            });
        }
        else {
            return res.send({
                success : false,
                message : "Incorrect email or password"
            });
        }
    }
});

app.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if(err){
            console.log(err);
        }
        else{
            res.clearCookie('connect.sid')
            res.send();
        }
    });
  });

app.get("/getData", async (req, res)=>{
    const allQ = await Question.find({}).exec();
    const allT = await Tag.find({}).exec();
    const allC = await Comment.find({}).exec();
    const allA = await Answer.find({}).exec();
    const allU = await User.find({}).exec();
    res.send({
        question: allQ,
        tag: allT,
        comment: allC,
        answer: allA,
        user: allU,
    });
})

app.get("/getTag/:tag", async (req,res)=>{
    const id = req.params.tag;
    const objectId = new mongoose.Types.ObjectId(id);
    let result = await Tag.findOne({_id: objectId}).exec();
    res.send(result);
})

app.get("/getUser/:username", async (req,res) => {
    let result = await User.findOne({username:req.params.username}).exec();
    res.send(result);
})

app.get("/getQuestion/:id", async (req,res)=>{
    const id = req.params.id;
    const objectId = new mongoose.Types.ObjectId(id);
    let result = await Question.findOne({_id: objectId}).exec();
    res.send(result);
})

app.post("/newQuestion", async (req,res)=>{
    let { title, summary, text, tags } = req.body;
    let newTags = [];
    const user = await User.findOne({username:req.session.user}).exec();
    
    await Promise.all(tags.map(async (tag) => {
        const isNewTag = await Tag.findOne({name: tag}).exec();
        if(!isNewTag){
            newTags.push(tag);
        }
    }));

    if(newTags.length > 0 && user.reputation < 50 && user.userType !== 'admin'){
        return res.send({
            success: false,
            errorMsg: "You don't have enough reputation to create a new tag"
        });
    }
    else{
        if(newTags.length > 0){
            await Promise.all(newTags.map(async(tag) => {
                let newTag = new Tag({
                    name: tag
                });

                let tid = await newTag.save();
                await User.updateOne({username: user.username}, {$push:{tags:tid}});
            }));
        }
        tags = await Promise.all(tags.map(async(tag) => {
            let tid = await Tag.findOne({name: tag}).exec();
            if (tid) {
                return tid._id; // return the ObjectId, not the whole document
            } else {
                // handle the case where the tag is not found in the database
                throw new Error(`Tag not found: ${tag}`);
            }
        }));

        let newQuestion = new Question({
            title: title,
            summary: summary,
            text: text,
            tags: tags,
            askedBy: user.username,
            askedDateTime: new Date(),
            views: 0,
            answers: [],
            comments: [],
            upvotes: [],
            downvotes: [],
        });
        let qid = await newQuestion.save();
        await User.updateOne({username:req.session.user}, {$push:{questions:qid}});
        return res.send({
            success: true
        })
    }
});

app.get("/getAnswer/:id", async (req,res)=>{
    const id = req.params.id;
    const objectId = new mongoose.Types.ObjectId(id);
    let result = await Answer.findOne({_id: objectId}).exec();
    res.send(result);
})

app.post("/newAnswer", async (req,res)=>{
    const objectId = new mongoose.Types.ObjectId(req.body.newAns.question._id);
    const newAnswer = new Answer({
        text: req.body.newAns.text,
        answerBy: req.session.user,
        answerDate: new Date(),
        comments: [],
        upvotes: [],
        downvotes: [],
    });
    const aid = await newAnswer.save();
    await Question.updateOne({_id:objectId}, {$push: {answers: aid}}).exec();
    res.send();
})

app.post("/editQuestion", async (req,res) =>{
    let { _id, title, summary, text, tags } = req.body;
    let newTags = [];
    const user = await User.findOne({username:req.session.user}).exec();

    await Promise.all(tags.map(async (tag) => {
        const isNewTag = await Tag.findOne({name: tag}).exec();
        if(!isNewTag){
            newTags.push(tag);
        }
    }));

    if(newTags.length > 0 && user.reputation < 50 && user.userType !== 'admin'){
        return res.send({
            success: false,
            errorMsg: "You don't have enough reputation to create a new tag"
        });
    }
    else{
        if(newTags.length > 0){
            await Promise.all(newTags.map(async(tag) => {
                let newTag = new Tag({
                    name: tag
                });

                let tid = await newTag.save();
                await User.updateOne({username: user.username}, {$push:{tags:tid}});
            }));
        }
        tags = await Promise.all(tags.map(async(tag) => {
            let tid = await Tag.findOne({name: tag}).exec();
            if (tid) {
                return tid._id; // return the ObjectId, not the whole document
            } else {
                // handle the case where the tag is not found in the database
                throw new Error(`Tag not found: ${tag}`);
            }
        }));
        Question.updateOne({_id: _id}, {title: title, summary: summary, text:text, tags:tags}).exec();
        res.send({
            success:true
        });
    }
})

app.post("/updateQuestionViewCount", (req,res)=>{
    Question.updateOne({_id: req.body._id}, {$inc: {views: 1}}).exec();
    res.send();
})