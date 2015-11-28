$(document).ready(function(){
	console.log("the document is ready!");
})

var canvas_width = 480;
var canvas_height = 320;

var canvasElement = $("<canvas width='" + canvas_width + 
                      "' height='" + canvas_height + "'></canvas>");
var canvas = canvasElement.get(0).getContext("2d");
canvasElement.appendTo('body');

var recOneX = 10;
var recOneY = 10;

var recTwoX = 10;
var rectTwoY = 50; 

/* function rectangleOne() {
  canvas.fillStyle = "#ABEBC6";
  canvas.fillRect(recOneX, recOneY, 20, 20);
} */


//where we get the keypress 
document.onkeydown = function (event) {
	if(event.keyCode == '83') {
			console.log("bump rec1");
			recOneX = recOneX + 5;
	} else if(event.keyCode == '75') {
			console.log("bump rec2");
			recTwoX = recTwoX + 5;
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

	

var FPS = 30;
setInterval(function() {
	update();
	draw();
}, 1000/FPS);

var textX = 50;
var textY = 50;

function update() {
	textX += 1;
	textY += 1;
 }

function draw() { 

	canvas.clearRect(0, 0, canvas_width, canvas_height);
	rectOne();
	rectTwo();
	canvas.fillStyle = "#00A";
	canvas.fillText("Race!", textX, textY);

}




