(function(){
    'use strict';
    
    angular
        .module('APP')
        .controller('HomeController', HomeController);
    
    HomeController.$inject = ['$scope', 'UsersFactory', 'UsersHTTP', '$routeParams'];
    
    function HomeController($scope, UsersFactory, UsersHTTP, $routeParams) {
        $scope.users = [];
        $scope.newUser = {};
        $scope.images = [];
        $scope.imgFavorites = [];
        $scope.comics = [];
        $scope.comFavorites = [];
        
        $scope.verDatos = verDatos;
        $scope.verImages = verImages;
        $scope.verComics = verComics;
        $scope.updateUser = updateUser;
        $scope.createNewUser = createNewUser;
        $scope.editUser = editUser;
        $scope.removeUser = removeUser;
        $scope.searchImage = searchImage;
        $scope.searchComic = searchComic;
        $scope.verFlecha = verFlecha;
        $scope.favoritesImg = favoritesImg;
        $scope.favoritesCom = favoritesCom;
        $scope.verInfo = verInfo;
        $scope.removeGif = removeGif;
        $scope.removeComic = removeComic;
        
        
        var actualOffset = 0;
        
        activate();
        
        function activate() {
            $scope.users = UsersFactory.getAll();
        }
        
        function verDatos() {
            $scope.datos = false;
            $scope.galeriaimg = false;
            $scope.galeriacom = false;
        }
        
        function verImages() {
            $scope.datos = true;
            $scope.galeriaimg = true;
            $scope.galeriacom = false;
        }
        
        function verComics() {
            $scope.datos = true;
            $scope.galeriaimg = false;
            $scope.galeriacom = true;
        }
        
        function cleanNewUser() {
            $scope.newUser = {};
            var form = $scope.formulario;
            form.$setUntouched();
            form.$setPristine();
        }
        
        function createNewUser() {
            $scope.newUser.id = randId();
            $scope.users.push($scope.newUser);
            UsersFactory.update($scope.users);
            cleanNewUser();
        }
        
        function editUser(user) {
            $scope.newUser = angular.copy(user);
        }
        
        function updateUser(user) {
            $scope.users.forEach(function (element, position) {
                if (element.id == user.id) {
                    $scope.users[position] = user;
                }
            })
            UsersFactory.update($scope.users);
            cleanNewUser();
        }
        
        function removeUser(user) {
            var respuesta = confirm("¿Seguro que deseas eliminar el usuario "+user.name+"?");
            if (respuesta == true) {
                $scope.users.forEach(function (element, position){
                    if (element.id == user.id) {
                        $scope.users.splice(position, 1);
                    }
                })
            }
            UsersFactory.update($scope.users);
        }
        
        function randId() {
            return Math.random().toString(36).substr(2, 20);
        }
        
        
        $scope.izquierda = false;
        $scope.derecha = false;
        
        
        function searchImage(incremento) {
            var palabra = $scope.palabra;
            actualOffset = actualOffset + incremento;
            UsersHTTP.searchImage(palabra, actualOffset)
                .then(function (gifs){
                $scope.images = gifs; 
            })
            verFlecha();
        }
        
        function favoritesImg(image) {
            if (!$scope.newUser.imgFavorites){
                $scope.newUser.imgFavorites = [];
            }
            $scope.newUser.imgFavorites.push(image);
        }
        
        function searchComic(incremento) {
            var palabrita = $scope.palabrita;
            actualOffset = actualOffset + incremento;
            UsersHTTP.searchComic(palabrita, actualOffset)
                .then(function (serie){
                $scope.comics = serie; 
            })
            verFlecha();
        }
        
        function verFlecha() {
            if (actualOffset == 0){
                $scope.izquierda = false;
                $scope.derecha = true;   
            } else if (actualOffset > 0) {
                $scope.izquierda = true;
                $scope.derecha = true;
            }
        }
        
        function favoritesCom(comic) {
            if (!$scope.newUser.comFavorites){
                $scope.newUser.comFavorites = [];
            }
            $scope.newUser.comFavorites.push(comic);
            console.log($scope.newUser.comFavorites);
        }
        
        $scope.verInfo = false;

        function verInfo() {
            if ($scope.newUser.comFavorites.length > 0) {
                $scope.verInfo = true;
            }
        }
        
        function removeGif(gif) {
            var respuesta = confirm("¿Deseas eliminarlo?");
            if (respuesta == true) {
                var index = $scope.newUser.imgFavorites.indexOf(gif);
                $scope.newUser.imgFavorites.splice(index, 1);
            }
            UsersFactory.update($scope.imgFavorites);
        }
        
        function removeComic(comic) {
            var respuesta = confirm("¿Deseas eliminarlo?");
            if (respuesta == true) {
                var index = $scope.newUser.comFavorites.indexOf(comic);
                $scope.newUser.comFavorites.splice(index, 1);
            }
            UsersFactory.update($scope.comFavorites);
        }
    }
})();