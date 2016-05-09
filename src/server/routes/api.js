var router = require('express').Router();
var db = require('../db');

router.get('/ping', ping);
router.get('/notifications', get);
router.post('/notifications', post);
router.put('/notifications/:id/read', read);

module.exports = router;

///////////////////////////
/*

io.on('connection', function (socket) {
  socket.emit('status', { status: 'ok' });
});

*/

function ping (req, res) {
  global.io.emit('status', 'ok');
  res.status(200).json({ message: 'pong!' });
}

function get (req, res) {
  db.Notification.find({})
  .then(function (notifications) {
    res.status(200).json(notifications);
  });
}

function post (req, res) {
  if ( !req.body || !req.body.content ) {
    res.status(422).json({ errors: { invalid: 'Requires a `content` key.' }});
  } else {
    new db.Notification(req.body).save()
    .then(function (notification) {
      res.status(201).json(notification);
    })
    .catch(function (notification) {
      res.status(422).json(notification);
    });
  }
}

function read (req, res) {
  db.Notification.findById(req.params.id)
  .then(function (notification) {
    notification.read = true;
    return notification.save();
  })
  .then(function (notification) {
    global.io.emit('status', req.params.id);
    res.status(200).json(notification);
  })
  .catch(function (notification) {
    res.status(422).json(notification);
  });
}
