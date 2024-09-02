const mongoose = require('mongoose');
require('dotenv').config();

mongoose.createConnection(process.env.MONGO_URI)

const userData = mongoose.Schema({
    profileImage: String,
    name: String,
    phone: String,
    email: String,
    city: String,
    country: String,
    zipCode: String,
    address: String,
    password: String,
    blogIds: [{
        type: mongoose.ObjectId,
        ref: 'blogs'
    }]
})

const User = mongoose.model('User', userData);

module.exports = {
    User
} 
