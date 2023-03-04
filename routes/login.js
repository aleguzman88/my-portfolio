const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

mongoose.connect('mongodb://127.0.0.1:27017/bcontacts', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to database successfully.');
});

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/', async function(req, res, next) {
  if (req.body.login) {
    // login button was clicked, handle login
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user || user.password !== password) {
        return res.redirect('/login');
      }
      req.session.userId = user._id;
      return res.redirect('/business_cl');
    } catch (err) {
      return next(err);
    }
  }
});

module.exports = router;
