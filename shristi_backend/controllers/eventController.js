const Event = require('../models/Event');
const Incharge = require('../models/Incharge');
const User = require('../models/User');

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .select('-registrations -notifications')
      .sort({ date: 1, time: 1 }); // First sort by date, then by time for the same date
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDepartmentWiseEvents = async (req, res) => {
  try {
    const events = await Event.find({ department: req.params.dept }).select('-registrations -notifications');;
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.getDepartmentWiseEventsIC = async (req, res) => {
  try {
    const incharge = await Incharge.findById(req.user.id);
    if (!incharge) return res.status(404).json({ message: 'Incharge not found' });
    const events = await Event.find({ department: incharge.department });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createEvent = async (req, res) => {
  const event = new Event(req.body);
  try {
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // Check if the user is already registered
    if (event.registrations.includes(user._id)) {
      return res.status(400).json({ message: 'User already registered for this event' });
    }
    
    event.registrations.push(user._id);
    user.registeredEvents.push(event._id);
    
    await event.save();
    await user.save();

    res.json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('registrations');
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const { date, time, venue } = req.body;
    const notifications = [];

    if (date && event.date.toISOString().split('T')[0] !== date) {
      const message = `Event "${event.name}" date changed to ${new Date(date).toLocaleDateString()}`;
      event.notifications.push({ message });
      notifications.push(message);
    }
    if (time && event.time !== time) {
      const message = `Event "${event.name}" time changed to ${time}`;
      event.notifications.push({ message });
      notifications.push(message);
    }
    if (venue && event.venue !== venue) {
      const message = `Event "${event.name}" venue changed to ${venue}`;
      event.notifications.push({ message });
      notifications.push(message);
    }

    // Push notifications to registered users
    if (notifications.length > 0) {
      for (const user of event.registrations) {
        user.notifications.push(...notifications);
        await user.save();
      }
    }

    Object.assign(event, req.body);
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('registrations', 'name email whatsappNumber');
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEventByIdPublic = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).select('-registrations -notifications');
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.isRegistered = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const isRegistered = event.registrations.includes(req.user.id);
    res.json({ isRegistered });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};