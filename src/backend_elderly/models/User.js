const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  user_id: String,
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
  public_key: String,
  private_key_encrypted: String,
  qr_code_data: String,
  updated_at: Date,
}, { collection: 'users' }); // chính xác tên collection trong MongoDB

module.exports = mongoose.model('User', UserSchema);
