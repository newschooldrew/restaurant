const mongoose = require('mongoose');
const PostSchema = require('./post').schema
const {Schema} = mongoose;

const UserSchema = new Schema({
    username:String,
    email:String,
    password:String,
    token:String,
    posts:[{
        type:Schema.Types.ObjectId,
        ref:"post"
    }],
    joinedDate:{
        type:Date,
        default:Date.now
    },
    favorites:{
        type:[Schema.Types.ObjectId],
        ref:"post"
    }
})

module.exports = mongoose.model('user',UserSchema)