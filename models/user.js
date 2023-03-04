const uri = 'mongodb://localhost:27017/bcontacts';
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true }
  }, { collection: 'contacts' });
  