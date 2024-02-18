const Contact = require('../models/contact');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

exports.createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchContacts = async (req, res) => {
  try {
    const query = req.query.q;
    const contacts = await Contact.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { phoneNumber: { $regex: query, $options: 'i' } },
      ],
    });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    contact.image = req.file.path;
    await contact.save();
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.exportCsv = async (req, res) => {
  try {
    const contacts = await Contact.find();
    const csvWriter = createCsvWriter({
      path: 'contacts.csv',
      header: [
        { id: 'name', title: 'Name' },
        { id: 'phoneNumber', title: 'Phone Number' },
        { id: 'image', title: 'Image' },
      ],
    });

    csvWriter.writeRecords(contacts).then(() => {
      res.status(200).download('contacts.csv');
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
