'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$http', '$scope',function ($http, $scope) {
        /** Load proto file*/
        var builder = dcodeIO.ProtoBuf.loadProtoFile('./addressbook.proto');
        var addressBook = builder.build('AddressBook');

        $http.get("./test.txt", {responseType: "arraybuffer"}).success(function(data){
            var decoded = addressBook.decode(data);
            $scope.persons = new addressBook(decoded).person;
            /*console.log("persons: " + $scope.persons);
            $scope.phones = $scope.persons.phone;
            console.log($scope.persons.email);
            console.log($scope.persons.name);
            console.log($scope.phones[0].number);
            console.log($scope.phones[0].type);*/
        });
    }]);