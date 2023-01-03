const User = require('../../interfaces/user');
const Bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const { fist_name, last_name, email, password } = req.body;
    try {
        // See if the user exists
        const user = await User.find({email});

        if (user.length > 0) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }
        else{
            const encryptedPassword = await Bcrypt.hash(password, 10);
            const user = new User({
                fist_name, 
                last_name, 
                email, 
                password: encryptedPassword
            });
            user.save().then(() => res.status(200).json('User added!'),
            err => res.status(400).json('Error: ' + err));
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

module.exports = register;