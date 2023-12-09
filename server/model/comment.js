//Comment Document Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    text:{
        type:String,
        required:true
    },
    upvotes:[{
        type: String,
        default: [],
    }],
});

module.exports = mongoose.model('Comment', CommentSchema);