$(document).ready(function(){
	console.log("the document is ready!");
})

var canvas_width = 480;
var canvas_height = 320;

var canvasElement = $("<canvas width='" + canvas_width + 
                      "' height='" + canvas_height + "'></canvas>");
var canvas = canvasElement.get(0).getContext("2d");
canvasElement.appendTo('body');

var background = new Image();
background.src = "/Users/RR/dev/project-00/game_1/img/resizedpallascat.jpg";


var recOneX = 10;
var recOneY = 10;

var recTwoX = 10;
var rectTwoY = 30; 

var recOneWins = 0; 
var recTwoWins = 0;

//where we get the keypress 
document.onkeydown = function (event) {
	if(event.keyCode == '83') {
			//console.log("bump rec1");
			recOneX = recOneX + 8;
	} else if(event.keyCode == '75') {
			//console.log("bump rec2");
			recTwoX = recTwoX + 8;
	}
}

var startGame = false; 

function intro() {
	var answer = prompt("Would you like to race?") 
		if(answer === "yes" || answer === "YES" || answer === "Y") {
			startGame = true; 
		} else {
			intro();
		}
}

function rectOne() {
	canvas.beginPath();
	canvas.fillStyle = "#A00";
	canvas.rect(recOneX, 20, 50, 50);
	canvas.fill();
}

function rectTwo() {
	canvas.beginPath();
	canvas.fillStyle = "#3AC301";
	canvas.rect(recTwoX, 200, 50, 50);
	canvas.fill();
}

function encouragingBanner() {
	canvas.beginPath();
	canvas.fillStyle = "#ABEBC6";
	canvas.fillText("Race!", textX, textY);
	canvas.fill();
}


//win conditions 
function checkWinner() {
	if(recOneX > 480) {
		//declare winner
		alert("red wins!");
		//add a win
		recOneWins+=1;
		//end game 
		startGame = false; 
	} else if(recTwoX > 480){
		alert("green wins!");
		recTwoWins+=1;
		startGame = false;
	}
}

function resetGame() {
	recOneX = 10;
	recTwoX = 10;
}

var resetGame = {
	round: function() {
		recOneX = 10;
		recTwoX = 10;
	},
	wholeGame: function() {
		resetGame.round();
		recOneWins = 0;
		recTwoWins = 0;
	}
};

var FPS = 30;

setInterval(function() {
	update();
	draw();
}, 1000/FPS);

var textX = 0;
var textY = 0;

function update() {
	textY++;
	textX++;
	if(((textX / canvas_width) > 1) || ((textY / canvas_height) > 1)) {
		textX = 0;
		textY = 0;
	}
 }

function draw() { 
	if((startGame === false) && (recOneWins > 0 || recTwoWins > 0)) {
		alert("The current score is red: " + recOneWins + "   green: " + recTwoWins);
		var response = prompt("Play another round?");
		if(response === "yes" || response === "YES" || response === "Y") {
			resetGame.round();
			startGame = true; 
		} else {
			resetGame.wholeGame();
		}
	} else if(startGame === false) {
		intro();
	} else if(startGame) {
		canvas.clearRect(0, 0, canvas_width, canvas_height);
		canvas.drawImage(background, 0, 0);
		rectOne();
		rectTwo();
		checkWinner();
		encouragingBanner();
	}
}




