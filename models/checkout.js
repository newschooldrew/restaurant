const mongoose = require('mongoose');
const OrderSchema = require('./order').schema
const {Schema} = mongoose;

const CheckoutSchema = new Schema({
    order:[OrderSchema],
    createdDate:{
        type:Date,
        default:Date.now
      },
      confirmed:{
        type:Boolean,
        default:false
      },
      sent:{
        type:Boolean,
        default:false
      },
      alerts:[{
        type:Schema.Types.ObjectId,
        ref:'alert'
      }]
})

module.exports = mongoose.model("checkout",CheckoutSchema)