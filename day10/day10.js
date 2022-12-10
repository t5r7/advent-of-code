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

	// console.log(cycle, opcode, value, registerX);
}


let sum = 0;

for(const c of cyclesToCheck) {
	console.log(c, valuesAtCycle[c-1]);
	sum+= (valuesAtCycle[c-2] * c);
}

console.log(sum);