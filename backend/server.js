const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { readdirSync } = require('fs');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env

// Import routes and middleware
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const authMiddleware = require('./middleware/authMiddleware');

// Initialize Express app
const app = express();

// Constants
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI; // MongoDB URI from .env

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Explicitly register authentication routes
app.use('/api/auth', authRoutes);

// Use middleware to protect dashboard routes
app.use('/api/dashboard', authMiddleware, dashboardRoutes);

// Dynamically load other routes from the 'routes' folder
readdirSync('./routes').forEach((routeFile) => {
    if (routeFile !== 'auth.js' && routeFile !== 'dashboard.js') {
        app.use('/api', require('./routes/' + routeFile)); // Prefix all routes with '/api'
    }
});

// MongoDB connection function
const connectDB = async () => {
    try {
        if (!MONGO_URI) {
            throw new Error("MONGO_URI is undefined. Check your .env file.");
        }
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB successfully");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1); // Exit the process if connection fails
    }
};

// Start the server
const startServer = async () => {
    await connectDB(); // Ensure DB is connected before starting server
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
};

startServer(); // Start the server

