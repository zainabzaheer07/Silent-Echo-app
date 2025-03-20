const mongoose = require('mongoose');

// Connect to the database
require('dotenv').config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_HOST);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
    }
}; 

module.exports = connectDB;