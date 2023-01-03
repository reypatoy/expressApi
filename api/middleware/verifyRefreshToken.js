const jwt = require('jsonwebtoken');
const createToken = require('./createToken');


const verifyRefreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    if(!refreshToken) {
        return res.status(401).json({
            message: 'Unauthorizedd'
        });
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if(err) {
            return res.status(403).json({
                message: 'Forbidden'
            });
        }
        const payload = {
            user: {
                id: req.body.payload.user.id
            },
            iat: Math.floor(Date.now() / 1000) - 30
        };
        createToken(payload).then(token => {
            return res.status(200).json({
                token
            });
        }).catch(err => {
            return res.status(500).json({
                message: 'Internal server error'
            });
        });
    });
}

module.exports = verifyRefreshToken;