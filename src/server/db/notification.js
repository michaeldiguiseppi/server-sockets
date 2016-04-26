var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
mongoose.Promise = require('bluebird');

var NotificationSchema = new Schema({
  content: String,
  subject: String,
  sender: String,
  read: {
    type: Boolean,
    default: false
  }
});

var Notification = mongoose.model('notifications', NotificationSchema);

module.exports = Notification;
