const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/authModel');

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: hashedPassword,
        });

        await user.save();
        res.json({ success: true, message: 'User created successfully' });
    } catch (err) {
        if (err.code === 11000) {
            return res.json({ success: false, message: 'User Already Exists' });
        }
        console.error(err);
        res.json({ success: false, message: 'User registration failed' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (result) {
                const payload = {
                    userId: user._id
                };
                const token = jwt.sign(payload, 'webBatch', { expiresIn: '1h' });
                return res.json({ success: true, token: token, message: 'Login successful' });
            } else {
                return res.json({ success: false, message: 'Invalid password' });
            }
        });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'Authentication failed' });
    }
});

module.exports = router;
