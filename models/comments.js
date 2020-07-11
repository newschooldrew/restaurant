const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    content:String,
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
})

module.exports =  mongoose.model("comment",CommentSchema);