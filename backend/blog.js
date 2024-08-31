const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)

const blogsData = mongoose.Schema({
    title: String,
    description: String
})

const Blog = mongoose.model('blogs', blogsData);

module.exports = {
    Blog
} 
