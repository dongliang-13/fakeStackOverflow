//Answer Document Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema = new Schema({
    text:{
        type:String,
        required:true,
    },
    answerBy:{
        type: String,
        required:true,
    },
    answerDate:{
        type:Date,
        default:Date.now,
    },
    comments:[{
        type:Schema.Types.ObjectID,
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

module.exports = mongoose.model('Answer', AnswerSchema);