'use strict';

module.exports = {
  PORT: process.env.PORT || 8080,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://Aaron:Aaron123@ds043987.mlab.com:43987/blackjack-app',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'mongodb://localhost:27017/thinkful-backend-test',
  JWT_SECRET: process.env.JWT_SECRET || '.env.JWT_SECRET',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d'
};
