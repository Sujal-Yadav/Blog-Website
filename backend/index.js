const express = require('express');
const { createUser } = require('./types')
const { User } = require('./db')
const app = express();
const cors = require('cors');
var jwt = require('jsonwebtoken');
const {auth} = require('./middleware');
const jwtPassword = "secret";
const bodyParser = require("body-parser");
const { blogs, Blog } = require('./blog');
var jsonParser = bodyParser.json();
// var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(jsonParser);
// app.use(verifyToken);
app.use(express.json());
app.use(cors());

app.post('/signup', async function(req, res) {
    const createPayload = req.body;
    const parsePayload = createUser.safeParse(createPayload);
    if (!parsePayload.success) {
        res.status(411).json({
            msg: "You entered wrong inputs!"
        })
        return;
    }

    await User.create({
        name: createPayload.name,
        phone: createPayload.phone,
        email: createPayload.email,
        password: createPayload.password,
        blogIds: createPayload.blogIds
    });

    res.json({
        msg: "User registered successfully"
    })
});

app.post('/login', async function (req, res) {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    
    const user = await User.findOne({email: userEmail});
    
    if(!user){
        return res.status(400).send({msg:"User not exist"});
    }

    if(user.password != userPassword){
        return res.status(401).send({msg: "You entered wrong password"});
    }

    const token = jwt.sign({id: user.id}, jwtPassword);
    return res.json({token});

})

app.get('/getBlog', auth, async function(req, res) {
    const blogs = await Blog.find({});
    res.status(200).send(blogs);
})

app.post('/postBlog', auth, async function(req, res){
    const createPayload = req.body;
    const blogId = await Blog.create({
        title: createPayload.title,
        description: createPayload.description
    })
    const userId = req.userId;
    console.log(userId);
    console.log(blogId._id);
    await User.findByIdAndUpdate(
        userId,
        {$push: {blogIds: blogId}},
        {new: true}
    )

    res.json({
        msg: "Blog created Successfully."
    })
})

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});