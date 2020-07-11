const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    email:String,
    password:String
    // posts:[PostSchema],
    // BlogPosts:[{
    //     type:Schema.Types.ObjectId,
    //     ref:"post"
    // }]
})

// UserSchema.pre('remove',function(next){
//         const BlogPost = mongoose.model('post')
//         BlogPost.remove({_id:{$in:this.BlogPosts}})
// })

module.exports = mongoose.model('User',UserSchema)