const readFileSync = require("fs").readFileSync;

// Read Input file
const input = readFileSync("input.txt", { encoding: "utf8", flag: "r" });

let visited = new Set();
let headX = 0;
let headY = 0;

let knots = []
for(let i = 0; i < 9; i++) knots.push([0, 0]);
// for easier reference to the knots
const x = 0;
const y = 1;

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

		// first knot follows old tail logic
		if (Math.abs(headX - knots[0][x]) > 1 || Math.abs(headY - knots[0][y]) > 1) {
			if (headX > knots[0][x]) knots[0][x]++;
			if (headX < knots[0][x]) knots[0][x]--;
			if (headY > knots[0][y]) knots[0][y]++;
			if (headY < knots[0][y]) knots[0][y]--;
		}

		for(let knot in knots) {
			// we've already moved the first knot
			if(knot == 0) continue;
			let prevKnot = knots[knot - 1];
			let thisKnot = knots[knot];

			// if knot is no longer adjacent to prev knot, move it
			if (Math.abs(prevKnot[x] - thisKnot[x]) > 1 || Math.abs(prevKnot[y] - thisKnot[y]) > 1) {
				if (prevKnot[x] > thisKnot[x]) thisKnot[x]++;
				if (prevKnot[x] < thisKnot[x]) thisKnot[x]--;
				if (prevKnot[y] > thisKnot[y]) thisKnot[y]++;
				if (prevKnot[y] < thisKnot[y]) thisKnot[y]--;
			}
		}

		const lastKnot = knots[knots.length - 1];
		visited.add(`${lastKnot[x]},${lastKnot[y]}`);
	}

	console.log("head", headX, headY, "visited", visited.size);

}

console.log(visited.size);