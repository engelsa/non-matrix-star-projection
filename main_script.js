var canvas=document.createElement("canvas");
canvas.width=window.innerWidth-20;
canvas.height=window.innerHeight-20;
canvas.style.position="absolute";
canvas.style.border="1px solid";
document.body.appendChild(canvas);

var context=canvas.getContext("2d");
context.fillStyle="#FFFFFF";
context.strokeStyle="#FFFFFF";

var fieldOfView=Math.PI/4;
var rotationAngle=[0,0,0];
var cameraPoint=[0,0,0];

var points=[];

for (var index=0;index<10000;index++) {
	var point=[0,0,0];
	point[0]=Math.random()*1000-50;
	point[1]=Math.random()*1000;
	point[2]=Math.random()*1000-50;
	points.push(point);
}

function getMagnitude(point) {
	var total=0;
	for (var index=0;index<point.length;index++) {
		total+=Math.pow(point[index],2);
		
	}
	total=Math.pow(total,.5);
	return total;
}

function getDifference(from,to) {
	var differenceVector=[];
	for (var index=0;index<from.length;index++) {
		differenceVector.push(to[index]-from[index]);
	}
	return differenceVector;
}

function createRelativeCoordinate(coordinate) {
	var newCoordinate=[coordinate[0],coordinate[1],coordinate[2]];

	var currentYAngle=Math.atan2(newCoordinate[0],newCoordinate[2]);
	var magnitude=getMagnitude([newCoordinate[0],newCoordinate[2]]);
	var yAngle=currentYAngle-rotationAngle[1];
	newCoordinate[2]=magnitude*Math.cos(yAngle);
	newCoordinate[0]=magnitude*Math.sin(yAngle);

	var currentXAngle=Math.atan2(newCoordinate[1],newCoordinate[2]);
	magnitude=getMagnitude([newCoordinate[1],newCoordinate[2]]);
	var xAngle=currentXAngle-rotationAngle[0];
	newCoordinate[2]=magnitude*Math.cos(xAngle);
	newCoordinate[1]=magnitude*Math.sin(xAngle);

	var currentZAngle=Math.atan2(newCoordinate[0],newCoordinate[1]);
	magnitude=getMagnitude([newCoordinate[0],newCoordinate[1]]);
	var zAngle=currentZAngle-rotationAngle[2];
	newCoordinate[1]=magnitude*Math.cos(zAngle);
	newCoordinate[0]=magnitude*Math.sin(zAngle);

	return newCoordinate;
}

function findScreenPoint(coordinate) {
	var screenPoint=[0,0];

	var outwardAngle=Math.acos(coordinate[2]/getMagnitude(coordinate));
	var radialAngle=Math.atan2(coordinate[1],coordinate[0])

	var screenSize=Math.min(canvas.width,canvas.height);
	var magnitude=outwardAngle/fieldOfView*screenSize/2;

	screenPoint[0]=canvas.width/2+magnitude*Math.cos(radialAngle);
	screenPoint[1]=canvas.height/2-magnitude*Math.sin(radialAngle);

	return screenPoint;
}

function drawObjects() {
	context.clearRect(0,0,canvas.width,canvas.height);
	for (var index=0;index<points.length;index++) {
		var screenPoint=findScreenPoint(createRelativeCoordinate(getDifference(cameraPoint,points[index])));
		var size=1000/getMagnitude(getDifference(cameraPoint,points[index]))/fieldOfView;
		context.fillRect(screenPoint[0],screenPoint[1],size,size);
	}
	var movementVector=getMovement();
	cameraPoint[2]+=movementVector[2]*Math.cos(rotationAngle[1])*Math.cos(rotationAngle[0])-movementVector[0]*Math.sin(rotationAngle[1])*Math.cos(rotationAngle[0])*Math.cos(rotationAngle[2])-movementVector[1]*Math.cos(rotationAngle[1])*Math.sin(rotationAngle[0])-movementVector[1]*Math.sin(rotationAngle[2])*Math.sin(rotationAngle[1]);
	cameraPoint[0]+=movementVector[0]*Math.cos(rotationAngle[1])*Math.cos(rotationAngle[2])+movementVector[2]*Math.sin(rotationAngle[1])*Math.cos(rotationAngle[0])-movementVector[1]*Math.sin(rotationAngle[1])*Math.sin(rotationAngle[0])+movementVector[1]*Math.sin(rotationAngle[2])*Math.cos(rotationAngle[1]);
	cameraPoint[1]+=movementVector[1]*Math.cos(rotationAngle[0])*Math.cos(rotationAngle[2])-movementVector[0]*Math.sin(rotationAngle[2])*Math.cos(rotationAngle[0])+movementVector[2]*Math.sin(rotationAngle[0]);
	rotationAngle[0]+=(movementVector[3])/100;
	rotationAngle[1]+=(movementVector[4])/100;
	rotationAngle[2]+=(movementVector[5])/100;

	if (rotationAngle[0]>Math.PI) {
		rotationAngle[0]-=Math.PI*2;
	}
	if (rotationAngle[1]>Math.PI) {
		rotationAngle[1]-=Math.PI*2;
	}
	if (rotationAngle[2]>Math.PI) {
		rotationAngle[2]-=Math.PI*2;
	}
	if (rotationAngle[0]<-Math.PI) {
		rotationAngle[0]+=Math.PI*2;
	}
	if (rotationAngle[1]<-Math.PI) {
		rotationAngle[1]+=Math.PI*2;
	}
	if (rotationAngle[1]<-Math.PI) {
		rotationAngle[1]+=Math.PI*2;
	}

	fieldOfView=Math.min(Math.max(fieldOfView+movementVector[6]/100,0),Math.PI);

	context.fillText("Position: "+Math.floor(cameraPoint[0])+", "+Math.floor(cameraPoint[1])+", "+Math.floor(cameraPoint[2]),10,10);
	context.fillText("Angle: "+Math.floor(rotationAngle[0]/Math.PI*180)+", "+Math.floor(rotationAngle[1]/Math.PI*180)+", "+Math.floor(rotationAngle[2]/Math.PI*180),10,20);
	context.fillText("Field of view: "+Math.floor(fieldOfView/Math.PI*360),10,30);
}

function loop() {
	drawObjects();
}

setInterval(loop,1);