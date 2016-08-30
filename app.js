//MODULE 

var myApp = angular.module('myApp', ['ngRoute', 'ngResource'])







//ROUTES

myApp.config(function($routeProvider){
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/post.htm',
        controller: 'postCtrl'
    })
    
    .when('/comment', {
        templateUrl: 'pages/comment.htm',
        controller: 'commentCtrl'
    })
    
})










//CONTROLLERS


    
myApp.controller('postCtrl', ['$rootScope', '$scope', '$http', '$location', function($rootScope, $scope, $http, $location){    


    
      var getAPI =    $http.get('https://jsonplaceholder.typicode.com/posts')
  

       getAPI.success(function(data){
           $scope.posts = data;
          
        })
       getAPI.error(function(err) { 
              return err
       })
      
    
       
         
     $rootScope.getComment=  function(index) {
       
       $rootScope.postId = $scope.posts[index].userId

        $location.path('/comment')
       
        }

    
   
   
}])




myApp.controller('commentCtrl', ['$rootScope', '$scope', '$http', '$routeParams', function($rootScope,$scope, $http, $routeParams){
 

    
    $http.get('https://jsonplaceholder.typicode.com/comments?postId='+$scope.postId)
     .success(function(data){
        $scope.comments = data
    })
    .error(function(err) { 
              return err
            })
      
    
        $scope.$watch('$scope.posts[index].userId', function(){
             return $scope.postId
        })

    
}])

  