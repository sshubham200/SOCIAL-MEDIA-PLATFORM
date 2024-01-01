const mongodb = require('mongodb');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_db');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'error in connecting with db'));

db.once('open',function(){
    console.log('Succesfully connected to the server')
});