const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const User = require('./models/User')
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

const app = express();
app.use(bodyParser.json())

// app.post('/current_user',(req,res) =>{
//     const token = req.body.token;
//     console.log("token on localStorage is")
//     console.log(token)
//     const currentUser = jwt.verify(token,'jk234sf98')
//     res.set({"data":currentUser}).send("current user found")
// })

// app.use(async (req,res,next)=>{
//     console.log("req.headers are ")
//     console.log(req)
//     const token = req.headers['authorization'];

//     if(token !== null){
//         try{
//             console.log("user is signed in. token is " + token)
//             const currentUser = jwt.verify(token,'jk234sf98');
//             console.log("current user is " + currentUser)
//         }catch(err){
//             console.error("JWT error is " + err);
//           }
//     }
//     next()
// })

app.get('/get-user',async (req,res,next) =>{
    console.log("/get-user is being hit");
})

app.post('/create-user',async(req,res)=>{  
    let {username,email,password,token} = req.body;

    const username_test = await User.findOne({username})
    
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
    res.set({'username':username}).redirect('/welcome')
    }
})

app.post('/sign-in-user',async(req,res)=>{
    const {username,email,password} = req.body;

    const foundUser = await User.findOne({email})
    if(!foundUser) {
        res.set({'isError': true}).send("user not found")
        // res.set({'isError': true}).send("error detected")
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

app.post('/create-post',(req,res) =>{
    const {title,content} = req.body;
    const post = new Post({content})
    post.save()
})


app.listen(5000,() => console.log("server running on port 5000"))