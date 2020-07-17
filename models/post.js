const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = Schema({
    username:String,
    title:String,
    content:String,
    author:{type:Schema.Types.ObjectId,ref:"user"},
    comments:[{
        content:String,
        createdDate:{
            type:Date,
            default:Date.now
        },
        author:{type:Schema.Types.ObjectId,ref:"user"}
    }]
})

module.exports = mongoose.model("post",PostSchema)