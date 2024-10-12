require('dotenv').config()
let jwt = require('jsonwebtoken');

module.exports = {
    auth: (req, res, next) => {
        const authHeader = req.headers["authorization"];
        // console.log(authHeader);
        
        if (!authHeader) {
            return res.status(403).json({msg: "Missing auth header"});
        }
        const userId = jwt.verify(authHeader, process.env.JWT_SECRET);
        if (userId && userId.id) {
            req.userId = userId.id;
            next()
        } else {
            return res.status(403).json({msg: "Incorrect token"});
        }
    }
}