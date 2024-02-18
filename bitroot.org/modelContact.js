const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, unique: true, required: true },
  image: String,
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;