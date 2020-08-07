const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MealSchema = Schema({
    title:String,
    description:String,
    createdAt:{
        type:Date,
        default:Date.now
    },
    price:Number
})

module.exports = mongoose.model("meal",MealSchema)