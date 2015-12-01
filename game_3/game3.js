
$(document).ready(function(){
		console.log("the document is ready!");
}); 

var canvas_width = 300;
var canvas_height = 480;

var canvasElement = $("<canvas width='" + canvas_width + "' height='" + canvas_height + "'></canvas>");
var canvas = canvasElement.get(0).getContext("2d");
canvasElement.appendTo('#thiscanvas');

var background = new Image();
background.src = "/Users/RR/dev/project-00/game_3/img/atmosphere.jpg"

var totalRounds = 0;

var totalTurns = 0;

var currentWinner = {};

var gameOn = false;

var FPS = 30;

var p1 = {
	named: "",
	turn: false,
	score: 0,
	wins: 0,
	yPos: 440,
	scores: []
};

var p2 = {
	named: "",
	turn: false,
	score: 0,
	wins: 0,
	yPos: 440,
	scores: []
};

function getInput() {
	document.onkeydown = function (event) {
		if(event.keyCode == '13') {
	     var input = $('input').text()
	 	}
	 return input;
	}
}

function getRandomNum(limitMinusOne) {
	var random = Math.round(Math.random() * limitMinusOne + 1);
	return random;
}

var newGame = {
	intro: function() {
		$('p#instructions').text("Return to earth safely from space by solving these equations");
	},

	getPlayerNames:	function() {
		$('p#instructions').text("Please enter the first player's name");
		var name1 = getInput();
		p1.named = name1;
		$('p#instructions').text("Please enter the second player's name");
		var name2 = getInput();
		p2.named = name2;
		$('p#instructions').text("");
	},

	chooseOrder: function() {
		var oneOrTwo = getRandomNum(1);
		if(oneOrTwo === 1) {
			p1.turn = true;
		} else if(oneOrTwo === 2) {
			p2.turn = true;
		}
	}
};

var newRound = {
	askPlayAgain: function() {
		$('p#instructions').text("Would you like to play again?");
		var response = getInput();
		var responseL = response.toLowerCase();
		if(response === "yes" || "y") {
			if(currentWinner === p1) {
				p1.wins++;
				p1.allScores.push(p1.score);
				$('p#instructions').text("");
			} else {
				p2.wins++
				p2.allScores.push(p2.score);
				$('p#instructions').text("");
			}
		} else {
			hardReset();
		}
	},

	roundReset: function() {
		currentWinner = {};
		p1.score = 0;
		p1.yPos = 0;
		p2.score = 0;
		p2.yPos = 0;
	},

	resume: function() {
		gameOn = true;
	}
};

var game = {
	//get randomNums
	rand1: 0,

	rand2: 0,

	solution: 0,

	collectRandomNums: function() {
		game.rand1 = getRandomNum(10);
		game.rand2 = getRandomNum(10);
	},

	solveRandomNums: function() {
		game.solution = game.rand1 * game.rand2;
	},

	//display them
	displayEquation: function() {
		$('p#instructions').text(game.rand1 + "x" + game.rand2);
	},

	//wait for player response
	awaitPlayerInput: function() {
		var stringAnswer = getInput();
		var playerAnswer = (parseInt(stringAnswer));
		$('input').text("");
		return playerAnswer;
	}, 

	determinePlayer: function(p1turn, p2turn) {
		if(p1turn) {
			return p1;
		} else if(p2turn) {
			return p2;
		} else if(p1turn && p2turn) {
			return "error";
		}
	},

	//compare solution with player answer
	compareWithSolution: function(playerAnswer) {
		if(playerAnswer === game.solution) {
			var player = game.determinePlayer(p1.turn, p2.turn);
			player.score+=25;
			player.yPos+=20;
			totalTurns++;
			//don't forget to pass player to checkWins
			game.checkWins(player);
		} else {
			player.yPos-=10;
			if(player.yPos <= 0) {
				player.yPos = 0;
			}
			totalTurns++;
			game.checkWins(player);
		}
	},

	checkWins: function(currentPlayer) {
		if(totalTurns % 2 === 0) {
			if(currentPlayer.yPos > 200) {
				game.displayWinner(currentPlayer);
				alert("congrats!")
				currentWinner = currentPlayer;
				totalRounds++;
				gameOn = false;
			}
		}
	},

	displayWinner: function(winningPlayer) {
		$('p#instructions').text("The winner is " + winningPlayer.named + "!");

	},

	switchPlayer: function() {
		if(p1.turn) {
			p2.turn = true;
			p1.turn = false;
		} else {
			p1.turn = true;
			p2.turn = false;
		}
	}

};

function displayHighScores() {
	var p1scores = p1.scores.sort();
	var p2scores = p2.scores.sort();
	$('p#highscores').text(p1.named + " " + p1scores[p1scores.length-1] + p2.named + " " + p2scores[p2scores.length-1]);
}

function hardReset() {
	p1.scores = [];
	p1.score = 0;
	p1.turn = 0;
	p1.wins = 0;
	p1.named = "";
	p1.yPos = 440;

	p2.scores = [];
	p2.score = 0;
	p2.turn = 0;
	p2.wins = 0;
	p2.named = "";
	p2.yPos = 440;

	totalRounds = 0;
	totalTurns = 0;
	currentWinner = {};
}

/*$('button#resetter').on("click", function (event) {
	hardReset();
}); */

if((gameOn === false) && (totalRounds === 0)) {
	newGame.intro();
	newGame.getPlayerNames();
	newGame.chooseOrder();
	gameOn = true; 
} else if((gameOn === false) && (totalRounds > 0)) {
	newRound.askPlayAgain();
	newRound.roundReset();
	displayHighScores();
	newRound.resume();
	console.log("cond2");
} else if((gameOn) && (p1.turn || p2.turn)) {
	game.collectRandomNums();
	game.solveRandomNums();
	game.displayEquation();
	var playerAnswer = game.awaitPlayerInput();
	game.compareWithSolution(playerAnswer);
	game.switchPlayer();
	console.log("cond3");
}

	
function playerOne() {
	canvas.beginPath();
	canvas.fillStyle = "#6F25C2";
	canvas.rect(50, p1.yPos, 20, 20);
	canvas.fill();

}

function playerTwo() {
	canvas.beginPath();
	canvas.rect(250, p1.yPos, 20, 20);
	canvas.fill();
}

setInterval(function() {
	draw();
}, 1000/FPS);

function draw() {
	canvas.clearRect(0, 0, canvas_width, canvas_height);
	canvas.drawImage(background, 0, 0);
	playerOne();
	playerTwo();
}

