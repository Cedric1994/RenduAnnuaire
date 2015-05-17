'use strict';

/**
 * @ngdoc function
 * @name pooIhmExemplesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the pooIhmExemplesApp
 */
angular.module('pooIhmExemplesApp')
    .controller('UsersCtrl', ['$scope', '$http', '$routeParams', '$location', function ($scope, $http, $routeParams, $location) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users')
            .success(function(data) {
                $scope.users = data.data;
            });

        if($routeParams.userId) {
            $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId)
                .success(function(data) {
                    if (data.status == "success") {
                        $scope.currentUser = data.data;
                    }
                });

            $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId + '/Roles')
                .success(function(data) {
                    if (data.status == "success") {
                        $scope.roles = data.data;
                    }
                });

            $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId + '/Projects')
                .success(function(data) {
                    if (data.status == "success") {
                        $scope.projects = data.data;
                    }
                });
        }

        $scope.deleteUser = function(id){
            $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + id)
                .success(function(data) {
                    if (data.status == "success") {
                        $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users')
                            .success(function (data) {
                                if (data.status == "success") {
                                    $scope.users = data.data;
                                    $location.path("/users");
                                }
                            });
                    }
                });
        }

        $scope.modify = function(user){
            if($routeParams.userId) {
                this.updateUser(user);
            } else {
                this.createUser(user);
            }
        }

        $scope.createUser = function(user){
            $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Users/', user)
                .success(function(res) {
                    if (res.status == "success") {
                        $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users')
                            .success(function (data) {
                                if (data.status == "success") {
                                    $scope.users = data.data;
                                    $location.path("/users/" + res.data.id);
                                }
                            });
                    }
                });
        }

        $scope.updateUser = function(user) {
            $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + user.id, user)
                .success(function (data) {
                    if (data.status == "success") {
                        $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users')
                            .success(function (data) {
                                if (data.status == "success") {
                                    $scope.users = data.data;
                                    $location.path("/users/" + user.id);
                                }
                            });
                    }
                });
        }

        $scope.removeProjectToUser = function(userId, projectId){
            $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + userId + '/Projects/'+ projectId)
                .success(function(data) {
                    if (data.status == "success") {
                        $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId + '/Projects')
                            .success(function(data) {
                                if (data.status == "success") {
                                    $scope.projects = data.data;
                                }
                            });
                    }
                });
        }

        $scope.goBack = function(){
            if ($routeParams.userId) {
                $location.path("/users/" + $routeParams.userId);
            } else {
                $location.path("/users/");
            }
        }
    }]);
