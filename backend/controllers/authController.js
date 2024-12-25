// User registration and Login
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const { firstName, lastName, email, phone, password, passwordConfirm, acceptTerms } = req.body;
    try {
        const userExits = await User.findOne({ email });
        if (userExits) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ firstName, lastName, email, phone, password, passwordConfirm, acceptTerms });
        res.status(201).json({ id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ message: 'Invalid Credentials' });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: '1'});
        res.json({ token, user: { id: user.id, name: user.name} });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser };