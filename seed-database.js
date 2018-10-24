const mongoose = require('mongoose');

const { TEST_DATABASE_URL } = require('./config');
const User = require('./models/user');
const Stat = require('./models/stat');

const { stats, users } = require('./db/users');

mongoose.connect(TEST_DATABASE_URL, { useNewUrlParser:true })
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => {
    return Promise.all([
      User.insertMany(users),
      Stat.insertMany(stats)
    ]);
  })
  .then(results => {
    console.info(`Completed ${results.length} Promises, inserting ${results.length / 5} items`);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(err);
  });