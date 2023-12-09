//Question Document Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
    title:{
        type:String,
        required:true,
        maxLength:50,
    },
    summary:{
        type:String,
        required:true,
        maxLength:140,
    },
    text: {
        type:String,
        required:true,
    },
    tags:[{
        type: Schema.Types.ObjectId,
        ref: 'Tag',
        required:true,
    }],
    askedBy:{
        type: String,
        required:true,
    },
    askedDateTime:{
        type: Date,
        default: Date.now,
    },
    views:{
        type: Number,
        default: 0
    },
    answers:[{
        type: Schema.Types.ObjectId,
        ref: 'Answer',
        default: [],
    }],
    comments:[{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: [],
    }],
    upvotes:[{
        type: String,
        default: [],
    }],
    downvotes:[{
        type: String,
        default: [],
    }],
});

module.exports = mongoose.model('Question', QuestionSchema);