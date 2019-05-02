const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/code-split-expertos', {
  useCreateIndex: true,
  useNewUrlParser: true
})
  .then(db => console.log('base de datos conectada'))
  .catch(err => console.error(err));
