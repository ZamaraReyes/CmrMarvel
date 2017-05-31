(function(){
    'use strict';
    
    angular
        .module('APP')
        .factory('UsersFactory', UsersFactory);
    
    UsersFactory.$inject = [];
    
        function UsersFactory() {
            var service = {
                getAll : getAll,
                getUser : getUser,
                update : update
            }
            
            return service;
            
            function getAll() {
                if (localStorage.getItem("users")) {
                    var usersSaved = localStorage.getItem("users");
                    var realUsers = JSON.parse(usersSaved);
                    
                    if (typeof realUsers == "object" && realUsers instanceof Array)
                        return realUsers;
                    else {
                        realUsers = [];
                        localStorage.setItem("users", JSON.stringify(realUsers));
                        return realUsers;
                    }
                } else {
                    return [];
                }
            }
            
            
            function getUser(id) {
                var users = getAll();
                
                
                var userResult = {};
                
                users.forEach(function (user){
                    if (user.id == id ) userResult = user;
                })
                return userResult;
                
                //return users.filter( function (user ){ user.id == id})[0];
            }
            
            
            function update(users) {
                var newUsers = JSON.stringify(users);
                localStorage.setItem("users", newUsers);
                /*var imgFavorites = JSON.parse(gif);
                localStorage.setItem("gif", imgFavorites);*/
            }
        }
})();