var context, canvas, clientOpts;
var x = 100;
var y = 200;
var dx = 5;
var dy = 5; //.2 is pretty slow

function drawCircle() {
    // sliding up
			//     if (y > target) {
			// y -= dy;
			//     }
			
		if(clientOpts) {
			if(clientOpts.cy < y)
				y -= dy;
			else
				y += dy;
				
			if(clientOpts.cx < x)
				x -= dx;
			else
				x += dx;
		}
		
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.beginPath()
		context.fillStyle = "#0000ff";
		context.arc(x, y, 20, 0, Math.PI * 2, true);
		context.fill();
		context.closePath();
}

window.onload = function () {
    // get canvas, and context once
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');

    // set target y position
    canvas.onclick = function (e) {
			clientOpts = {
				cy: e.clientY,
				cx: e.clientX
			}
    }
    // 30fps
    setInterval(drawCircle, (1000 / 30));
}