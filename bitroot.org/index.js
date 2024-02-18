const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/contactlist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use('/contacts', contactRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});