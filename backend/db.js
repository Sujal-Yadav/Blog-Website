const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://sujjalyadav:o6MHRQM9UNlYbUMe@cluster0.mgthhai.mongodb.net/?retryWrites=true&w=majority")

const userData = mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
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
