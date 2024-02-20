const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required : true
    },

    last_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,

    },
    user_flag:{
        type: String,
        default : 'customer',
        enum: ['customer','admin','customer_service'],
        
       
    
    },
    img:{
        type:String,
        default: '/imgs/carlogo.jpg'
    }

})
module.exports = mongoose.model('User',UserSchema);