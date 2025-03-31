const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const InchargeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] 
  },
  password: { type: String, required: true },
  role: { type: String, enum: ["incharge", "admin"], default: "incharge" },
  department: { type: String, enum: ["CSE", "ECE", "EE", "AE", "ME", "CE","FO","MBA","Techno"], required: true },
  phoneNumber: { 
    type: String, 
    required: true, 
    minlength: 10, 
    maxlength: 15 
  },
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
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

module.exports = mongoose.model('Incharge', InchargeSchema);
