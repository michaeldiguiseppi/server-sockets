(function () {
  'use strict';

  angular.module('myApp')
    .service('NotificationService', NotificationService);

  NotificationService.$inject = ['$http'];

  function NotificationService ($http) {
    return {
      get: function () {
        return $http.get('/api/notifications');
      },
      read: function (id) {
        return $http.put('/api/notifications/' + id + '/read');
      }
    };
  }
})();
