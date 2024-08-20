<<<<<<< Updated upstream
const JWT_SECRET = "secret";
=======
require('dotenv').config()
>>>>>>> Stashed changes
var jwt = require('jsonwebtoken');

module.exports = {
    auth: (req, res, next) => {
        const authHeader = req.headers["authorization"];
        // console.log(authHeader);
        
        if (!authHeader) {
            return res.status(403).json({msg: "Missing auth header"});
        }
        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
        if (decoded && decoded.id) {
            req.userId = decoded.id;
            next()
        } else {
            return res.status(403).json({msg: "Incorrect token"});
        }
    },
}