
$(document).ready(function(){

var canvas_width = 300;
var canvas_height = 480;

var canvasElement = $("<canvas width='" + canvas_width + 
 "' height='" + canvas_height + "'></canvas>");

var canvas = canvasElement.get(0).getContext("2d");
canvasElement.appendTo('.mycanvas');

var background = new Image();
background.src = "/Users/RR/dev/project-00/game_2/img/atmosphere.jpg"

var rand1;
var rand2;
var userAnswer;

var playerOne = true; 

var p1Y = 440;
var p2Y = 440;

var p1Score = 0;
var p2Score = 0;

function getRandomNums() {
	rand1 = Math.round(Math.random() * 8 + 1);
	rand2 = Math.round(Math.random() * 8 + 1);
}

function solveNums(rand1, rand2) {
	var realAnswer = rand1 + rand2;
	return realAnswer; 
}

function checkUserAnswer(answer, userAnswer) {
	var parsedInt = parseInt(userAnswer);
	if(answer === parsedInt) {
		console.log("correct");
		if(playerOne) {
			p1Y-=25;
			p1Score+=10;
		} else {
			p2Y-=25;
			p2Score+=10;
		}
	} else {
		console.log("incorrect");
		if(playerOne) {
			p1Y+=10;
			p2Score-=5;
		} else {
			p2Y+=10;
			p2Score-=5;
		}
	}
	winConditions();
	newEquation();
	$('p#currentP').text(delegateTurn());
	displayScore();
}

function newEquation() {
	$('input').val('');
	getRandomNums();
	$('.numdisplay').text(rand1 + "     +     " + rand2 + " = ");
	var solution = solveNums(rand1, rand2);
	document.onkeydown = function (event) {
		if(event.keyCode == '13') {
	     var userAnswer= $('input').val();
	     checkUserAnswer(solution, userAnswer);
	  	}
	}
}


function characterOne() {
	
	canvas.beginPath();
	canvas.fillStlye = "#6F25C2";
	canvas.rect(44, p1Y, 20, 20);
	canvas.fill();
	//can replace with drawImage for sprites
}

function characterTwo() {
	canvas.beginPath();
	canvas.fillStyle = "#F99A18"
	canvas.rect(218, p2Y, 20, 20);
	canvas.fill();
}

function delegateTurn() {
	if(playerOne) {
		playerOne = false;
		return "Go player 2!"
	} else {
		playerOne = true;
		return "Go player 1!"
	}
}

function displayScore() {
	$('p#scorekeeper').text("Player one: " + p1Score + " | Player two: " + p2Score);	
}

function winConditions() {
	if(p1Y < 10 || p2Y < 10) {
		if(p1Y < 10) {
			$('p#winner').text("The winner is player one!");
		} else {
			$('p#winner').text("The winner is player two!");
		}
		var response = prompt("You successfully made it through the atmosphere! Play again?")
			if(response === "yes" || "YES") {
				reset();
			}
	}
}

function reset() {
	p1Y = 440;
	p2Y = 440; 
	p1Score = 0;
	p2Score = 0;
	$('p#winner').text("");
	$('p#currentP').text("");
	playerOne = true;
}

newEquation();

$('button.reset').on("click", function (event) {
	reset();
})


var FPS = 30;

setInterval(function() {
	draw();
	//update();
}, 1000/FPS);


function draw() {
	canvas.clearRect(0, 0, canvas_width, canvas_height);
	canvas.drawImage(background, 0, 0)
	characterOne();
	characterTwo();

}

	console.log("the document is ready!");
})

