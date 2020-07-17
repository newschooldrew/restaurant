const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = Schema({
    content:String,
    createdDate:{
        type:Date,
        default:Date.now
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
})

module.exports =  mongoose.model("comment",CommentSchema);