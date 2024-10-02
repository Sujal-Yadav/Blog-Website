const express = require('express');
const { createUser } = require('./types')
const { User } = require('./db')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const path = require('path');
var jwt = require('jsonwebtoken');
const { auth, generateToken } = require('./middleware');
const bodyParser = require("body-parser");
const { blogs, Blog } = require('./blog');
const fs = require('fs');
const nodemailer = require('nodemailer');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var RateLimit = require('express-rate-limit');
var limiter = RateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    max: 10000, // max 100 requests per windowMs
});

app.use(limiter);
app.use(jsonParser);
app.use(express.json());
app.use(cors());
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Or any other email service you're using
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS  // Your email password or app-specific password
    }
});

// Function to send email
const sendEmail = async (to, subject, htmlContent) => {
    console.log(process.env.EMAIL_USER)
    console.log(process.env.EMAIL_PASS)
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER, // Sender address
            to: to,                       // List of receivers
            subject: subject,             // Subject line
            html: htmlContent             // HTML body content
        });
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

app.post('/signup', async function (req, res) {
    const createPayload = req.body;
    const parsePayload = createUser.safeParse(createPayload);
    if (!parsePayload.success) {
        res.status(411).json({
            msg: "You entered wrong inputs!"
        })
        return;
    }

    const userDetails = await User.create({
        name: createPayload.name,
        phone: createPayload.phone,
        email: createPayload.email,
        password: createPayload.password,
    });

    const welcomeEmail = `
            <h1>Welcome to BlogSite, ${createPayload.name}}!</h1>
            <p>Thank you for signing up. We're excited to have you on board!</p>
        `;
    await sendEmail(createPayload.email, 'Welcome to BlogSite!', welcomeEmail);

    res.json({
        msg: "User registered successfully"
    })
});

app.post('/login', async function (req, res) {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    const user = await User.findOne({ email: userEmail });
    const userId = user._id;
    if (!user) {
        return res.status(400).send({ msg: "User not exist" });
    }

    if (user.password != userPassword) {
        return res.status(401).send({ msg: "You entered wrong password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return res.json({ token, userId });

})

app.get('/userAuth', auth, async function (req, res) {
    const userId = req.userId;
    // console.log(userId);
    const user = await User.findById(userId);
    // console.log(user);
    console.log(user)
    if (user == null) {
        return res.status(401).send({ msg: "Try Login Again" })
    }
    return res.status(200).json({ user });
})
app.get('/getBlog', auth, async function (req, res) {
    const blogs = await Blog.find({});
    return res.status(200).json(blogs);
})

app.post('/postBlog', auth, async function (req, res) {
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
        { $push: { blogIds: blogId } },
        { new: true }
    )

    return res.json({
        msg: "Blog created Successfully."
    })
})

app.get('/profile', auth, async function (req, res) {
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });

    // console.log(user);
    return res.status(200).json({user});
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

        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error('Failed to delete local image:', err);
            }
            else {
                console.log('Image deleted!!')
            }
        });
        res.json({ msg: 'Image uploaded', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.post('/updateUserDetails', auth, async (req, res) => {
    const details = req.body;
    const user = await User.findByIdAndUpdate(
        req.userId,
        {
            $set:
            {
                city: details.city,
                country: details.country,
                zipCode: details.zipCode,
                address: details.address
            }
        },
        { new: true }
    )

    res.json({ msg: "User Details Updated Successfully !!", user })

})

app.get('/getUserBlogs', auth, async function (req, res) {
    const blogIds = await User.findById(req.userId).populate('blogIds');
    // console.log(userBlogs)
    const userBlogs = blogIds.blogIds;
    res.status(200).json({userBlogs})
})

app.get('/blog/:blogId', auth, async function (req, res) {
    const blogId = req.params.blogId;
    console.log(blogId)
    try {
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // console.log(blog);
        res.json({blog});
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({ error: 'Failed to fetch blog' });
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});