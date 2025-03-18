const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const InchargeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["incharge", "admin"], default: "incharge" },
  department: { type: String, enum: ["CSE", "ECE", "EE", "AE", "ME", "CE"], required: true },
  phoneNumber: { type: String, required: true },
});

// Hash password before saving
InchargeSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Compare password
InchargeSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Incharge', InchargeSchema);
