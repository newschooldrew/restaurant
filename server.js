const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const User = require('./models/User')
require('dotenv').config()

mongoose.connect(keys.mongoUri,{ useNewUrlParser: true ,useUnifiedTopology: true})
mongoose.connection
    .once('open',() => console.log('db is running'))
    .on('error',(err)=>{
        console.log('warning' + err)
    })

const app = express();
app.use(bodyParser.json())

app.post('/create-user',async(req,res)=>{
    const {email,password} = req.body;
    console.log("req body is " + email + " " + password)
    const user = new User({email:email, password:password})
    await user.save()
    res.redirect('/welcome')
})

app.listen(5000,() => console.log("server running on port 5000"))