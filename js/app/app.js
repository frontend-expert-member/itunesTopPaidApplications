var app = angular.module('iListApp', [])
/* Loadash */
.constant('_', window._)
.run(function ($rootScope) {
    $rootScope._ = window._;
});
/* /Loadash */