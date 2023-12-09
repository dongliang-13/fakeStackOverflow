//Tag Document Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    questions:[{
        type: Schema.Types.ObjectID,
        ref: 'Question',
        default: [],
    }],
});

module.exports = mongoose.model('Tag', TagSchema);
