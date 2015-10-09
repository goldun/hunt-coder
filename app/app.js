'use strict';

/* App Module */
var huntCodderApp = angular.module('huntCoder', [
    'ngRoute',
    'huntCoder.employeeControllers',
    'huntCoder.employeeServices'
]);

huntCodderApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/employees', {
                templateUrl: 'employee/list.html',
                controller: 'EmployeeListCtrl'
            })
            .when('/employee/:employeeId', {
                templateUrl: 'employee/view.html',
                controller: 'EmployeeViewCtrl'
            })
            .otherwise({
                redirectTo: '/employees'}
        );
    }]);

huntCodderApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
}
]);
