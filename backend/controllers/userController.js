const User = require('../models/userModel');

// Get all users
const getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

// Create a new user
const createUser = async (req, res) => {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
};

module.exports = { getUsers, createUser };
