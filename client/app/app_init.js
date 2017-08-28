;(function (angular, $, _) {
    'use strict'

    var injector = angular.injector(['ng', 'LocalStorageModule'])
    var $http = injector.get('$http')

    var localStorage = injector.get('localStorageService')

    // do
    var settings = {
        url:'http://10.135.43.104:8206/',
        tokenName:'smartcity',
        website : {terms:'',policy:''},
        socketUrl:"http://10.135.3.131",
        socketPort:"8217",
        vatandasUserName:'karsVatandas',
        videoWallUserName:'karsVideowall',
        kioskUserName:'karsKiosk',
        domainRef:'1baf094a-a388-4ad4-905c-03fecc7216a0'
    }

    //prod
    // var settings = {
    //     url:'http://api-inn.sehirlerakillaniyor.com/',
    //     tokenName:'smartcity',
    //     website : {terms:'',policy:''},
    //     socketUrl:"http://socket-inn.sehirlerakillaniyor.com",
    //     socketPort:"80",
    //     vatandasUserName:'karsVatandas',
    //     videoWallUserName:'karsVideowall',
    //     kioskUserName:'karsKiosk',
    //     domainRef:'1baf094a-a388-4ad4-905c-03fecc7216a0'
    // }

    settings.user = localStorage.get(settings.tokenName+"-user")
    settings.selectedDomain = localStorage.get(settings.tokenName+"-domainId")

    function bootstrap () {
        angular.module('scaffold.settings', []).constant('Settings', settings)
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['scaffold.app'])
        })
        stringHelper()
    }

    function stringHelper(){

        if (!String.prototype.format) {
            String.prototype.format = function() {
                var args = arguments;
                return this.replace(/{(\d+)}/g, function(match, number) {
                    return typeof args[number] !== 'undefined' ? args[number] : match
                });
            };
        }

        String.prototype.replaceAll = function( token, newToken, ignoreCase ) {
            var _token;
            var str = this + "";
            var i = -1;

            if ( typeof token === "string" ) {

                if ( ignoreCase ) {

                    _token = token.toLowerCase();

                    while( (
                        i = str.toLowerCase().indexOf(
                            _token, i >= 0 ? i + newToken.length : 0
                        ) ) !== -1
                        ) {
                        str = str.substring( 0, i ) +
                            newToken +
                            str.substring( i + token.length )
                    }

                } else {
                    return this.split( token ).join( newToken )
                }

            }
            return str;
        };

    }


    bootstrap()

})(window.angular, window.$, window._)