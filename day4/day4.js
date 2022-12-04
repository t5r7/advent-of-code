import { readFileSync } from "node:fs";

// Read Input file
const input = readFileSync("input.txt", { encoding: "utf8", flag: "r" });

let count = 0;
for(const group of input.split("\n")) {
    if(!group) continue; // empty group

    let contained = false;
    
    const firstElfRange = group.split(',')[0];
    const secondElfRange = group.split(',')[1];

    const firstElfLowest = firstElfRange.split('-')[0];
    const firstElfHighest = firstElfRange.split('-')[1];

    const secondElfLowest = secondElfRange.split('-')[0];
    const secondElfHighest = secondElfRange.split('-')[1];

    if (secondElfLowest >= firstElfLowest && secondElfHighest <= firstElfHighest) contained = true;
    if (firstElfLowest >= secondElfLowest && firstElfHighest <= secondElfHighest) contained = true;

    // console.log(group, contained);
    if(contained) {
        console.log(group, getBetweenRange(firstElfRange), getBetweenRange(secondElfRange));
    }
    
    if (contained) count++;
}

console.log(count);


// turns out this wasnt required oops
function getBetweenRange(range) {
    let nums = [];

    const from = parseInt(range.split('-')[0]);
    const to = parseInt(range.split('-')[1]);

    for(let i = from; i <= to; i++) {
        nums.push(i);
    }

    return nums.sort((a, b) => { return a - b }); // sort from smallest to largest and return
}