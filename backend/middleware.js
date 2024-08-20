const JWT_SECRET = "secret";
var jwt = require('jsonwebtoken');

module.exports = {
    auth: (req, res, next) => {
        const authHeader = req.headers["authorization"];
        // console.log(authHeader);
        
        if (!authHeader) {
            return res.status(403).json({msg: "Missing auth header"});
        }
        const decoded = jwt.verify(authHeader, JWT_SECRET);
        if (decoded && decoded.id) {
            req.userId = decoded.id;
            next()
        } else {
            return res.status(403).json({msg: "Incorrect token"});
        }
    },
}