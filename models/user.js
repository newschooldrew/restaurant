const mongoose = require('mongoose');
const {Schema} = mongoose;
const twilio = require('twilio');
require('dotenv').config()

const UserSchema = new Schema({
    username:String,
    email:String,
    password:String,
    token:String,
    phoneNumber:String,
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
    },
    orders:[{
      type:Schema.Types.ObjectId,
      ref:'checkout'
    }]
})

UserSchema.methods.sendSmsNotification = function(message, statusCallback) {
    if (!statusCallback) {
      throw new Error('status callback is required to send notification.');
    }
  
    const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
    const self = this;
    const options = {
      to: self.phoneNumber,
      from: process.env.MY_PHONE_NUMBER,
      body: message,
      statusCallback: statusCallback,
    };
  
    return client.messages.create(options)
      .then((message) => {
        console.log('Message sent to ' + message.to);
      });
  };

module.exports = mongoose.model('user',UserSchema)