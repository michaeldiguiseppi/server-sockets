(function () {
  'use strict';

  angular.module('myApp')
    .controller('myController', myController);

  myController.$inject = ['NotificationService'];

  function myController (NotificationService) {
    var vm = this;
    NotificationService.get().then(function (notifications) {
      vm.notifications = notifications.data;
    });

    vm.markAsRead = markAsRead;

    function markAsRead (notif) {
      if ( notif.read ) { vm.selected = notif; }
      else {
        NotificationService.read(notif._id)
        .then(function (notification) {
          var selected = vm.notifications.filter(function (notif) {
            return notif._id === notification.data._id;
          })[0];
          selected.read = true;
          vm.selected = selected;
        });
      }
    }
  }
})();
