const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productname:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    brand:{
        type:String,
        required:true
    },
    productImage:{
        type:String
    },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }  
})
  
const products = mongoose.model('products', productSchema)
module.exports =  products