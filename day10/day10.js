const readFileSync = require("fs").readFileSync;

// Read Input file
const input = readFileSync("input.txt", { encoding: "utf8", flag: "r" });

let cycle = 1;
let registerX = 1;
let valuesAtCycle = [];	

const cyclesToCheck = [20, 60, 100, 140, 180, 220];

for(const instruction of input.split("\n")) {
	if(!instruction) continue; // ignore blank lines

	const opcode = instruction.split(" ")[0];
	const value = instruction.split(" ")[1];

	switch (opcode) {
		case "noop":
			// "noop takes one cycle to complete. It has no other effect."
			valuesAtCycle.push(registerX);
			cycle++;
			break;
		case "addx":
			// "addx V takes two cycles to complete. After two cycles, the X register is increased by the value V. (V can be negative.)"
			cycle++;
			valuesAtCycle.push(registerX);

			registerX += parseInt(value);
			
			cycle++;
			valuesAtCycle.push(registerX);
			break;
	}
}


let sum = 0;
for(const c of cyclesToCheck) sum+= (valuesAtCycle[c-2] * c);
console.log("part one:", sum);


// PART TWO
// this is 100% not how you are meant to do this
// but it works and I'm not going to spend any more time on it

let out = "";

for(let c in valuesAtCycle) {
	const beamPos = c % 40;
	const spritePos = valuesAtCycle[c-1];

	if(
		beamPos == spritePos ||
		beamPos == spritePos - 1 ||
		beamPos == spritePos + 1
	) {
		out += "#";
	} else {
		out += " ";
	}

	// console.log(beamPos);
	

	if(beamPos === 39) out += "\n";
}

console.log(out);
