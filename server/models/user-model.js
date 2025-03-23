const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        // required: true
    },
    loginMethods: {
        type: [String],
        default: []
    },
    image: {  // New field to store the Google profile image URL
        type: String,
        default: null
    }
}, {
    timestamps: true    
});

const User = mongoose.model('User', userSchema);

module.exports = User;