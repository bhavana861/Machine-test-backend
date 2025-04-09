const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
    brandname:{
        type:String,
        required: true,
        unique: true
    },
    brandlogo:{
        type:String,
        required: true
    },
    brandcategories:{
        type:[String],
        required: true
    },
})
  
const brands = mongoose.model('brands', brandSchema)
module.exports = brands