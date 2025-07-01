var PounceApp = angular.module('PounceApp', ['ngRoute', 'ngAnimate']);

PounceApp.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/home', { //home page
            templateUrl: 'Views/home.html',
            controller: 'HomeController'
        })
        .when('/play', { //play page
            templateUrl: 'Views/play.html',
            controller: 'PounceController'
        })
        .otherwise({ //default to home page
            redirectTo: '/home'
        });

}])

//Controller for play page
PounceApp.controller('PounceController',['$scope', function($scope){
    $scope.players = []; //holds player info
    $scope.round = 1; //starts at round 1
    $scope.winner = null; //no winner to start
    $scope.previousRank = [];

    // Calculates scores based on submit
    $scope.addScore = function(){

        $scope.players.forEach(function(player){
            let pounce = parseInt(player.pouncePile) || 0;
            const cards = parseInt(player.cardsOut) || 0;
            const total = parseInt(player.total);

            //if given manual score
            if (player.manualToggle && !isNaN(total)) {
                player.score += total;
            }
            else{ //if calculating automatically
                if (pounce > 13){
                    pounce = 13;
                }
            
                player.score += cards - (pounce *2);
            }

            player.pouncePile = null;
            player.cardsOut = null;
        });

        $scope.Commentary();

        // Iterates round
        $scope.round++;

        //Checks for winner and draws
        const allPlayers = $scope.players.filter(p => p.score >= 100);
        if (allPlayers.length > 0){
            let maxScore = Math.max(...allPlayers.map(p => p.score));
            let topPlayers = allPlayers.filter(p => p.score === maxScore);

            if (topPlayers.length === 1) {
                $scope.winner = topPlayers[0].name + " wins the game!";
            } 
            else {
                const names = topPlayers.map(p => p.name).join(" & ");
                $scope.winner = "It's a tie between " + names + "!";
            }
        } else{
            $scope.winner = null; 
        }
        
    };

    //Removes player from list
    $scope.removePlayer = function(player){
        var removedPlayer = $scope.players.indexOf(player);
        $scope.players.splice(removedPlayer, 1);

        //if all players are removed the game will start over
        if($scope.players.length == 0){
            $scope.reset();
        }
    };

    function getRandomNumber(num){
        return Math.floor(Math.random() * num) + 1;
    }

    //Adds player, sets automatic score calculation as default, assigns random horse to player
    $scope.addPlayer = function(){
        const newName = $scope.newplayer?.trim();
        if (!newName) return;

        
        // Check for duplicate names
        const nameExists = $scope.players.some(p => p.name.toLowerCase() === newName.toLowerCase());
        if (nameExists) {
            alert("That name is already taken! Please choose a unique name.");
            return;
        }

        var randomHorse = getRandomNumber(23);
       $scope.players.push({
            name: $scope.newplayer,
            score: 0,
            dialogue: '',
            manualToggle: false,
            message: "I'll do the math",
            horse: 'horses/horse' + randomHorse + '.png'
       });

       $scope.previousRank.push({name: $scope.newplayer, score: 0});
       
       // Resorts previous rank for each player added since each player added will automatically have a score of 0 but there is a chance that if added midway 
       // through a game other players will have a negative score and thus rank below the new player. Only resorts beginning in round 2 since everyone has score of 0
       // in round 1.
       if($scope.round > 1){
           for (let i = 0; i < $scope.previousRank.length - 1; i++) {
                if ($scope.previousRank[i].score < $scope.previousRank[i + 1].score) {
                    let temp = $scope.previousRank[i];
                    $scope.previousRank[i] = $scope.previousRank[i + 1];
                    $scope.previousRank[i + 1] = temp;
                }
            }
       }
       
       $scope.newplayer = "";
    };

    //Resets game to beginning with no players
    $scope.reset = function(){
        $scope.players = [];
        $scope.round = 1;
        $scope.winner = null;
        $scope.inEditMode = null;
        $scope.rounds = []; //keeps track of previous rounds
        $scope.currentRound = 1; //starts with first round
        $scope.currentRoundIndex = 0; //index begins with 0
        $scope.inEditMode = false; //default as not editing
        $scope.previousRank = [];
    };

    //Toggles button and inputs to give option to either calculate score manually or automatically
    $scope.switch = function(player){
        player.manualToggle = !player.manualToggle;
        player.message = player.manualToggle ? "Calculate for me" : "I'll do the math";

    };

    //Used to expand lanes based on number of players. Starts with two lanes already there.
    $scope.getLaneArray = function() {
        const minLanes = 2;
        return new Array(Math.max($scope.players.length, minLanes));
    };

    $scope.rounds = []; //keeps track of previous rounds
    $scope.currentRound = 1; //starts with first round
    $scope.currentRoundIndex = 0; //index begins with 0
    $scope.inEditMode = false; //default as not editing
    $scope.unsavedRoundPlayers = null;

    $scope.takesLeadComments = [" takes the lead!", " charges ahead!", " passes the rest!"," leaves them all in the dust!"," conquers all!"," puts the petal to the metal!"," jumps into the lead!",
        " flexes on the competition!", " yells 'catch me if you can!'"," is speed - I AM SPEED.", " kicks it into high gear!"];
    $scope.steadyComments =[" is taking it easy."," holds steady."," is taking it one step at a time."," knows that slow and steady wins the race.", " is just here for the vibes."," is waiting for the perfect opportunity to strike.", " thinks this is a scenic route."];
    $scope.leadComments = [" is undefeatable!"," stays ahead of the rest!"," can't be beaten!"," is on top of the world!"," can taste victory!"," might lap the others soon!"," is writing their victory song!"," is writing their victory speech!"," owns the road!",
        " has achieved main character status!", " is cooler than school!", " has an undeniable aura!"];
    $scope.tieComments = [" are in a tie!", " are neck and neck!", " aren't leaving room for Jesus!"," are battling it out!", " are saying hi to one another.", " are twinning.", " just fist bumped.", " are playing patty cake."," are locked in an eternal struggle.",
        " are perfectly balanced, as all things should be.", " just became besties!"];
    $scope.negativeComments = ["'s horse saw a nice patch of grass it couldn't pass up."," got distracted by a butterfly"," thinks we're playing golf", " got turned around somehow.", 
        " confused their lefts and rights.", " tripped and fell backwards.", " is racing to -100.", " is taking one step forward, 17 steps back.", " :("," got lost in the woods.", " lost the plot.",
        "'s horse is having an existential crisis.", "'s horse never wanted to race... IT JUST WANTS TO DANCE!", "'s horse is unionizing.", " forgot they were racing.", " is giving everyone else a head start.",
        " paused to update their status.", " got turned around texting while riding.", " was last seen ordering DoorDash.", " is moonwalking across the track.", " is taking the scenic route."];
    $scope.passingComments = [" passes ", " leaps ahead of ", " runs past ", " puts to shame ", " rocket-jumps over ", " activates cheat codes against ", " leaves emotional damage on "];
    $scope.fallsBehindComments = [" falls behind.", " is running out of fuel.", " can only run so fast.", " tactically slows down.", " slows down cause they feel bad.", " stops to tie their shoes.", " ran out of plot armor.", " gets hit by a red shell.",
        " slips on a banana peel."];

    
    $scope.Commentary = function () {
    $scope.currentRank = $scope.players.map(player => ({
        name: player.name,
        score: player.score
    }));

    // Sort descending by score
    $scope.currentRank.sort((a, b) => b.score - a.score);

    $scope.currentRank.forEach((playerRank, i) => {
        const currentName = playerRank.name;
        const currentScore = playerRank.score;
        const previousIndex = $scope.previousRank.findIndex(p => p.name === currentName);
        const prevName = $scope.previousRank[previousIndex]?.name;
        const prevScore = $scope.previousRank[previousIndex]?.score;

        const playerObj = $scope.players.find(p => p.name === currentName);
        let commentary = '';

        // Handle negative score entry
        if (playerObj.total < 0) {
            commentary = currentName + $scope.negativeComments[getRandomNumber($scope.negativeComments.length-1)];
        } 
        else {
            // Tie detection
            let tieGroup = [currentName];

            let up = i - 1;
            while (up >= 0 && $scope.currentRank[up].score === currentScore) {
                tieGroup.unshift($scope.currentRank[up].name);
                up--;
            }

            let down = i + 1;
            while (down < $scope.currentRank.length && $scope.currentRank[down].score === currentScore) {
                tieGroup.push($scope.currentRank[down].name);
                down++;
            }

            if (tieGroup.length > 1) {
                const tieNames = tieGroup.join(" & ");
                commentary = tieNames + $scope.tieComments[getRandomNumber($scope.tieComments.length-1)];
            }
            else if (i === 0 && previousIndex !== 0) {
                // TAKES the lead!
                commentary = currentName + $scope.takesLeadComments[getRandomNumber($scope.takesLeadComments.length-1)];
            }
            else if (i === 0 && currentName === $scope.previousRank[0]?.name) {
                // Maintains 1st
                commentary = currentName + $scope.leadComments[getRandomNumber($scope.leadComments.length-1)];
            }
            else if (previousIndex > -1 && previousIndex > i) {
                // Player moved UP (passed others)
                const passedPlayers = [];
                for (let k = i + 1; k <= previousIndex; k++) {
                    passedPlayers.push($scope.currentRank[k].name);
                }
                const passedNames = passedPlayers.join(" & ");
                commentary = currentName + $scope.passingComments[getRandomNumber($scope.passingComments.length-1)] + passedNames;
            }
            else if (previousIndex > -1 && previousIndex < i) {
                // Player moved DOWN
                commentary = currentName + $scope.fallsBehindComments[getRandomNumber($scope.fallsBehindComments.length-1)];
            }
            else if (currentName === $scope.previousRank[previousIndex]?.name) {
                // Player didn’t move
                commentary = currentName + $scope.steadyComments[getRandomNumber($scope.steadyComments.length-1)];
            }
            else {
                // Fallback (shouldn't usually happen)
                commentary = currentName + $scope.steadyComments[getRandomNumber($scope.steadyComments.length-1)];
            }
                    }

            // Assign commentary to the actual player
            if (playerObj) {
                    playerObj.dialogue = commentary;
                    playerObj.total = null;
                }
        });

            // Update previous rank
            $scope.previousRank = angular.copy($scope.currentRank);
    };

    

    $scope.startNewRound = function() {
        // Save the scores just entered into the rounds array
        $scope.rounds[$scope.currentRound - 1] = angular.copy($scope.players);

        // Prepare blank inputs for next round
        $scope.unsavedRoundPlayers = $scope.players.map(player => ({
            name: player.name,
            score: player.score,
            manualToggle: player.manualToggle,
            message: player.message,
            horse: player.horse
        }));

        /*
        $scope.players.forEach(player => {
            player.pouncePile = null;
            player.cardsOut = null;
            player.total = null;
        });
*/     
        $scope.currentRound++;
        $scope.inEditMode = false;
        $scope.currentRoundIndex = $scope.rounds.length;

    };

    $scope.loadRound = function(index){
        // Save in-progress state before editing
        $scope.unsavedRoundPlayers = angular.copy($scope.players);

        // Load the previous round for editing
        $scope.players = angular.copy($scope.rounds[index]);
        $scope.inEditMode = true;
        $scope.currentRoundIndex = index;
    };

    $scope.getOrdinal = function(n) {
        const s = ["th", "st", "nd", "rd"],
            v = n % 100;
        return (s[(v - 20) % 10] || s[v] || s[0]);
    };

    


    /*
    $scope.saveEditedRound = function() {
        const editedRound = $scope.players; // the updated version of the past round
        const originalRound = $scope.rounds[$scope.currentRoundIndex]; // original scores for the round
        const currentRound = $scope.rounds[$scope.rounds.length - 1]; // latest round
   
        if (!currentRound || !originalRound || editedRound.length !== originalRound.length) {
            console.error("Mismatch in round data");
            return;
        }

        // Apply score differences to current round
        for (let i = 0; i < editedRound.length; i++) {
            const scoreDiff = editedRound[i].score - originalRound[i].score;
            currentRound[i].score += scoreDiff;
        }

        // Update the saved version of the edited round
        $scope.rounds[$scope.currentRoundIndex] = angular.copy(editedRound);

        // Return to current round view
        $scope.players = angular.copy($scope.unsavedRoundPlayers);
        $scope.inEditMode = false;
        $scope.currentRoundIndex = null;
    };*/

}])

//Controller for home page
PounceApp.controller('HomeController', ['$scope', '$timeout', function($scope, $timeout){
    $scope.popIn = false;

    // Trigger the pop animation after all letters have appeared
    $timeout(function(){
        $scope.popIn = true;
    }, 7 * 200 + 400); // 7 letters * 0.2s delay + a buffer
}]);