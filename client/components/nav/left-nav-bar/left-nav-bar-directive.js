;(function () {
    'use strict'

    var angular = window.angular

    angular
        .module('smartcity.app')
        .directive('leftNavBar', Directive)

    function Directive ($compile) {

        function link($element, $attrs) {
        }

        return {
            restrict: 'E',
            scope: {
            },
            replace: true,
            controller: 'leftNavBarCtrl',
            controllerAs: 'vm',
            templateUrl: function() {
                return 'components/nav/left-nav-bar/left-nav-bar.html'
            },
            link: link
        }

    }
})()
