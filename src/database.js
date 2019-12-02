const mongoose = require('mongoose');

//mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/node-notes-db', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));