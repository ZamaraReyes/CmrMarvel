(function(){
    'use strict';
    
    angular
        .module('APP', ['ngRoute']).config(config);
    
    config.$inject = ['$routeProvider', '$locationProvider'];
    
    function config($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                controller : 'HomeController',
                templateUrl : '/views/datos.html'
        })
            .when('/user/:id', {
                controller : 'UserController',
                templateUrl : '/views/perfil.html'
        })
            .otherwise({
                redirectTo : '/'
        });
    }
})();