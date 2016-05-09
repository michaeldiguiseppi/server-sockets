(function () {
  'use strict';

  angular.module('myApp')
    .controller('myController', myController);

  myController.$inject = ['$scope', 'NotificationService', 'SocketService'];

  function myController ($scope, NotificationService, SocketService) {
    var vm = this;
    NotificationService.get().then(function (notifications) {
      vm.notifications = notifications.data;
      vm.unreadMessages = vm.notifications.filter(function(notif) {
        return notif.read === false;
      });
    });

    SocketService.forward('status', $scope);
    $scope.$on('socket:status', function (ev, data) {
      console.log('from angular!', ev, data);
      var unreadMessages = [];
      vm.notifications.forEach(function(notification) {
        if (notification.read === false) {
          unreadMessages.push(notification);
        }
        vm.unreadMessages = unreadMessages;
      });
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
