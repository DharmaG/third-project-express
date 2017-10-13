
    angular.module('MyApp', ['timer']);
    function MyAppController($scope) {
        $scope.timerRunning = true;

        $scope.startTimer = function (){
            $scope.$broadcast('timer-start');
            $scope.timerRunning = true;
        };

        $scope.stopTimer = function (){
            $scope.$broadcast('timer-stop');
            $scope.timerRunning = false;
        };
    }
    MyAppController.$inject = ['$scope'];
