const Event = require('../models/Event');
// const User = require('../models/User');

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
