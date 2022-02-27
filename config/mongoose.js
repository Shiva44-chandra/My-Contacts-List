const mongoose = require('mongoose'); //required library

mongoose.connect('mongodb://localhost/contacts_list-db'); //connect to datbase

const db = mongoose.connection; //gives access to database

db.on('error',console.error.bind('error connecting to database'));  //if error in connection

db.once('open',function()
{
  console.log('Successfuly Connected to database');
});
