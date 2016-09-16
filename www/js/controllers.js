/* global angular, document, window */
'use strict';

var URL_SERVER = 'http://pdu-francuchin.c9users.io';

angular.module('starter.controllers', ['ngCordova'])

.constant('$ionicLoadingConfig', {
    template: '<ion-spinner icon="crescent" class="spinner-royal">'
})

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})

.controller('FriendsCtrl', function($scope, $stateParams, $http, $location, $timeout, $ionicLoading, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');
    $scope.Categorias = null;
    $scope.Titulo = "Lugares Cercanos";
    $scope.cargar = function() {
        $scope.Categorias = null;
        $ionicLoading.show();
        $http.get(URL_SERVER + '/lugar/listasCategoriasParaApp/true').success(
            function(data, status) {
                $scope.Categorias = data;
                $ionicLoading.hide();
                // Delay expansion
                $timeout(function() {
                    $scope.isExpanded = false;
                    $scope.$parent.setExpanded(false);
                    // Set Motion
                    ionicMaterialMotion.fadeSlideInRight();
                    // Set Ink
                    ionicMaterialInk.displayEffect();
                }, 300);

            }).error(
            function(data, error) {
                console.log('error', data, error);
                $ionicLoading.hide();
                $location.path('/app/error');
            });
    }
    $scope.cargar();
})

.controller('CategoriaCtrl', function($scope, $stateParams, $http, $location, $timeout, $ionicLoading, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');
    $scope.Categorias = null;
    $scope.Titulo = "Categoria";
    $scope.cargar = function() {
        $scope.Categorias = null;
        $ionicLoading.show();
        $http.get(URL_SERVER + '/lugar/listarLugaresxCategorias/' + $stateParams.id).success(
            function(data, status) {
                $scope.Categorias = {};
                $scope.Titulo = data.nombre;
                $scope.Categorias[0] = data;
                $ionicLoading.hide();
                // Delay expansion
                $timeout(function() {
                    $scope.isExpanded = false;
                    $scope.$parent.setExpanded(false);
                    // Set Motion
                    ionicMaterialMotion.fadeSlideInRight();
                    // Set Ink
                    ionicMaterialInk.displayEffect();
                }, 300);

            }).error(
            function(data, error) {
                console.log('error', data, error);
                $ionicLoading.hide();
                $location.path('/app/error');
            });
    }
    $scope.cargar();
})


.controller('ProfileCtrl', function($scope, $stateParams,$location, $timeout, $http, $ionicLoading, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    $scope.Lugar = null;
    $scope.URL_SERVER = URL_SERVER;
    $scope.Portada = "img/fondoraro.jpg";
    $scope.Imagen = "img/icon.png";
    $scope.verImagen = true;
    $scope.cargar = function() {
        $scope.Lugar = null;
        $ionicLoading.show();
        $http.get(URL_SERVER + '/lugar/getLugar/' + $stateParams.id)
            .success(function(data, status) {
                $scope.Lugar = data;
                $ionicLoading.hide();
                // Set Motion
                $scope.Portada = URL_SERVER + data.imagen;
                $scope.Imagen = URL_SERVER + data.imagen2;
                if ((data.imagen === data.imagen2) || data.imagen == null) {
                    $scope.verImagen = false;
                }
                $timeout(function() {
                    ionicMaterialMotion.slideUp({
                        selector: '.slide-up'
                    });
                }, 300);
                $timeout(function() {
                    ionicMaterialMotion.fadeSlideInRight({
                        startVelocity: 3000
                    });
                    // Set Ink
                    ionicMaterialInk.displayEffect();
                }, 700);
            })

        .error(
            function(data, error) {
                console.log('error', data, error);
                $ionicLoading.hide();
                $location.path('/app/error');
            });
    }
    $scope.cargar();
})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('GalleryCtrl', function($scope, $stateParams,$location, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicLoading, $http) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);
    $scope.Imagenes = null;
    $scope.URL_SERVER = URL_SERVER;
    $scope.cargar = function() {
        $scope.Categorias = null;
        $ionicLoading.show();
        $http.get(URL_SERVER + '/lugar/getImagenesArray/' + $stateParams.id).success(
            function(data, status) {
                console.log(data);
                $scope.Imagenes = data;
                $ionicLoading.hide();

                ionicMaterialInk.displayEffect();

                ionicMaterialMotion.pushDown({
                    selector: '.push-down'
                });
                ionicMaterialMotion.fadeSlideInRight({
                    selector: '.animate-fade-slide-in .item'
                });

            }).error(
            function(data, error) {
                console.log('error', data, error);
                $ionicLoading.hide();
                $location.path('/app/error');
            });
    }
    $scope.cargar();
})

.controller('CamaraCtrl', function($scope, $ionicLoading, $http, $location, $cordovaCamera) {
    $scope.buscar = function(imageData) {
        navigator.geolocation.getCurrentPosition(function(position) {
            $http({
                url: URL_SERVER + '/lugar/listasResultadoBusquedaParaAppUbicado',
                method: 'POST',
                data: {
                    'imagen': 'data:image/jpeg;base64,' + imageData,
                    'latitud': position.coords.latitude,
                    'longitud': position.coords.longitude
                }
            }).then(
                function(response) {
                    if (response.data.resultado.id_lugar == 0) {
                        $ionicLoading.hide();
                        alert('No se encontraron coincidencias');
                    } else {
                        $ionicLoading.hide();
                        if (response.data.resultado.es_categoria == 1) {
                            $location.path('app/categoria/' + response.data.resultado.id_lugar);
                        } else {
                            $location.path('app/profile/' + response.data.resultado.id_lugar);
                        }
                    }
                },
                function(response) {
                    $ionicLoading.hide();
                    alert('No se encuentran coincidencias cerca');
                });
        });
    }
    $scope.takePicture = function() {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 512,
            targetHeight: 512,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
                $ionicLoading.show();
                $scope.buscar(imageData);
            },
            function(err) {
                $ionicLoading.hide();
            });
    }
})

;