'use strict';

/**
 * @ngdoc function
 * @name pooIhmExemplesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the pooIhmExemplesApp
 */
angular.module('pooIhmExemplesApp')
    .controller('RolesCtrl', ['$scope', '$http', '$routeParams', '$location', function ($scope, $http, $routeParams, $location) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects')
            .success(function(data) {
                if (data.status == "success") {
                    $scope.projects = data.data;
                }
            });

        $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users')
            .success(function(data) {
                if (data.status == "success") {
                    $scope.users = data.data;
                    $scope.role = {};
                }
            });


        if($routeParams.userId) {
            $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId)
                .success(function(data) {
                    if (data.status == "success") {
                        $scope.currentUser = data.data;
                    }
                });
        } else if($routeParams.projectId) {
            $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + $routeParams.projectId)
                .success(function(data) {
                    if (data.status == "success") {
                        $scope.currentProject = data.data;
                    }
                });
        } else if($routeParams.roleId){
            $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Roles/' + $routeParams.roleId)
                .success(function(data) {
                    if (data.status == "success") {
                        $scope.currentRole = data.data;
                    }
                });
        }

        $scope.createRole = function(role, currentUser, currentProject){
            if(currentUser && currentProject){
                role.UserId = currentUser.id;
                role.ProjectId = currentProject.id;
                $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Roles', role)
                    .success(function(data) {
                        if (data.status == "success") {
                            if($routeParams.userId) {
                                $location.path("/users/" + currentUser.id);
                            } else {
                                $location.path("/projects/" + currentProject.id);
                            }
                        }
                    });
            }
        }

        $scope.updateRole = function(role){
            $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Roles/' + role.id, role)
                .success(function(data) {
                    if (data.status == "success") {
                        if($routeParams.user) {
                            $location.path("/users/" + $routeParams.user);
                        } else if($routeParams.project){
                            $location.path("/projects/" + $routeParams.project);
                        }
                    }
                });
        }

        $scope.goBack = function() {
            if ($routeParams.userId) {
                $location.path("/users/" + $routeParams.userId);
            } else if ($routeParams.projectId) {
                $location.path("/projects/" + $routeParams.projectId);
            } else if($routeParams.user) {
                $location.path("/users/" + $routeParams.user);
            } else if($routeParams.project){
                $location.path("/projects/" + $routeParams.project);
            }
        }

    }]);