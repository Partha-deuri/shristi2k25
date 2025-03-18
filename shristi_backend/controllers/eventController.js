const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDepartmentWiseEvents = async (req, res) => {
  try {
      const events = await Event.find({ department: req.params.department });
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

    event.registrations.push(req.user.id);
    await event.save();
    res.json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const { date, venue } = req.body;
    if (date && event.date !== date) {
      event.notifications.push({ message: `Event date changed to ${new Date(date).toLocaleDateString()}` });
    }
    if (venue && event.venue !== venue) {
      event.notifications.push({ message: `Event venue changed to ${venue}` });
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