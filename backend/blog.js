const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://sujjalyadav:o6MHRQM9UNlYbUMe@cluster0.mgthhai.mongodb.net/?retryWrites=true&w=majority")

const blogsData = mongoose.Schema({
    title: String,
    description: String
})

const blogs = mongoose.model('blogs', userData);

module.exports = {
    User
} 
