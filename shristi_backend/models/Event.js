const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  registrations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  notifications: [
    {
      message: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  registrationsClosed: { type: Boolean, default: false }, // New field to track registration status
});

module.exports = mongoose.model('Event', EventSchema);