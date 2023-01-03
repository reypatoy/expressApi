const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    var token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
        next();
    });
}

module.exports = verifyToken;