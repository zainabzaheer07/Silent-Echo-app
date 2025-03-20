const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/user-model');
const { OAuth2Client } = require('google-auth-library');
require("dotenv").config();

// Google OAuth2 Client
const googleClient = new OAuth2Client(process.env.GOOGLEClientId);

// In-memory OTP store (use Redis or MongoDB in production)
const otpStore = {};

// Nodemailer configuration (using Gmail as an example)
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS  // Your Gmail App Password
    }
});

// Generate a 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP via email
const sendOTPEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP for Registration',
        text: `Your OTP is ${otp}. It is valid for 10 minutes.`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${email}`);
    } catch (err) {
        console.error('Error sending OTP email:', err);
        throw err;
    }
}; 

// Register Controller (Step 1: Send OTP)
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Generate and store OTP
        const otp = generateOTP();
        otpStore[email] = { otp, expires: Date.now() + 10 * 60 * 1000 }; // 10-minute expiry

        // Send OTP email
        await sendOTPEmail(email, otp);

        res.status(200).json({ msg: 'OTP sent to your email. Please verify to complete registration.' });
    } catch (err) {
        console.error('Register Error:', err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Verify OTP and Complete Registration (Step 2)
exports.verifyOTP = async (req, res) => {
    const { email, otp, username, password } = req.body;

    try {
        // Validate OTP
        const storedOTP = otpStore[email];
        if (!storedOTP || storedOTP.otp !== otp || Date.now() > storedOTP.expires) {
            return res.status(400).json({ msg: 'Invalid or expired OTP' });
        }

        // Check if user already exists (double-check)
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create new user
        user = new User({
            name: username,
            email,
            password,
            loginMethods: ['email']
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user to database
        await user.save();

        // Clear OTP from store
        delete otpStore[email];

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error('Verify OTP Error:', err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Login Controller (Email/Password)
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Create and send JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        username: user.name
                    }
                });
            }
        );
    } catch (err) {
        console.error('Login Error:', err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Google Login Controller
exports.googleLogin = async (req, res) => {
    const { idToken } = req.body;

    try {
        const ticket = await googleClient.verifyIdToken({
            idToken,
            audience: process.env.GOOGLEClientId,
        });
        const payload = ticket.getPayload();
        const email = payload.email;

        let user = await User.findOne({ email });
        if (!user) {
            user = new User({
                name: payload.name,
                email,
                loginMethods: ['google']
            });
            await user.save();
        } else {
            if (!user.loginMethods.includes('google')) {
                user.loginMethods.push('google');
                await user.save();
            }
        }

        const token = jwt.sign(
            { user: { id: user.id } },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                username: user.name
            }
        });
    } catch (err) {
        console.error('Google Login Error:', err);
        res.status(401).json({ msg: 'Invalid token' });
    }
};

module.exports = exports;