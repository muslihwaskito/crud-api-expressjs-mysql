const jwt = require('jsonwebtoken');


const authMiddleware = 
function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['token'] || req.headers['authorization'];
    
    if (token) {
        // check if bearer
        if (token.includes("Bearer ")) {
            token = token.replace("Bearer ", "");
        }

        jwt.verify(token, process.env.APP_KEY, function (err, decode) {
            if (err) {
                res.json({
                    status: "error",
                    message: err.message,
                    data: null,
                });
            } else {
                req.auth = decode.result;
                next();
            }
        });
    } else {
        res.status(403).send({
            success: false,
            message: "No token provided"
        })
    }
}

module.exports = authMiddleware;