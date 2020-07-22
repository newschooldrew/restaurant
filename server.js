const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const User = require('./models/User')
const Post = require('./models/post')
// const Comment = require('./models/comment')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const CryptoJS = require("crypto-js");
require('dotenv').config()

mongoose.connect(keys.mongoUri,{ useNewUrlParser: true ,useUnifiedTopology: true})
mongoose.connection
    .once('open',() => console.log('db is running'))
    .on('error',(err)=>{
        console.log('warning' + err)
    })

mongoose.set('useFindAndModify', false);

const app = express();
app.use(bodyParser.json())

app.post('/create-user',async(req,res)=>{  
    let {username,email,password,token} = req.body;
    console.log("username,email,password,token:")
    console.log(username,email,password,token)

    const username_test = await User.findOne({username})
    console.log("username_test:")
    console.log(username_test)
    
    if(username_test){
        res.set({'isError': true}).send("user already exists")
    } else{
    bcrypt.genSalt(10,(err,salt)=>{
        console.log("salt is " + salt)
        bcrypt.hash(password,salt,async (err,hash)=>{
            console.log(password)
            console.log("hash " + hash)
            if(err) console.log(err)
            password = hash;

            const user = new User({username,email, password,posts:[],token});
            await user.save()
        })
    })
    res.send(req.body.username)
    }
})

app.post('/sign-in-user',async(req,res)=>{
    const {username,email,password} = req.body;

    const foundUser = await User.findOne({email})
    if(!foundUser) {
        res.set({'isError': true}).send("user not found")
    }

    const isValidated = await bcrypt.compare(password,foundUser.password);

    if(!isValidated){
        res.set({'isError': true}).send("password not found")
    } else{
        console.log("validated") 
        res.set({'Authorization': `${foundUser.token}`,'username':`${foundUser.email}`}).send("cookie sent")
    }
    
    console.log("found user is " + foundUser.token)
})

app.post('/create-new-post', async (req,res) =>{
    const {title,content,username} = req.body;
    const foundUser = await User.findOne({username})
    const user_id = foundUser._id;

    console.log("ID IS:")
    console.log(user_id)

    const contents = {title,content,author:user_id,username}

    console.log("Contents are ")
    console.log(contents)

    if(!foundUser) {
        res.set({'isError': true}).send("user not found")
    }else{
        foundUser.save(function(err){
            const post = new Post(contents)
            post.save()
        })

        res.send(foundUser)
        // res.send(foundUser)
        // res.set({'post':'success'}).send("post created")
    }
})

app.post('/fetch-posts',async (req,res)=>{
    console.log('fetch posts call was made' )
    const username = req.body.username;
    const foundUser = await User.findOne({username})
    console.log('***************')
    console.log(foundUser._id)
    const posts = await Post.find({author:foundUser._id})
    console.log('***************')
    console.log(posts)
    console.log('***************')
    res.send(posts)
    // res.set({"misc":`${foundUser}`}).send("done")
})

app.get('/fetch-all-posts',async (req,res)=>{
    console.log('fetch all posts call was made' )
    console.log('***************')
    const posts = await Post.find({})
    console.log(posts)
    console.log('***************')
    res.send(posts)
})

app.post('/create-comment',async(req,res) =>{
    const username = req.body.username;
    const key = req.body.key;
    console.log("key is")
    console.log(req.body.key)
    console.log("*******************")
    console.log("id is ")
    console.log(req.body.id)
    console.log("*******************")
    const foundInitialPost = await Post.findById(key)
    console.log("foundInitialPost:")
    console.log(foundInitialPost)
    console.log("comment is ")
    const req_comment = req.body.comment;
    console.log(req_comment)
    console.log("*******************")
    
    const foundUser = await User.findOne({username})
    console.log("foundUser:")
    const {_id} = foundUser;
    console.log(foundUser)
    console.log(_id)
    const postData = {content:req_comment,author:_id,commenter:username}

        const foundPost = await Post.findOneAndUpdate(
            {_id:key},
            {$push:{comments:postData,post:foundInitialPost._id}},
            {new:true})

            foundPost.save()
            
            console.log("foundPost:")
            console.log(foundPost)
            
            res.send(foundPost)
})

app.post('/update-post',async(req,res) =>{
    console.log("req.body.post_id:")
    console.log(req.body)
    const {id,title,content} = req.body;
    console.log(id,title,content)
    const updatedPost = await Post.findByIdAndUpdate(
        {_id:id},
        {$set:{title,content}},
        {new:true}
    )
    updatedPost.save()
    res.send("this post has been updated")
})

app.post('/edit-comment',async (req,res)=>{
    console.log(req.body)
    const {post_id,id,content} = req.body;

        const foundComment = await Post.findOneAndUpdate(
            { _id: post_id, "comments._id": id }, 
            { $set: { "comments.$.content": content }},
            { new: true })

        foundComment.save()
    console.log("foundComment:")
    console.log(foundComment)
    res.send("done")
})

app.listen(5000,() => console.log("server running on port 5000"))