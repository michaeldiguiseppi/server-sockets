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
  }
})();
