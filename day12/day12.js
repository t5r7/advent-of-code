const readFileSync = require("fs").readFileSync;
const input = readFileSync("input-test.txt", { encoding: "utf8", flag: "r" });

let grid = [];

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
		if(letter === "S") grid[y][x].height = 0; 

		// if it's the end, set to height 27 and dist to 0
		if(letter === "E") grid[y][x].height = 27;
		if(letter === "E") grid[y][x].dist = 0;
	}
}


console.log(grid);

// find the starting X and Y
let start = {};

for(const y in grid) {
	for (const x in grid[y]) {
		if(grid[y][x].letter == "E") start = grid[y][x];
	}
}

let queue = [];

// add the goal point to the queue
queue.push(start);

// while there are still points in the queue
while (queue.length > 0) {	
	const currentSpot = queue[0];
	const x = parseInt(currentSpot.x);
	const y = parseInt(currentSpot.y);

	// remove the current spot from the queue
	queue.shift();

	if(currentSpot.letter === "S") { console.log("FOUND THE START!"); break; }

	// if in visited, skip
	if(currentSpot.visited === true) continue;

	currentSpot.visited = true;


	// add the adjacent points to the queue if they exist

	const ourHeight = currentSpot.height;
	const ourDist = currentSpot.dist;

	// square above
	if (grid[y - 1]) { // check it exists
		if (grid[y - 1][x].height <= ourHeight) {
			grid[y - 1][x].dist = ourDist + 1;
			queue.push(grid[y - 1][x]); // if it's not too high, add
		}
	}

	// square to the right
	if (grid[y][x + 1]) {
		if (grid[y][x + 1].height <= ourHeight) {
			grid[y][x + 1].dist = ourDist + 1;
			queue.push(grid[y][x + 1]);
		}
	}

	// square below
	if (grid[y + 1]) {
		if (grid[y + 1][x].height <= ourHeight) {
			grid[y + 1][x].dist = ourDist + 1;
			queue.push(grid[y + 1][x]);
		}
	}

	// square to the left
	if (grid[y][x - 1]) {
		if (grid[y][x - 1].height <= ourHeight) {
			grid[y][x - 1].dist = ourDist + 1;
			queue.push(grid[y][x - 1]);
		}
	}

	printGrid();
}


function printGrid() {
	let outGrid = "";
	for (let y in grid) {
		for (let x in grid[y]) {
			outGrid += grid[y][x].letter;
			outGrid += (grid[y][x].visited === true) ? "y" : "n";
			outGrid += (grid[y][x].dist === Infinity) ? "∞" : grid[y][x].dist;
			outGrid += " ";
		}
		outGrid += "\n";
	}

	console.log(outGrid);
}


