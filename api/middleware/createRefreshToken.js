const jwt = require('jsonwebtoken');

const createRefreshToken = (payload) => {
    return new Promise((resolve, reject) => {
        resolve(jwt.sign({
            payload,
        },  process.env.REFRESH_TOKEN_SECRET, { expiresIn: 10000000000000 }));
    });
    
} 


module.exports = createRefreshToken;