const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app)
const io = require("socket.io")(server);
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const User = require('./models/User')
const Post = require('./models/post')
const Meal = require('./models/meal')
const Alert = require('./models/alert')
const Checkout = require('./models/checkout')
const sendEmail = require('./Email')
const scheduleEmail = require('./schedule-email')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const CryptoJS = require("crypto-js");
const { prependOnceListener } = require('./models/post')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const sgMail = require('@sendgrid/mail');
const cors = require('cors');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
require('dotenv').config()

mongoose.connect(keys.mongoUri,{ useNewUrlParser: true ,useUnifiedTopology: true})
mongoose.connection
    .once('open',() => console.log('db is running'))
    .on('error',(err)=>{
        console.log('warning' + err)
    })

mongoose.set('useFindAndModify', false);

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions))
app.use(bodyParser.json())

let orderNotification;
io.on("connection", (socket) => {
    console.log("New client connected");
  
    socket.on("initial_data", async () => {
            const allAlerts = await Alert.find({}).sort({createdDate:-1})
            console.log("allAlerts:")
            console.log(allAlerts)
        io.sockets.emit("get_data",allAlerts);
        // Checkout.find({}).then(docs => {
        });

        socket.on("request_order_data", async id => {
            console.log("id:")
            console.log(id)
            const getCheckout = await Checkout.findOne({alerts:id})
            console.log("getCheckout:")
            console.log(getCheckout)
        io.sockets.emit("get_order_data",getCheckout);
        });
        
      });

    // socket.on("disconnect", () => {
    //   console.log("Client disconnected");
    // });
// })

app.post('/create-user',async(req,res)=>{  
    let {username,email,password,phoneNumber,token} = req.body;
    console.log("username,email,password,phoneNumber,token:")
    console.log(username,email,password,phoneNumber,token)

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

            const user = new User({username,email, password,posts:[], phoneNumber,token});
            await user.save()
            .then(order =>{
                console.log("order:")
                console.log(order)
                return order.sendSmsNotification("You've created a user", ()=>console.log("something went wrong"))
            })
        })
    })
    res.send(req.body.username)
    }
})

app.post('/sign-in-user',async(req,res)=>{
    const {username,email,password} = req.body;
    console.log("username:")
    console.log(username)
    console.log("password")
    console.log(password)

    const foundUser = await User.findOne({username})
    if(!foundUser) {
        res.set({'isError': true}).send("user not found")
    }

    console.log("foundUser")
    console.log(foundUser.password)
    const isValidated = await bcrypt.compare(password,foundUser.password);

    if(!isValidated){
        res.set({'isError': true}).send("password not found")
    } else{
        console.log("validated") 
        res.set({'Authorization': `${foundUser.token}`,'username':`${foundUser.username}`}).send("cookie sent")
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
        foundUser.save(async function(err){
            const post = new Post(contents)
            await post.save()
        })

        res.send(foundUser)
    }
})

app.post('/fetch-posts',async (req,res)=>{
    console.log('fetch posts call was made' )
    const username = req.body.username;
    const foundUser = await User.findOne({username})
    try{
    console.log('***************')
    console.log(foundUser._id)
    } catch(e){
        console.log("no found user")
    }
    const posts = await Post.find({author:foundUser._id})
    console.log('***************')
    console.log(posts)
    console.log('***************')
    res.send(posts)
    // res.set({"misc":`${foundUser}`}).send("done")
})

app.get('/fetch-all-meals',async (req,res)=>{
    console.log('fetch all meals call was made' )

    const foundMeals = await Meal.find({})
    console.log('***************')
    console.log(foundMeals)
    console.log('***************')
    res.send(foundMeals)
})

app.post('/fetch-specific-post',async (req,res)=>{
    console.log("fetch-specific-post:");
    console.log(req.body.postId)
    const {postId} = req.body;
    console.log(postId)
    const foundSpecificPost = await Post.findOne(
        {_id:postId}
    )
    console.log("fetchSpecificPost hit")
    res.send(foundSpecificPost)
})

app.get('/fetch-all-posts',async (req,res)=>{
    console.log('fetch all posts call was made' )
    console.log('***************')
    const posts = await Post.find({})
    console.log(posts)
    console.log('***************')
    res.send(posts)
})

app.post('/fetch-profile',async (req,res)=>{
    console.log("req.body");
    console.log(req.body);
    const username = req.body.username;
    console.log("req:")
    console.log(username)
    const profile = await User.findOne(
        {username})

    const usersMeals = await User.findOne({username})
        .populate('orders')

        console.log("usersMeals:")
        console.log(usersMeals.orders)

        console.log("server profile:")
        console.log(profile)
        
        const obj = {
            profile,
            orders:usersMeals.orders
        }
        
        res.send(obj)
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

app.post('/update-profile',async(req,res) =>{
    console.log("req.body.post_id:")
    console.log(req.body)
    const {id,profileName,email,password,phoneNumber} = req.body;
    console.log(profileName,email,password,phoneNumber)
    const updatedUser = await User.findByIdAndUpdate(
        {_id:id},
        {$set:{username:profileName,email,password,phoneNumber}},
        {new:true}
    )
    updatedUser.save()
    res.send("this post has been updated")
})

app.post('/update-meal',async(req,res) =>{
    console.log("req.body.post_id:")
    console.log(req.body)
    const {id,title,description,price,url} = req.body;
    console.log(id,title,description,price,url)
    const updatedMeal = await Meal.findByIdAndUpdate(
        {_id:id},
        {$set:{title,description,price,url}},
        {new:true}
    )
    updatedMeal.save()
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

app.post('/increase-like',async (req,res)=>{
    const {id,username} = req.body;
    console.log("id:")
    console.log(req.body)
    const foundPost = await Post.findOneAndUpdate(
        {_id:id},
        {$inc:{likes:1}},
        {new:true})

    const addFavorites = await User.findOneAndUpdate(
        {username},
        {$addToSet:{favorites:id}},
        {new:true})

    console.log("increased like")
    res.send("increased like")
})

app.post('/decrease-like',async (req,res)=>{
    console.log("server received decrease like req")
    const {id,username} = req.body;
    console.log("id:")
    console.log(req.body)
    const foundPost = await Post.findOneAndUpdate(
        {_id:id},
        {$inc:{likes: -1}},
        {new:true}
    )
    const removeFavorites = await User.findOneAndUpdate(
        {username},
        {$pull:{favorites:id}},
        {new:true})

    res.send("decreased like")
})

app.post('/increase-comment-like',async (req,res)=>{
    const {idPost,idComment,username} = req.body;
    console.log("increase-comment-like:")
    console.log(req.body)

    const foundComment = await Post.updateOne(
        { _id: idPost,
            comments: {
                $elemMatch:{_id:idComment}
            }
        }, 
        { $inc: { "comments.$.likes": 1 },
         new: true })

         const addFavorites = await User.findOneAndUpdate(
            {username},
            {$addToSet:{favorites:idComment}},
            {new:true}
            )

            res.send("foundFavorites")
})

app.post('/decrease-comment-like',async (req,res)=>{
    const {idPost,idComment,username} = req.body;
    console.log("id:")
    console.log(req.body)

    const foundComment = await Post.updateOne(
        { _id: idPost,
            comments: {
                $elemMatch:{_id:idComment}
            }
        }, 
        { $inc: { "comments.$.likes": -1 },
         new: true })

    const removeFavorites = await User.findOneAndUpdate(
        {username},
        {$pull:{favorites:idComment}})

    console.log("comment like decreased")
    res.send("comment like decreased")

})

app.post('/fetch-favorites',async (req,res)=>{
    console.log("fetch favorites:");
    console.log(req.body);
    const {username} = req.body;
    const foundUser = await User.findOne(
        {username})
        console.log("foundUser in find like number:")
        console.log(foundUser)
        res.send(foundUser)
    })

    app.post('/input-file', (req,res)=>{
        console.log("req for input file is:");
        // console.log(req.body);
        const csvFile = req.body;
        csvFile.map(csv =>{
            console.log(csv[0])
            const title = csv[0];
            console.log(csv[1])
            const description = csv[1]
            console.log(csv[2])
            const price = csv[2]
            console.log(csv[3])
            const url = csv[3]
            const createMealFn = async ()=>{
                const createMeals = await new Meal({title,description,price,url})
                createMeals.save()
            }
            createMealFn()
        })
})

app.post('/store-checkout',async (req,res)=>{
    console.log(req.body)
    const {item} = req.body;
    const foundItem = await findOneAndUpdate(
    {username:username},
    {$set:item},
    {new:true}
    )
    foundItem
})

app.post('/find-meal',async (req,res)=>{
    console.log("req.body:")
    console.log(req.body.id)
    const id = req.body.id;
    const foundMeal = await Meal.findById(
        {_id:id}
    )
    res.send(foundMeal)
    console.log("foundMeal:")
    console.log(foundMeal)
})

app.post('/payment', (req, res) => {
    const body = {
      source: req.body.token.id,
      amount: req.body.amount,
      currency: 'usd'
    };
  console.log("body:")
  console.log(body)
    stripe.charges.create(body, (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).send({ error: stripeErr });
      } else {
        res.status(200).send({ success: stripeRes });
      }
    });
});

app.post("/create-payment-intent", async (req, res) => {
    console.log(req.body)
    const {username,actualName,address,city,province,postal_code,cartTotal,price,currency} = req.body;
console.log("cartTotal:")
console.log(cartTotal)
    console.log("username:")
    console.log(username)
    const item = {username,price};
    console.log("price:")
    console.log(price)

    const options = {
        amount:price*100,
        currency
    }

    console.log("options:")
    console.log(options)
    try {
      const paymentIntent = await stripe.paymentIntents.create(options);
      res.json(paymentIntent);
    } catch (err) {
      res.json(err);
    }
  });
//   
// 
// 
// new line
app.post('/create-order',async (req,res)=>{
    console.log("create order: req.body:")
    console.log(req.body)
    const {username,actualName,address,city,province,postal_code,cartTotal,price,currency} = req.body;
    JSON.stringify(cartTotal)
    console.log(typeof cartTotal)

    let year = new Date().getFullYear()
    let month = new Date().getMonth()
    let date = new Date().getDate()
    let hours = new Date().getHours()
    let minutes = new Date().getMinutes()
    let time = new Date(year,month,date,hours,minutes)
    const newAlert = new Alert({createdDate:time})
    await newAlert.save()

const newCheckout = await new Checkout()
newCheckout.order = cartTotal;
newCheckout.alerts = newAlert;

const newOrder = await User.findOneAndUpdate(
    {username},
    {$push:{orders:newCheckout}},
    {new:true}
)

Promise.all([newOrder.save(),newCheckout.save()])

const totalPrice = items =>{
    console.log("total Price items")
    console.log(items)
    let price = items.reduce((acc,item) => acc + item.quantity * item.price,0);
    return price.toFixed(2);
}

const makeid = length => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

    // newOrder.save().then(docs => {
    // .then(order =>{
    //     return order.sendSmsNotification("You've created an order", ()=>console.log("something went wrong"))
    // })

    const msg = {
        to: 'drewwperez@gmail.com',
        from: 'drewwperez@gmail.com', // Use the email address or domain you verified above
        subject: 'Thank you for your order!',
        html:`<html>
        <body>
            <div style="width: 100%;">
                <div style="width: 80%;">
                    <p style="text-align: center;">Thank you for your order on myrestaurant.com.
                        We have processed your order and will ship it to you shortly.
                        You will receive another email from us with tracking information when your books are shipped.
                    </p>
                    <div style="background-color: #faf6ea;">
                        <span style="width: 50%;">
                            Order Number: ${makeid(12)}<br>
                            Date: 8/21/2020<br>
                        </span>
                        <span style="width: 50%;">
                            Shipping To:<br>
                                ${actualName}<br>
                                ${address}<br>
                                ${city}, ${province} ${postal_code}
                        </span>
                    </div>
                </div>
                <div style="width: 80%;">
                    <table>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                        ${cartTotal.map(item =>{
                                return `<tr><td>${item.title}</td><td>${item.price}</td><td>${item.quantity}</td><br/><br/></tr>`
                            }).join('')}
                            <tr>Total:${totalPrice(cartTotal)}</tr>
                    </table>
                </div>
            </div>
        </body>
    </html>`
      };

        try {
          // send multiple individual emails to multiple recipients 
          // where they don't see each other's email addresses
          console.log("pretending to send mail")
        //   await sgMail.send(msg);
        } catch (error) {
          console.error(error);
      
          if (error.response) {
            console.error("error.response.body:")
            console.error(error.response.body)
          }
        } 
    })

app.post("/send-sms", async (req, res) => {
    console.log("Send sms hit")
    console.log(req.body);
    const {id,username} = req.body.obj;

        const foundUser = await User.findOne({username})
        console.log("username_test.id:")
        const user_id = foundUser._id

    const foundCheckout = await Checkout.findByIdAndUpdate(
        {_id:id},
        {$set:{confirmed:true}},
        {new:true}
        )
        console.log("foundCheckout:")
        console.log(foundCheckout)
        foundCheckout.save()

    const username_test = User.findOne({username}).then(user =>{
        return user.sendSmsNotification("Your order has been confirmed and is now being prepared!", ()=>console.log("something went wrong"))
        console.log("order:")
        console.log(order)
    })

    res.send(foundCheckout)
  });

app.post("/send-driver", async (req, res) => {
    console.log("Send sms hit")
    console.log(req.body);
    const {id,username} = req.body.obj;

        const foundUser = await User.findOne({username})
        console.log("username_test.id:")
        const user_id = foundUser._id

    const foundCheckout = await Checkout.findByIdAndUpdate(
        {_id:id},
        {$set:{sent:true}},
        {new:true}
        )
        console.log("foundCheckout:")
        console.log(foundCheckout)
        foundCheckout.save()

    const username_test = User.findOne({username}).then(user =>{
        return user.sendSmsNotification("Your driver is on the way!", ()=>console.log("something went wrong"))
        console.log("order:")
        console.log(order)
    })

    res.send(foundCheckout)
  });

app.get("/public-key", (req, res) => {
    res.send({ publicKey: process.env.PUBLISHABLE_KEY });
  });

  app.get("/fetch-all-orders", async (req, res) => {
    const allOrders = await Checkout.find({})
    console.log("allOrders")
    console.log(allOrders)
    res.send(allOrders)
  });

  app.get("/fetch-alerts", async (req, res) => {
    console.log("fetch alerts hit")
    const allAlerts = await Alert.find({}).sort({createdDate:-1})
    console.log("allAlerts")
    console.log(allAlerts)
    res.send(allAlerts)
  });

  app.post("/fetch-order-from-alert", async (req, res) => {
      console.log("fetch order from alerts hit")
      console.log("req.body is...")
      console.log(req.body)
      const {id} = req.body;
      console.log(id)

      const foundComment = await Alert.findOneAndUpdate(
        { _id: id}, 
        { $set: { "alerts.$.read": true }},
        { new: true })

    const foundOrder = await Checkout.findOne({alerts:id})
    // db.checkouts.findOne({alerts:ObjectId("5f4c15ecadecff10f4c8f8ef")})
    console.log("foundOrder:")
    console.log(foundOrder)
    res.send(foundOrder)
  });

  io.listen(5001);
app.listen(5000,() => console.log("server running on port 5000"));