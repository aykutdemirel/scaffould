;(function () {
    'use strict'

    var angular = window.angular
    var _ = window._
    var $ = window.$

    angular.module('scaffold.app', [
        'scaffold.settings',
        'ngResource',
        'ngSanitize',
        'ngAnimate',
        'ui.router',
        'ui.bootstrap',
        'ui.select',
        'ui.utils',
        'ui.ace',
        'restangular',
        'angular-loading-bar',
        'angularMoment',
        'angular-growl',
        'LocalStorageModule',
        'base64'
    ])
        .config(Config)
        .run(Run)

    function Config ($locationProvider, $urlRouterProvider, cfpLoadingBarProvider, growlProvider, RestangularProvider, localStorageServiceProvider) {

        $urlRouterProvider.otherwise('/dashboard')
        $locationProvider.html5Mode(true)

        // Configuring Loading Bar
        cfpLoadingBarProvider.includeSpinner = false

        // Configuring Notifications
        growlProvider.globalTimeToLive(5000)
        growlProvider.globalPosition('bottom-left')
        growlProvider.globalDisableCountDown(true)

        //Rest framework content type
        RestangularProvider.setDefaultHeaders({'Content-Type': 'application/json'});

        // localstorage type
        localStorageServiceProvider.setStorageType('localStorage');

    }

    function Run ($rootScope, $location, Settings, $log, localStorageService, Notificator) {


        if(!localStorageService.isSupported) {
            Notificator.clientStorage.error("Your browser doesn't support local storage, please update your browser")
        }

        $rootScope.$on('$stateChangeStart', function (event, next) {

            // // dynamic title setting
            document.title = "Left time over - " + $location.path().replaceAll("/"," - ")

            if (next.authenticate && !Settings.user) {
                $location.path('http://admin.scaffolding-project.com')
            }

        })
        // Redirecting to login if route requires auth and user is not logged in

    }
})()