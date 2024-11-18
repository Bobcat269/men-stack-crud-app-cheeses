const mongoose = require('mongoose');

const cheeseSchema = new mongoose.Schema({
    name: String,
    hasMatured: Boolean,
    tags: []
})

const Cheese = mongoose.model("Cheese", cheeseSchema) //create collection

module.exports= Cheese