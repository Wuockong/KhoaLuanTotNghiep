const mongoose = require('mongoose');

const ElderlySchema = new mongoose.Schema({
  elderly_id: { type: String, unique: true },
  user_id: { type: String, required: true },
  email: String,
  email_verified: Boolean,
  hashed_password: String,
  full_name: String,
  gender: Boolean,
  date_of_birth: Date,
  permanent_address: Object,
  current_address: Object,
  insurance_number: String,
  phone_number: String,
  avatar_url: String,
}, { collection: 'Elderly' });

module.exports = mongoose.model('Elderly', ElderlySchema);
