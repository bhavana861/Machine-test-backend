const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    profilephoto:{
        type:String,
        default: ''
    },
    refreshtoken:{
        type:String,
        default: ''
    },
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})
  
const users = mongoose.model('users', userSchema)
module.exports = users