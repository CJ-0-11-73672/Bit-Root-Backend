const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/create', contactController.createContact);
router.delete('/:id', contactController.deleteContact);
router.get('/all', contactController.getAllContacts);
router.get('/search', contactController.searchContacts);
router.put('/:id', contactController.updateContact);
router.post('/uploadImage/:id', contactController.uploadImage);
router.get('/exportCsv', contactController.exportCsv);

module.exports = router;