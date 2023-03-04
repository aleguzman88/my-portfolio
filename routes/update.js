// routes/update.js

const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// GET route for Update View
router.get('/:id', async function(req, res, next) {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id).select('name phoneNumber email');
    res.render('update', { title: 'Update Contact', contact });
  } catch (err) {
    return next(err);
  }
});

// POST route for Update View
router.post('/:id', async function(req, res, next) {
  const { id } = req.params;
  const { name, phoneNumber, email } = req.body;
  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, { name, phoneNumber, email }, { new: true });
    res.redirect('/business_cl');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
