var app = angular.module("scoreboard", []);

app.controller("scoreboardController", ['$scope', function($scope) {

    $scope.players = [
        { id: 1, name: "Justin" },
        { id: 2, name: "Liam" },
        { id: 3, name: "Steve (CEO)" },
        { id: 4, name: "Dan" },
        { id: 5, name: "Lee" },
        { id: 6, name: "Gavin" },
        { id: 7, name: "Tracey" },
        { id: 8, name: "David" },
        { id: 9, name: "Sam" },
        { id: 10, name: "Chris" },
        { id: 11, name: "Joe" },
        { id: 12, name: "Emma" }
    ];

    $scope.results = [
        { id: 1, player_1: "Justin", score_1: 11, player_2: "Steve (CEO)", score_2: 6},
        { id: 2, player_1: "Steve (CEO)", score_1: 13, player_2: "Dan", score_2: 11},
        { id: 3, player_1: "Liam", score_1: 6, player_2: "Lee", score_2: 11},
        { id: 4, player_1: "Liam", score_1: 11, player_2: "Steve (CEO)", score_2: 9},
        { id: 5, player_1: "Justin", score_1: 14, player_2: "Lee", score_2: 12},
        { id: 6, player_1: "Justin", score_1: 10, player_2: "Dan", score_2: 12},
        { id: 7, player_1: "Dan", score_1: 11, player_2: "Lee", score_2: 9},
        { id: 8, player_1: "Justin", score_1: 11, player_2: "Liam", score_2: 3},
        { id: 9, player_1: "Tracey", score_1: 11, player_2: "Emma", score_2: 8},
        { id: 10, player_1: "Emma", score_1: 11, player_2: "Dan", score_2: 9}
    ];

    $scope.league = [];

    $scope.result = {};
    $scope.player = {};

    $scope.addResult = function(result) {
        if (result.player_1 && result.player_2 && result.score_1 && result.score_2) {
            if (result.score_1 >= 0 && result.score_2 >=0 && ( result.score_1 >= 11 || result.score_2 >=11 ) && ( Math.abs(result.score_1 - result.score_2) >= 2) ) {
                result.id = $scope.results.length + 1;
                $scope.results.push(result);
                buildLeague();
            } else {
                console.log("Validation error!");
            }
        } else {
            console.log("All fields are required!");
        }
        $scope.result = {};
    }

    $scope.addPlayer = function(player) {
        if (player.name) {
            player.id = $scope.players.length + 1;
            $scope.players.push(player);
            $scope.player = {};
            buildLeague();
        } else {
            console.log("All fields are required!")
        }
    }

    function buildLeague() {
        $scope.league = $scope.players;
        for (var index=0; index < $scope.league.length; index++) {
            if ( $scope.league[index].name.includes('CEO') ) {
                $scope.league[index].point = -1;
            } else {
                $scope.league[index].point = 0;
            }
        }
        for (var i=0; i < $scope.results.length; i++) {
            var winnerName = $scope.results[i].score_1 > $scope.results[i].score_2 ? $scope.results[i].player_1 : $scope.results[i].player_2;
            if ( !winnerName.includes("CEO") ) {
                for (var j=0; j < $scope.league.length; j++) {
                    if ($scope.league[j].name == winnerName) {
                        $scope.league[j].point += 2;
                        
                    }
                }
            }
        }
        $scope.league.sort(function (a, b) {
            return b.point - a.point;
        });

    }
    buildLeague();
}]);