var keys=[];
for (var x=0;x<222;x++) {
	keys[x]=false;
}

function getMovement() {
	var movementVector=[0,0,0,0,0,0,0,0];

	if (keys[87]) { //w
		movementVector[2]++;
	}
	if (keys[83]) { //s
		movementVector[2]--;
	}
	if (keys[68]) { //d
		movementVector[0]++;
	}
	if (keys[65]) { //a
		movementVector[0]--;
	}
	if (keys[69]) { //e
		movementVector[1]++;
	}
	if (keys[81]) { //q
		movementVector[1]--;
	}
	if (keys[38]) { //up
		movementVector[3]++;
	}
	if (keys[40]) { //down
		movementVector[3]--;
	}
	if (keys[37]) { //left
		movementVector[4]--;
	}
	if (keys[39]) { //right
		movementVector[4]++;
	}
	if (keys[219]) { //[
		movementVector[5]--;
	}
	if (keys[221]) { //]
		movementVector[5]++;
	}
	if (keys[188]) { //<
		movementVector[6]++;
	}
	if (keys[190]) { //>
		movementVector[6]--;
	}
	if (keys[16]) { //shift
		movementVector[7]++;
	}
	return movementVector;
}

addEventListener("keydown",function(event) {
	keys[event.keyCode]=true;
});

addEventListener("keyup",function(event) {
	keys[event.keyCode]=false;
});