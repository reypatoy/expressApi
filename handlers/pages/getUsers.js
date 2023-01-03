const User = require('../../interfaces/user');

const getUsers = async (req, res) => {
    await User.find({}, (err, found) => {
        const users = found.map(user => {
            return {
                id: user._id,
                fist_name: user.fist_name,
                last_name: user.last_name,
                email: user.email
            }
        });
        if (!err) {
           return res.status(200).json(users);
        }
        res.status(400).json({ msg: `No members` });

    }).catch(err => console.log("Error occured, " + err));
};

module.exports = getUsers;
