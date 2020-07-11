const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    content:String,
    comments:[{
        type:Schema.Types.ObjectId,
        ref:"comment"
    }]
})

module.exports = mongoose.model("post",PostSchema)