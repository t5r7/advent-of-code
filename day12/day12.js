const readFileSync = require("fs").readFileSync;
const input = readFileSync("input.txt", { encoding: "utf8", flag: "r" });

let grid = [];
let start;
let end;

for (let y in input.split("\n")) {
	y = parseInt(y);

	const line = input.split("\n")[y];
	
	if(!grid[y]) grid[y] = []; // init missing rows

	for (let x in line.split("")) {
		x = parseInt(x);

		const letter = line.split("")[x];

		// set to height value of the letter (1-26)
		grid[y][x] = {x, y, letter, height: letter.charCodeAt(0) - 96, visited: false, dist: Infinity};
		
		// if it's the start, set to height zero
		if(letter === "S") {
			grid[y][x].height = 0;
			grid[y][x].dist = 0;
			start = grid[y][x];
		}

		// if it's the end, set to height 27
		if(letter === "E") {
			grid[y][x].height = 27;
			end = grid[y][x];
		}
	}
}


let queue = [start];

// while there are still points in the queue
while (queue.length > 0) {	
	const currentSpot = queue[0];
	const x = currentSpot.x;
	const y = currentSpot.y;

	// remove the current point from the queue
	queue.shift();

	// ignore visited spots
	if(currentSpot.visited) continue;
	currentSpot.visited = true;


	if(currentSpot.letter === end.letter) {
		console.log("Found end!");
		console.log(currentSpot);
		break;
	}

	// check the 4 surrounding points
	// if they are not visited, and are within the height limit, add them to the queue
	
	// above
	const spotAbove = (grid[y-1]) ? grid[y-1][x] : false;
	if(spotAbove) { // make sure the row exists
		if(spotAbove.height <= currentSpot.height+1 && !spotAbove.visited) {
			spotAbove.dist = currentSpot.dist + 1; // set its distance
			queue.push(spotAbove); // add it to queue
		}
	}

	// below
	const spotBelow = (grid[y+1]) ? grid[y+1][x] : false;
	if(spotBelow) { // make sure the row exists
		if(spotBelow.height <= currentSpot.height+1 && !spotBelow.visited) {
			spotBelow.dist = currentSpot.dist + 1; // set its distance
			queue.push(spotBelow); // add it to queue
		}
	}

	// left
	const spotLeft = (grid[y][x-1]) ? grid[y][x-1] : false;
	if(spotLeft) { // make sure the row exists
		if(spotLeft.height <= currentSpot.height+1 && !spotLeft.visited) {
			spotLeft.dist = currentSpot.dist + 1; // set its distance
			queue.push(spotLeft); // add it to queue
		}
	}

	// right
	const spotRight = (grid[y][x+1]) ? grid[y][x+1] : false;
	if(spotRight) { // make sure the row exists
		if(spotRight.height <= currentSpot.height+1 && !spotRight.visited) {
			spotRight.dist = currentSpot.dist + 1; // set its distance
			queue.push(spotRight); // add it to queue
		}
	}

	printGrid();
}

function printGrid() {
	let outGrid = "";
	for (let y in grid) {
		for (let x in grid[y]) {
			outGrid += (grid[y][x].visited) ? "#" : grid[y][x].letter;
			// outGrid += grid[y][x].letter;
			// outGrid += (grid[y][x].visited === true) ? "y" : "n";
			// outGrid += (grid[y][x].dist === Infinity) ? "∞" : grid[y][x].dist;
			// outGrid += " ";
		}
		outGrid += "\n";
	}

	console.log(outGrid);
}


