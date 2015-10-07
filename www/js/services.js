var services = angular.module('FrontPage.services',[])

services.factory('frontpage', function($http){
	var newsfeed = {};

	$http.get("http://www.reddit.com/.json")
    .success(function(request) {
      newsfeed = request.data;
  }
  )
  return {
  	one: function(){
  		return newsfeed;
  	}
  }
}
)