const bycrypt = require('bcrypt');

let Tag = require('./model/tag');
let Answer = require('./model/answer');
let Question = require('./model/question');
let Comment = require('./model/comment');
let User = require('./model/user');

async function createUser(email, username, password, reputation, createdDate, userType, tagsCreated, questions){
    let salt = await bycrypt.genSalt(10);
    let hashedPw = await bycrypt.hash(password, salt);
    const user = {
        email: email,
        username: username,
        password: hashedPw,
        reputation: reputation,
        createdDate: createdDate,
        userType: userType,
        tagsCreated: tagsCreated,
        questions: questions,
    };
    let newUser = new User(user);
    return newUser.save();
}

function createQuestion(title, summary, text, tags, askedBy, askedDateTime, views, answers, comments, upvotes, downvotes){
    const question = {
        title: title,
        summary: summary,
        text: text,
        tags: tags,
        askedBy: askedBy,
        askedDateTime: askedDateTime,
        views: views,
        answers: answers,
        comments: comments,
        upvotes: upvotes,
        downvotes: downvotes,
    }
    let newQuestion = new Question(question);
    return newQuestion.save();
}

function createAnswer(text, answerBy, answerDate, comments, upvotes, downvotes){
    const answer = {
        text: text,
        answerBy: answerBy,
        answerDate: answerDate,
        comments: comments,
        upvotes: upvotes,
        downvotes: downvotes,
    };
    let newAnswer = new Answer(answer);
    return newAnswer.save();
}

function createTag(name, questions){
    let tag = {
        name: name,
        questions: questions,
    };
    let newTag = new Tag(tag);
    return newTag.save();
}

function createComment(text, upvotes){
    const comment = {
        text: text,
        upvotes: upvotes,
    };
    let newComment = new Comment(comment);
    return newComment.save();
}

module.exports = {
    createAnswer,
    createComment,
    createQuestion,
    createTag,
    createUser
}