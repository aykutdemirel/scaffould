'use strict';

angular.module('smartcity.app')
    .filter('to_trusted', function ($sce) {
        return function(text) {
            return $sce.trustAsHtml(text);
        }
    });
