var app = angular.module('app', ['ngRoute']);

var API = 'http://localhost:8000';

app.config(function($routeProvider){
  $routeProvider

  .when('/', {
    controller: 'MainController',
    templateUrl: 'home.html'
  })

  .when('/search', {
    controller:  'searchController',
    templateUrl: 'search.html'
  })

  .when('/review', {
    controller:  'reviewController',
    templateUrl: 'review.html'
  })
  .when('/successfulSubmit',{
    controller: 'successfulSubmitController',
    templateUrl: 'successfulSubmit.html'
  });
});


app.controller('MainController', function($scope, $location, $rootScope){
  $rootScope.review = {
    timeDate: "",
    address: "",
    zipCode: "",
    lat: "",
    lng: "",
    name: "",
    badgeNumber: "",
    position: "",
    gender: "",
    ethnicity: "",
    stars: "",
    reviewContent: "",
    reviewRating: ""
  };

  $scope.gotToSearch = function(){

    // $rootScope.date = $scope.date;
    // $rootScope.time = $scope.time;
    // $rootScope.address = $scope.address;
    // $rootScope.zipCode = $scope.zipCode;

    $rootScope.review.timeDate = new Date($scope.date.getFullYear(), $scope.date.getMonth(), $scope.date.getDate(), $scope.time.getHours(), $scope.time.getMinutes(), $scope.time.getSeconds());

    // console.log($rootScope.testDate);
    // console.log($rootScope.date, $rootScope.time);
    $location.path('/search');
  };
});
app.controller('searchController', function($scope,$location, $rootScope){
  $scope.gotToReview = function(){
    // console.log("from the home and search page",$rootScope.date,$rootScope.time );
    // $rootScope.name = $scope.officerName;
    // $rootScope.badgeNumber = $scope.badgeNumber;
    // $rootScope.position = $scope.position;
    // $rootScope.gender = $scope.gender;
    // $rootScope.ethnicity = $scope.ethnicity;

    $location.path('/review');
  };
});
app.controller('reviewController', function($scope, $location, $rootScope, $http){
  $scope.gotToSumbit = function(){
    // console.log($rootScope.date, $rootScope.time, $rootScope.officerName, $rootScope.badgeNumber, $rootScope.position,$rootScope.gender,$rootScope.ethnicity);

    // $rootScope.rating = $scope.rating;
    // $rootScope.reviewContent = $scope.reviewSummary;

    // console.log($rootScope.timeDate, $rootScope.time, $rootScope.address,$rootScope.zipCode,$rootScope.name, $rootScope.badgeNumber, $rootScope.position,$rootScope.gender,$rootScope.ethnicity,$rootScope.rating,$rootScope.reviewContent);






    // reviewData.timeDate = $rootScope.timestamp;
    // reviewData.address = $rootScope.address;
    // reviewData.zipCode = $rootScope.zipCode;
    // reviewData.name = $rootScope.officerName;
    // reviewData.badgeNumber = $rootScope.badgeNumber;
    // reviewData.position = $rootScope.position;
    // reviewData.gender = $rootScope.gender;
    // reviewData.ethnicity = $rootScope.ethnicity;
    // reviewData.stars = $rootScope.rating;
    // reviewData.reviewContent = $rootScope.reviewContent;

    console.log($rootScope.review);

    $http.post(API+"/postreview", $rootScope.review)
      .success(function(){
        var review = alert("thank you for your review");
        $location.path('/');
        // console.log(data);
      })
      .catch(function(err){
        console.error(err.message);
      });


  };
});
// app.controller('succesfullSubmitController', function($scope, $location){
//   $scope.search = function(){
//     $location.path('/');
//   };
// });
