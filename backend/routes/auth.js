// backend/routes/auth.js
const express = require('express');
const User = require('../model/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = 'supersecret123!@#$%'; 

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, username, password } = req.body;

        // Validate inputs
        if (!name || !email || !username || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check for existing user
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or Username already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save new user
        const user = new User({ name, email, username, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Duplicate entry detected' });
        }
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});


    // Login
    router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
    });

module.exports = router;
