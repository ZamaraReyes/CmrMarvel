(function(){
    'use strict';
    
    angular
        .module('APP')
        .factory('UsersHTTP', UsersHTTP);
    
    UsersHTTP.$inject = ['$http'];
    
    function UsersHTTP($http) {
        var service = {
            searchImage : searchImage,
            randId : randId,
            searchComic : searchComic
        }
        
        return service;
        
        
        function searchImage(palabra, inicio) {
            var inicio;
            var images = [];
            
            return $http.get('http://api.giphy.com/v1/gifs/search?q='+palabra+'&offset='+inicio+'&limit='+8+'&api_key=dc6zaTOxFJmzC').then(function(response){
                response.data.data.forEach(function (element){
                    images.push(element.images.original.url);
                    console.log(element.images.original.url);
                });
                return images;
            });
        }
        
        
        function randId() {
            return Math.random().toString(36).substr(2, 20);
        }
        
        function searchComic(palabrita, inicio) {
            var inicio;
            var comics = [];
            
            return $http.get('https://gateway.marvel.com:443/v1/public/comics?titleStartsWith='+palabrita+'&offset='+inicio+'&limit='+8+'&apikey=89cc3f9c808aee17771bcf68a0cdea91').then(function(response){
                response.data.data.results.forEach(function (element){
                    console.log(element.images);
                    var imagenes = element.images;
                    var img = '';
                    var imagen = {};
                    
                    if (imagenes.length > 0) {
                        var formato = "."+element.images[0].extension;
                        var url = element.images[0].path;
                        img += url+formato;
                        imagen.photo = img;
                        imagen.id = element.id;
                        /*imagen.id = randId();*/
                    }else if (element.images == 0){
                        img = 'http://placehold.it/100x150';
                        imagen.photo = img;
                        imagen.id = element.id;
                    }
                    console.log(response.data.data.results);
                    comics.push(img);
                });
                return comics;
            }, function(error) {
                console.log('Hubo algún error');
            });
        }
    }
})();