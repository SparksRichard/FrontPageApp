// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('FrontPage', ['ionic'])


.controller('FrontPageCtrl', function($scope, $http) {

  var redditApp = new Object();
  redditApp.linkManager = [];

  var parsedRequest;
  var comments = "";
  var pic = "";
  var titleLink;

  /**
   * Requests the JSON data from reddit.com.
   * recieves and parses data on top 25 posts at the time.
   * calls buildobjects and writeToScreen to extract data we want, format it to html, and push it to the webpage.
   */


  $http.get("http://www.reddit.com/.json")
    .success(function(request) {

      $scope.rawData = request;
      redditApp.buildObjects();
      redditApp.writeToScreen();
      console.log($scope.posts);
      console.log($scope.rawData);

    });

  /**
   * Constructor for each reddit link. Includes link to post and comments, name of the author, score of the post, whether it is NSFW, and what subreddit it was posted to
   * 
   * @param author {string}
   * @param num_comments {int}
   * @param over_18 {boolean}
   * @param permalink {string--comments link}
   * @param score {int}
   * @param subreddit {string}
   * @param thumbnail {string--link}
   * @param title {string}
   * @param url {string--link}
   */
  function Link(author, num_comments, over_18, permalink, score, subreddit, thumbnail, title, url) {
    this.author = author;
    this.num_comments = num_comments;
    this.over_18 = over_18;
    this.permalink = permalink;
    this.score = score;
    this.subreddit = subreddit;
    this.thumbnail = thumbnail;
    this.title = title;
    this.url = url;
  }

  /**
   * builds an array of 25 objects that contain the imported data from reddit
   */
  redditApp.buildObjects = function() {
    var redditData = $scope.rawData.data.children
    var myLink;
    for (x in redditData) {
      myLink = new Link(
        redditData[x].data.author,
        redditData[x].data.num_comments,
        redditData[x].data.over_18,
        redditData[x].data.permalink,
        redditData[x].data.score,
        redditData[x].data.subreddit,
        //if = "nsfw" or ""
        redditData[x].data.thumbnail,
        redditData[x].data.title,
        redditData[x].data.url
      );
      redditApp.linkManager.push(myLink);
    }
  }

  /**
   * Returns a string that alerts if the link is NSFW
   * @param  x {int}
   * @return {string} 
   */
  redditApp.checkForNSFW = function(x) {
    if (this.linkManager[x].over_18) {
      return "NSFW!";
    } else {
      return "";
    }
  }

  /**
   * updates the thumbnail depending on what type of link it is
   * @param  x {int}
   */
  redditApp.updateThumbnail = function(x) {

      switch (this.linkManager[x].thumbnail) {
        case "nsfw":
          pic = 'http://i.imgur.com/UHzw6.png';
          break;
        case "":
          pic = 'http://i.imgur.com/vMScC.gif';
          break;
        case "self":
          pic = 'https://lh3.googleusercontent.com/-I7VHiw7eMcM/AAAAAAAAAAI/AAAAAAAAAAA/v9t8aXluKrs/photo.jpg';
          break;
        case "default":
          pic = 'http://i.stack.imgur.com/kL2G9.png';
          break;
        default:
          pic = this.linkManager[x].thumbnail;
      }
    }
    /**
     * cycles through our data
     * appends each element into title variable as html
     */
  var comments = "";
  var title = '';

  redditApp.writeToScreen = function() {
    $scope.posts = [];
    for (x in this.linkManager) {
      var title = '';
      //fixes some formatting
      comments = 'http://www.reddit.com' + redditApp.linkManager[x].permalink;
      redditApp.updateThumbnail(x);
      //creates a hyperlink of the given thumbnail
      title += '<a class = "picture" href = "' + this.linkManager[x].url + '"><img class = "thumbnail" src = "' + pic + '" alt = "broken!!" ></a>';
      //creates a link for the title, a link for the comments (that includes the number of comments) and whether or not the link is NSFW
      title += '<ul class = "titleLink" style = "list-style-type:none"><li><p class="paragraph"><a class = "titleFormat" href = "' + this.linkManager[x].url + '" >' + this.linkManager[x].title + '</a></p></li><li><a class = "commentFormat" href = "' + comments + '">Click here to view ' + this.linkManager[x].num_comments + ' comments.</a></li><li class="notSafe">' + redditApp.checkForNSFW(x) + '</li></ul>';
      //makes a list of Score, Subreddit, and Author of the article
      title += '<ul class = "infoList">';
      title += '<li>Points:' + this.linkManager[x].score + '</li>';
      title += '<li>Sub:' + this.linkManager[x].subreddit + '</li>';
      title += '<li>By:' + this.linkManager[x].author + '</li></ul>';
      $scope.posts[x] = {
        title
      };
    }

  }

})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});