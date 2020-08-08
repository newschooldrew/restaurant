const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CheckoutSchema = Schema({
    items:{
        type:Array,
        default:[]
    }
})

module.exports = mongoose.model("checkout",CheckoutSchema)