const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

mongoose.connect(keys.mongoUri,{ useNewUrlParser: true ,useUnifiedTopology: true})
mongoose.connection
    .once('open',() => console.log('db is running'))
    .on('error',(err)=>{
        console.log('warning' + err)
    })

const app = express();
app.use(bodyParser.json())

app.get('/get-user',async (req,res,next) =>{
    const token = req.headers;
    console.log(token)
    const user = await User.findOne()
})

app.post('/create-user',async(req,res)=>{
    
    let {email,password,token} = req.body;
    
    bcrypt.genSalt(10,(err,salt)=>{
        console.log("salt is " + salt)
        bcrypt.hash(password,salt,async (err,hash)=>{
            console.log(password)
            console.log("hash " + hash)
            if(err) console.log(err)
            password = hash;

            const user = new User({email, password,token});
            await user.save()
        })
    })

    res.redirect('/welcome')
})

app.post('/sign-in-user',async(req,res)=>{
    const {email,password} = req.body;
    const foundUser = await User.findOne({email})
    if(!foundUser) {
        throw new Error('user not found')
    }
    console.log(password)
    console.log(foundUser.password)
    const isValidated = await bcrypt.compare(password,foundUser.password);
    if(!isValidated){
        throw new Error('invalid password')
    } else{
        console.log("validated")
        
    }
})

app.listen(5000,() => console.log("server running on port 5000"))