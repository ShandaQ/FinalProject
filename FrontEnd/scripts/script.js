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

  $scope.getLocation = function() {
    var output = document.getElementById('geoLocation');
    output.innerHTML = "<p>Locating…</p>";

    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(function(position) {
        document.getElementById("location").style.color = "blue";

        $rootScope.review.lat = position.coords.latitude;
        $rootScope.review.lng = position.coords.longitude;


        console.log($rootScope.review.lat, $rootScope.review.lng);
        output.innerHTML = "";
        // do_something(position.coords.latitude, position.coords.longitude);
      },function error(){
        alert("Sorry, no position available, please enter your location");
      });
    } else {
      /* geolocation IS NOT available */
      console.log("Unable to retrieve your location");
      alert("Sorry your browser does not support geolocation, please enter your location");
    }
  };

  $scope.gotToSearch = function(){

    // $rootScope.date = $scope.date;
    // $rootScope.time = $scope.time;
    // $rootScope.address = $scope.address;
    console.log($rootScope.review.lat, $rootScope.review.lng);

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
