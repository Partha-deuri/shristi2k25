const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "incharge", "admin"], default: "user" },
  registeredEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  notifications: { type: [String], default: [] },
  rollNumber: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  whatsappNumber: { type: String, required: true },
  isNeristian: { type: Boolean, default: false },
  department: { type: String },
  year: { type: String },
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Compare password
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);