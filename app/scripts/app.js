'use strict';

/**
 * @ngdoc overview
 * @name pooIhmExemplesApp
 * @description
 * # pooIhmExemplesApp
 *
 * Main module of the application.
 */
angular
    .module('pooIhmExemplesApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/users' , {
                templateUrl: '../views/Users/list_user.html',
                controller: 'UsersCtrl'
            })
            .when('/users/:userId', {
                templateUrl: '../views/Users/show_user.html',
                controller: 'UsersCtrl'
            })
            .when('/projects', {
                templateUrl: '../views/Projects/list_project.html',
                controller: 'ProjectsCtrl'
            })
            .when('/projects/:projectId', {
                templateUrl: '../views/Projects/show_project.html',
                controller: 'ProjectsCtrl'
            })
            .when('/manageUser', {
                templateUrl: '../views/Users/interact_user.html',
                controller: 'UsersCtrl'
            })
            .when('/manageUser/:userId', {
                templateUrl: '../views/Users/interact_user.html',
                controller: 'UsersCtrl'
            })
            .when('/manageProject/', {
                templateUrl: '../views/Projects/interact_project.html',
                controller: 'ProjectsCtrl'
            })
            .when('/manageProject/:projectId', {
                templateUrl: '../views/Projects/interact_project.html',
                controller: 'ProjectsCtrl'
            })
            .when('/manageRole/user/:userId', {
                templateUrl: '../views/Roles/add_role.html',
                controller: 'RolesCtrl'
            })
            .when('/manageRole/project/:projectId', {
                templateUrl: '../views/Roles/add_role.html',
                controller: 'RolesCtrl'
            })
            .when('/manageRole/role/:roleId/project/:project', {
                templateUrl: '../views/Roles/update_role.html',
                controller: 'RolesCtrl'
            })
            .when('/manageRole/role/:roleId/user/:user', {
                templateUrl: '../views/Roles/update_role.html',
                controller: 'RolesCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
