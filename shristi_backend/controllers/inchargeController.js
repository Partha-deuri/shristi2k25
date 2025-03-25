const Event = require('../models/Event');
const Incharge = require('../models/Incharge');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.getIncharge = async (req, res) => {
    try {
        const user = await Incharge.findById(req.user.id)
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


exports.getRegisteredUsers = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId).populate('registeredUsers');
        res.json(event.registeredUsers);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.deregisterUserFromEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        const userIndex = event.registeredUsers.indexOf(req.params.userId);
        if (userIndex > -1) {
            event.registeredUsers.splice(userIndex, 1);
            await event.save();
            res.json({ message: "User deregistered from event" });
        } else {
            res.status(404).json({ message: "User not found in event" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.inchargeSignup = async (req, res) => {
    const { name, email, password, department, phoneNumber } = req.body;
    try {
        const user = new Incharge({ name, email, password, role: 'incharge', department, phoneNumber });
        await user.save();
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'Incharge created successfully', token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.inchargeLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Incharge.findOne({ email, role: 'incharge' });
        if (!user) return res.status(400).json({ message: 'Incharge not found' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
