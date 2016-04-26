var Notification = require('./notification');
var faker = require('faker');

module.exports = seed;

function seed () {
  var notifications = [];
  for ( var i = 0; i < 10; i++ ) {
    notifications.push({
      content: faker.lorem.words(10)
    });
  }

  return Notification.collection.insert(notifications);
}
