// var route = angular.module('route', ['ngRoute']);

var myApp = angular.module("myApp", ['ngRoute']);
myApp.controller('myController', ['$scope', function($scope){
  $scope.gmail ={
    username:"",
    email:""
  };
  $scope.onGoogleLogin = function(){
    var params = {
      'clientid' : '475310784739-o8q1pvibvp5oa5u6fa74jds4qfb9l9j9.apps.googleusercontent.com',
      'cookiepolicy' : 'single_host_origin',
      'callback' : function(result){
        if(result['status']['signed_in']){
          var request = gapi.client.plus.people.get(
            { 'userId': 'me'}
          );
          request.execute(function(res){
            $scope.$apply(function(){
              $scope.gmail.username = resp.displayName;
              $scope.gmail.email = resp.emails[0].value;
            });
          });
        }
      },
      'approvalprompt' : 'force',
      'scope' : 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
    };
    gapi.auth.signIn(params);
  };
  $scope.facebook ={
    username:"",
    email:""
  };
  $scope.onFBLogin = function(){
    FB.login(function(response){
      if(response.authResponse){
        FB.api('/me', 'GET', {fields: 'email, name'}, function(response){
          $scope.$apply(function(){
            $scope.facebook.username = response.name;
            $scope.facebook.email = response.email;
          });
        });
      }else {
       // error
     }
   }, {
     scope: 'email, name',
     return_scopes: true
   });
  };
}]);
