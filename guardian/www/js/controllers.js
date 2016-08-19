var API = 'http://193eaff2.ngrok.io';
angular.module('app.controllers', [])


.controller('homeCtrl',function ($scope, $stateParams, $rootScope) {
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

  $scope.timedate = {
    date: "",
    time: ""
  };
  $scope.gotToSearch = function(){
    // console.log($rootScope.review.lat, $rootScope.review.lng,$scope.timedate.date, $scope.timedate.date,$rootScope.review.address, $rootScope.review.zipCode);

    // takes the scope timedate object and converts it to a timestamp and saves it to the rootScope object timeDate
    $rootScope.review.timeDate = new Date($scope.timedate.date.getFullYear(), $scope.timedate.date.getMonth(), $scope.timedate.date.getDate(), $scope.timedate.time.getHours(), $scope.timedate.time.getMinutes(), $scope.timedate.time.getSeconds());

    // console.log($rootScope.review.lat, $rootScope.review.lng, $rootScope.review.timeDate);
    // $location.path('/search');
  };
})

.controller('officerInfoCtrl',function ($scope, $stateParams,$rootScope) {
  $scope.gotToReview = function(){
    console.log($rootScope.review.lat, $rootScope.review.lng,$rootScope.review.timeDate,$rootScope.review.address, $rootScope.review.zipCode,$rootScope.review.name,$rootScope.review.badgeNumber,$rootScope.review.position, $rootScope.review.gender,$rootScope.review.ethnicity);
    // $location.path('/review');
  };

})

.controller('reviewCtrl',function ($scope, $stateParams,$rootScope, $http) {
  $scope.goToSubmit = function(){
    console.log($rootScope.review);

    $http.post(API+"/postreview", $rootScope.review)
      .success(function(){
        // var review = alert("Your community thanks you for the review");
        $rootScope.review = "";
        $scope.timedate = "";
        document.getElementById("location").style.color = "gray";
      })
      .catch(function(err){
        console.log(err.message);
      });
  };

});
