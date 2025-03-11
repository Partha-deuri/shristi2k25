const Event = require('../models/Event');
const User = require('../models/User');

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("registeredEvents");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getEvent = async (req, res) => {
    try {
        const user = User.findById(req.user.id);
        const events = user.registeredEvents;
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getNotifications = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.notifications);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

exports.getName = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.name);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}
