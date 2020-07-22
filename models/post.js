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
        author:{type:Schema.Types.ObjectId,ref:"user"},
        commenter:String,
        likes:{
            type:Number,
            default:0
        }
    }],
    likes:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model("post",PostSchema)