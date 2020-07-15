const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = Schema({
    title:String,
    content:String
})

module.exports = mongoose.model("post",PostSchema)