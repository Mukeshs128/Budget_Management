const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Dashboard Route (Protected)
router.get('/', authMiddleware, (req, res) => {
    res.send(`Welcome to the dashboard, user ID: ${req.user.id}`);
});

module.exports = router;
