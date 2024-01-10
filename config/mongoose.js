const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting with db'));

db.once('open', function() {
  console.log('Successfully connected to the server');
});
