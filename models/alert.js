
const mongoose = require('mongoose');
const {Schema} = mongoose;

const AlertSchema = new Schema({
alert:{
        type:String,
        default:"You have a new order"
      },
  createdDate:String,
  read:{
    type:Boolean,
    default:false
  }
})

module.exports = mongoose.model("alert",AlertSchema)