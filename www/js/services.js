var URL_SERVER = 'http://pdu-francuchin.c9users.io';
angular.module('starter.services', [])

.constant('$ionicLoadingConfig', {
    template: '<ion-spinner icon="crescent" class="spinner-royal">'
})

.factory('Categorias', function($http, $ionicLoading, $location) {
    return {
        all: function() {
            $ionicLoading.show();
            return $http.get(URL_SERVER + '/lugar/listasCategoriasParaApp/true').error(function() {
                $ionicLoading.hide();
                $location.path('tab/error404');
            });
        },
        getCategoria: function(id) {
            $ionicLoading.show();
            return $http.get(URL_SERVER + '/lugar/listarLugaresxCategorias/' + id).error(function() {
                $ionicLoading.hide();
                $location.path('tab/error404');
            });
        }
    }
})

.factory('Lugares', function($http, $ionicLoading, $location) {
    return {
        getLugar: function(id) {
            $ionicLoading.show();
            return $http.get(URL_SERVER + '/lugar/getLugar/' + id).error(function() {
                $ionicLoading.hide();
                $location.path('tab/error404');
            });
        },
        getGaleriaLugar: function(id) {
            $ionicLoading.show();
            return $http.get(URL_SERVER + '/lugar/getImagenes/' + id).error(function() {
                $ionicLoading.hide();
                $location.path('tab/error404');
            });
        },
        getComentariosLugar: function(id) {
            $ionicLoading.show();
            return $http.get(URL_SERVER + '/lugar/obtenerComentariosConImagen/' + id).error(function() {
                $ionicLoading.hide();
                $location.path('tab/error404');
            });
        }
    }
});