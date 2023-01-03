const bcrypt = require('bcryptjs');
const createToken = require('../../api/middleware/createToken');
const createRefreshToken = require('../../api/middleware/createRefreshToken');
const User = require('../../interfaces/user');


const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.find({email});
        if(user.length > 0) {
            const isMatch = bcrypt.compareSync(password, user[0].password);
            if(!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
            }
            const payload = {
                user: {
                    id: user[0].id
                },
                iat: Math.floor(Date.now() / 1000) - 30
            };
            const token = await createToken(payload);
            const refreshToken = await createRefreshToken(payload);
            // res.cookie('jwt', refreshToken, { httpOnly: true, 
            //     sameSite: 'None', secure: true, 
            //     maxAge: 24 * 60 * 60 * 1000 });
            return res.json({ payload, token, refreshToken });
        }else{
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

module.exports = login;