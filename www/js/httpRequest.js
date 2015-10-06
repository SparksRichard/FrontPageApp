angular.module('FrontPage', ['ionic'])


.controller('FrontPageHttpRequest', function($scope, $http) {

	  $http.get("http://www.reddit.com/.json")
    .success(function(request) {
    	console.log(request);
      $scope.rawData = request;
      redditApp.buildObjects();
      redditApp.writeToScreen();
      console.log($scope.posts);
      console.log($scope.rawData);
		}
		)
}
)