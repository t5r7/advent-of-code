const readFileSync = require("fs").readFileSync;

// Read Input file
const input = readFileSync("input.txt", { encoding: "utf8", flag: "r" });

let visited = new Set();
let headX = 0;
let headY = 0;
let tailX = 0;
let tailY = 0;

for(const instruction of input.split("\n")) {
	if(!instruction) continue;

	const direction = instruction.split(" ")[0].toLowerCase();
	const amount = parseInt(instruction.split(" ")[1]);

	console.log(direction, amount);

	for(let i = 0; i < amount; i++) {
		switch (direction) {
			case "u": // up
				headY--;
				break;
			case "d": // down
				headY++;
				break;
			case "l": // left
				headX--;
				break;
			case "r": // right
				headX++;
				break;
		}
	
		// if tail is no longer adjacent to head, move tail
		if(Math.abs(headX - tailX) > 1 || Math.abs(headY - tailY) > 1) {
			if(headX > tailX) tailX++;
			if(headX < tailX) tailX--;
			if(headY > tailY) tailY++;
			if(headY < tailY) tailY--;
		}

		visited.add(`${tailX},${tailY}`);
	}

	console.log("head", headX, headY, "tail", tailX, tailY);

}

console.log(visited.size);