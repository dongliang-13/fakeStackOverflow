//User Document Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    reputation:{
        type:Number,
        default:0,
    },
    createdDate:{
        type:Date,
        default:Date.now,
    },
    userType:{
        type:String,
        required:true,
    },
    tagsCreated:[{
        type:Schema.Types.ObjectID,
        ref: 'Tag',
        default: [],
    }],
    questions:[{
        type:Schema.Types.ObjectID,
        ref: 'Question',
        default: [],
    }],
});

module.exports = mongoose.model('User', UserSchema);