import {readFileSync} from 'node:fs';

// Read Input file
const input = readFileSync('input.txt', { encoding: 'utf8', flag: 'r' });


// Find what each elf is carrying
let elves = [];
let i = 0;

for (let line of input.split('\n')) {
    if (line.length <= 1) i++;

    if(!elves[i]) elves[i] = 0;

    elves[i] += parseInt(line);
}


// Find the biggest
let currentTop = 0;

for(let elf of elves) {
    if(elf > currentTop) currentTop = elf;
}

console.log(currentTop);


// Part Two: Adding top three values
let elvesSorted = elves.sort((a, b) => b - a); // this feels like cheating

let topThree = elvesSorted[0] + elvesSorted[1] + elvesSorted[2];
console.log(topThree);