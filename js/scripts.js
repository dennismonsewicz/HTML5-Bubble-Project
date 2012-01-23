// EXTENDING OBJECTS
	Array.prototype.min = function(array) {
		return Math.min.apply(Math, array);
	}
	
	Array.prototype.max = function(array) {
		return Math.max.apply(Math, array)
	}
//

// GLOBALS
    var xmlData = '<?xml version="1.0" encoding="UTF-8"?><root name="CompanyName"><projects><project name="Project1"></project><project name="Project2"></project><project name="Project3"></project></projects></root>'

    var xmlObj = []
		var xmlDoc, xml;
    var padding = 15
    var canvas = oCanvas.create({
        canvas: '#myCanvas'
    })
    var c_width = canvas.width
    var c_height = canvas.height

    var logo = canvas.display.ellipse({
        x: c_width / 2,
        y: c_height / 3,
        radius: 80,
        fill: '#d15851'
    })

		var rectObj = function(){
			this.x =  0;
			this.y =  0;
			this.width =  100;
			this.height = 100;
			this.size = this.width + this.height; //this would equate to a circles radius if dealing with circles
			this.fillerText =  null;
			this.fillRect = function(hexVal){
				if(!hexVal)
					return '#'+'0123456789abcdef'.split('').map(function(v,i,a){
	            return i>5 ? null : a[Math.floor(Math.random()*16)] }).join('')
				else
					return hexVal
					
			};
			this.drawRect = function(){
				return canvas.display.rectangle({
					width: this.width,
					height: this.height,
					fill: this.fillRect(),
					x: this.x,
					y: this.y
				})
			};
			this.checkCollisions = function(objToCheck) {
				var centerA = { x: this.x+(this.size/2), y: this.y+(this.size/2) };
				var centerB = { x:objToCheck.x+(objToCheck.size/2), y: objToCheck.y+(objToCheck.size/2) };
				var distance = Math.sqrt(((centerB.x-centerA.x)*(centerB.x-centerA.x) + (centerB.y-centerA.y)*(centerB.y-centerA.y)));
				
				if(distance < (this.size+objToCheck.size)) {
					objToCheck.x = this.x - (canvas.width/4)
				}
			}
		}

    canvas.addChild(logo)

    var parseXML = function() {
        xmlDoc = $.parseXML(xmlData)
        xml = $(xmlDoc)

        xml.find('project').each(function(i){
					xmlObj[i] = new rectObj()
					xmlObj[i].fillerText = $(this).attr('name')
					xmlObj[i].x = (logo.x + logo.radius * Math.cos((360*Math.PI) / (i + 1)) + padding) + ((xmlObj[i].width / 2) + (i+1));
					xmlObj[i].y = (logo.y + logo.radius) + padding;
        });
				
				for(i = 0; i < xmlObj.length; i++) {
					for(a = i+1; a < xmlObj.length; a++) {
						xmlObj[i].checkCollisions(xmlObj[a])
					}
					canvas.addChild(xmlObj[i].drawRect())
				}
    }

//

$(document).ready(function(){
    parseXML()
})