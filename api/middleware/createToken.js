const jwt = require('jsonwebtoken');

const createToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 60 },
            (err, token) => {
                if(err)
                    throw err;
                else
                    resolve(token);
            }
        );
    });
    
}

module.exports = createToken;