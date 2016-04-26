var mongoose = require('mongoose');
var config = {
  test: 'mongodb://localhost/sockets-db-testing',
  development: 'mongodb://localhost/sockets-db',
  production: process.env.MONGODB_URI
};
var environment = process.env.NODE_ENV || 'development';
var mongoURI = config[environment];

mongoose.connect(mongoURI);

module.exports.seed = require('./seed');
module.exports.Notification = require('./notification');
