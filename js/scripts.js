// GLOBALS
	var randomHexGenerator = function(){
		return '#'+'0123456789abcdef'.split('').map(function(v,i,a){
			return i>5 ? null : a[Math.floor(Math.random()*16)] }).join('')
	}
	
	Kinetic.Orb = function(config) {
		var name = config.shapeName;
		var x = config.x || 0;
		var y = config.y || 0;
		this.radius = config.radius || 70;
		var color = config.color || randomHexGenerator();
		var opacity = config.opacity || 1;
		this._x = x;
		this._y = y;
		
		var draw = function(){
			var context = this.getContext();
			var canvas = this.getCanvas();
			context.beginPath();
			context.arc(x, y, this.radius, 0, Math.PI *2, true);
			context.fillStyle = color;
			context.fill();
			context.stroke();
			canvas.style.opacity = opacity;
		}
		Kinetic.Shape.apply(this, [draw, name]);
	}
	
	Kinetic.Orb.prototype = new Kinetic.Shape();
	
	var drawBackground = function(layer) {
		var canvas = layer.getCanvas();
		var context = layer.getContext();
		context.fillStyle = '#000';
		context.fillRect(0,0,800,600);
	}
	
	var getChildren = function(appParent, appLayer) {
		this.angle = 0;
		var toRadians = Math.PI / 180;
		var count = 0;
		var padding = 30;
		
		for(i in data.data) {
			count++;
		}
		
		this.angleChange = (360/count);
		
		for(key in data.data) {
			(function(){
				var x = parseInt((Math.cos(this.angle * toRadians) * (appParent.radius + padding)) + ((appParent._x)));
				var y = parseInt((Math.sin(this.angle * toRadians) * (appParent.radius + padding)) + ((appParent._y)));
				var elem = new Kinetic.Orb({
					shapeName: key,
					color: '#CC6600'
				})
				elem.x = x;
				elem.y = y;
				elem.radius = 20;
				this.angle -= this.angleChange;

				appLayer.add(elem);
			})();
		}
	}
	
	var init = function() {
		var stage = new Kinetic.Stage("canvas", 500, 500);
		var background = new Kinetic.Layer();
		var appLayer = new Kinetic.Layer();

		//Add background to canvas
		stage.add(background);
		// //Fill in background
		drawBackground(background);
		
		var logo = new Kinetic.Orb({
			shapeName: 'Logo',
			radius: 70,
			color: '#FF9900',
			x: stage.width / 2,
			y: stage.width / 3
		});
		logo.on("click", function(){
			getChildren(this, appLayer);
			appLayer.draw();
		})
		appLayer.add(logo);
		// 
		
		stage.add(appLayer);
		//Add shapes layer to canvas
		//Fade in logo
		$(logo.getCanvas()).animate({
			opacity: 1,
			top: "+=50px"
		}, 1000);
	}
//

$(window).ready(function(){
	init();
})