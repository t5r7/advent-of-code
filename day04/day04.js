const readFileSync = require("fs").readFileSync;

// Read Input file
const input = readFileSync("input.txt", { encoding: "utf8", flag: "r" });

let count = 0;

for(const group of input.split("\n")) {
    if(!group) continue; // empty group
    
    const firstElfRange = group.split(',')[0];
    const secondElfRange = group.split(',')[1];

    const firstElfLowest = parseInt(firstElfRange.split('-')[0]);
    const firstElfHighest = parseInt(firstElfRange.split('-')[1]);

    const secondElfLowest = parseInt(secondElfRange.split('-')[0]);
    const secondElfHighest = parseInt(secondElfRange.split('-')[1]);

    // if the second elf's sections are within the first elf's
    // as in the example from aoc below:
    // .2345678.  2 - 8
    // ..34567..  3 - 7
    // second elf's lowest is greater than or eq to first elf's lowest
    // second elf's highest is less than or eq to first elf's highest
    if (secondElfLowest >= firstElfLowest && secondElfHighest <= firstElfHighest) {
        count++;
        continue;
    }

    // inverse of above; if first elf is within second elf
    if (firstElfLowest >= secondElfLowest && firstElfHighest <= secondElfHighest) {
        count++;
        continue;
    }
}

console.log(count);