$(document).ready(function(){
	//Canvas stuff
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	
	var xpos = 10; //default
	var ypos = 10;

	function paint() {

	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, w, h);

	ctx.rect(xpos, 10, 150, 100);
	ctx.stroke();
	}



	$(document).keydown(function(e) {
		var key = e.which;
	 	if(key == "39") {
	 		xpos = xpos + 1;
	 		console.log("you pressed this key")
	 	}
    })
	
	paint();
	
})