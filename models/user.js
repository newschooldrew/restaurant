const mongoose = require('mongoose');
const PostSchema = require('./post').schema
const {Schema} = mongoose;

const UserSchema = new Schema({
    username:String,
    email:String,
    password:String,
    token:String,
    posts:[PostSchema],
    BlogPosts:[{
        type:Schema.Types.ObjectId,
        ref:"post"
    }]
})

// UserSchema.pre('remove',function(next){
//         const BlogPost = mongoose.model('post')
//         BlogPost.remove({_id:{$in:this.BlogPosts}})
// })

// UserSchema.pre('save',function(next){
    
//     if(!this.isModified('password')){
//         return next()
//     }

module.exports = mongoose.model('user',UserSchema)