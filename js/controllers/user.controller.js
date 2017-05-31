(function(){
    'use strict';
    
    angular
        .module('APP')
        .controller('UserController', UserController);
    
    UserController.$inject = ['$scope', 'UsersFactory', '$routeParams'];
    
    function UserController($scope, UsersFactory, $routeParams) {
        
        activate();
        
        function activate() {
            var userId = $routeParams.id;
            $scope.user = UsersFactory.getUser(userId);
        }
    }
})();