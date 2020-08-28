
const mongoose = require('mongoose');
const {Schema} = mongoose;

const AlertSchema = new Schema({
alert:{
        type:String,
        default:"You have a new order"
      },
createdDate:{
    type:Date,
    default:Date.now
  },
})

module.exports = mongoose.model("alert",AlertSchema)