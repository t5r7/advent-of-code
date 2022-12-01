import { readFileSync } from "node:fs";

// Read Input file
const input = readFileSync("input.txt", { encoding: "utf8", flag: "r" });


// Find what each elf is carrying
let elves = [];
let i = 0;

for (let line of input.split("\n")) {
  if (line.length <= 1) i++; // if the line is blank, move onto the next elf
  if (!elves[i]) elves[i] = 0; // if the current elf hasnt been seen before, init with 0
  elves[i] += parseInt(line);  // add cals to current elf
}

// Find the biggest
let currentTop = 0;
elves.forEach(e => { if (e > currentTop) currentTop = e });
console.log(currentTop); // Part One answer


// Part Two: Adding top three values
let elvesSorted = elves.sort((a, b) => b - a); // this feels like cheating
let topThree = elvesSorted[0] + elvesSorted[1] + elvesSorted[2]; // this is the best code i have ever written
console.log(topThree); // Part Two answer