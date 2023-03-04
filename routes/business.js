// routes/business.js

const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// Display business contacts list view
router.get('/', async function(req, res, next) {
  try {
    const contacts = await Contact.find({}, 'name phone email');
    res.render('business', { title: 'Business Contacts', contacts });
  } catch (err) {
    return next(err);
  }
});

// Delete a contact
router.post('/delete/:id', async function(req, res, next) {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect('/business');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
