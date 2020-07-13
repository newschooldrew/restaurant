const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    email:String,
    password:String,
    token:String
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

// UserSchema.pre('save',function(next){
    
//     if(!this.isModified('password')){
//         return next()
//     }
    
//     bcrypt.genSalt(10,(err,salt)=>{
//         if(err) return next(err)

//         bcrypt.hash(this.password,salt,(err,hash)=>{
//             if(err) return next(err)
//             this.password = hash;
//             next();
//         })
//     })
// })

module.exports = mongoose.model('User',UserSchema)