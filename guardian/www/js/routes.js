angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

  .state('officerInfo', {
    url: '/officerInfo',
    templateUrl: 'templates/officerInfo.html',
    controller: 'officerInfoCtrl'
  })

  .state('review', {
    url: '/review',
    templateUrl: 'templates/review.html',
    controller: 'reviewCtrl'
  })

$urlRouterProvider.otherwise('/home')

  

});