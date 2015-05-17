'use strict';

/**
 * @ngdoc function
 * @name ProjectsCtrl
 * Controller of the Projects
 */
angular.module('pooIhmExemplesApp')
    .controller('ProjectsCtrl', ['$scope', '$http', '$routeParams', '$location', function ($scope, $http, $routeParams, $location) {
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

        if($routeParams.projectId) {
            $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + $routeParams.projectId)
                .success(function(data) {
                    if (data.status == "success") {
                        $scope.currentProject = data.data;
                    }
                });
            $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + $routeParams.projectId + "/Roles")
                .success(function(data) {
                    if (data.status == "success") {
                        $scope.roles = data.data;
                    }
                });

            $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + $routeParams.projectId + '/Users')
                .success(function(data) {
                    if (data.status == "success") {
                        $scope.users = data.data;
                    }
                });
        }

        $scope.deleteProject = function(id){
            $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + id)
                .success(function(data) {
                    if (data.status == "success") {
                        $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects')
                            .success(function(data) {
                                if (data.status == "success") {
                                    $scope.projects = data.data;
                                    $location.path("/projects/");
                                }
                            });
                    }
                });
        }

        $scope.deleteUserInProject = function(projectId, userId){
            $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/'+ projectId + '/Users/' + userId)
                .success(function(data) {
                    if (data.status == "success") {
                        $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + $routeParams.projectId + '/Users')
                            .success(function(data) {
                                if (data.status == "success") {
                                    $scope.users = data.data;
                                }
                            });
                    }
                });
        }

        $scope.modify = function(project){

            if($routeParams.projectId) {
                this.updateProject(project);
            } else {
                this.createProject(project);
            }
        }

        $scope.createProject = function(project){
            $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/', project)
                .success(function(res) {
                    if (res.status == "success") {
                        $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects')
                            .success(function (data) {
                                if (data.status == "success") {
                                    $scope.projects = data.data;
                                    $location.path("/projects/" + res.data.id);
                                }
                            });
                    }
                });
        }

        $scope.updateProject = function(project){
            $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + project.id, project)
                .success(function(data) {
                    if (data.status == "success") {
                        $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects')
                            .success(function (data) {
                                $scope.projects = data.data;
                                $location.path("/projects/" + project.id);
                            });
                    }
                });
        }

        $scope.goBack = function(){
            if ($routeParams.projectId) {
                $location.path("/projects/" + $routeParams.projectId);
            } else {
                $location.path("/projects/");
            }
        }
    }]);
