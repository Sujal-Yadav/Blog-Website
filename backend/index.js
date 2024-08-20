const express = require('express');
const { createUser } = require('./types')
const { User } = require('./db')
const app = express();
const cors = require('cors');
var jwt = require('jsonwebtoken');
<<<<<<< Updated upstream
const {auth} = require('./middleware');
const jwtPassword = "secret";
const bodyParser = require("body-parser");
const { blogs, Blog } = require('./blog');
=======
const { auth, generateToken } = require('./middleware');
const jwtPassword = "secret";
const bodyParser = require("body-parser");
const { blogs, Blog } = require('./blog');
const session = require('express-session');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

>>>>>>> Stashed changes
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(jsonParser);
// app.use(verifyToken);
app.use(express.json());
app.use(cors());
<<<<<<< Updated upstream

app.post('/signup', async function(req, res) {
=======
app.use(session({ secret: 'your_session_secret', resave: false, saveUninitialized: true }));

require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


app.post('/signup', async function (req, res) {
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
app.get('/profile', auth, async function (req, res){
=======

app.get('/userAuth', auth, async function (req, res) {
>>>>>>> Stashed changes
    const userId = req.userId;
    const user = await User.findOne({_id: userId});
    console.log(user);
    if(user == null){
        return res.status(401).send({msg: "Try Login Again"})
    }
    return res.status(200).send(user.name);
})

app.get('/getBlog', auth, async function(req, res) {
    const blogs = await Blog.find({});
    return res.status(200).send(blogs);
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

    return res.json({
        msg: "Blog created Successfully."
    })
})

<<<<<<< Updated upstream
=======
app.get('/profile', auth, async function (req, res) {
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });
    const imageLink = user.profileImage;
    console.log(imageLink);
    return res.status(200).send(imageLink);
})

app.post('/uploadUserImage', auth, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }

        const result = await cloudinary.uploader.upload(req.file.path);
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // user.profileImage = result.secure_url;
        await User.findByIdAndUpdate(
            req.userId,
            { $set: { profileImage: result.secure_url } },
            { new: true }
        )
        res.json({ msg: 'Image uploaded', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


>>>>>>> Stashed changes
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});