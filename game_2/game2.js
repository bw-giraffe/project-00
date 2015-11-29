
$(document).ready(function(){
	console.log("the document is ready!");
})

var canvas_width = 300;
var canvas_height = 480;

var canvasElement = $("<canvas width='" + canvas_width + 
 "' height='" + canvas_height + "'></canvas>");

var canvas = canvasElement.get(0).getContext("2d");
canvasElement.appendTo('.mycanvas');

var rand1;
var rand2;
var userAnswer;

var p1Y = 440;
var p2Y = 440;

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
		p1Y--;
		p2Y--;
		console.log("correct");
		//switch over to other char 
		//reset the math
		newEquation();
	} else {
		p1Y++;
		p1Y++;
		console.log("incorrect");
		//switch to other char 
		//reset the math
		newEquation();
	}
}

function newEquation() {
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

newEquation();

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

function whoseTurn() {
	if()
}


var FPS = 30;

setInterval(function() {
	draw();
	//update();
}, 1000/FPS);

function draw() {
	canvas.clearRect(0, 0, canvas_width, canvas_height);
	characterOne();
	characterTwo();
}
