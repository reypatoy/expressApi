const mongoose = require("../mongodb_config");

const userSchema = new mongoose.Schema({
    fist_name: String,
    last_name: String,
    email: String,
    password: String
})

const User = mongoose.model('User', userSchema);

module.exports = User;