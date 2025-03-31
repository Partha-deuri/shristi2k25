const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  registrations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  notifications: [
    {  
      message: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  registrationsClosed: { type: Boolean, default: false }, // New field to track registration status
  imagePath: { type: String, default: "/SHRISTI_w_border.png" }, // New field to store image path
  rules: [{ type: String }], // New field for event rules
  prizes: { type: String }, // New field for event prizes
 // New field for event image 
});

// Middleware to ensure unique users in registrations
EventSchema.pre('save', function (next) {
  this.registrations = [...new Set(this.registrations.map(String))];
  next();
});

module.exports = mongoose.model('Event', EventSchema);  