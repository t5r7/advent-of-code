import {readFileSync} from 'node:fs';

// Read Input file
const input = readFileSync('input.txt', { encoding: 'utf8', flag: 'r' });

let elves = [];
let i = 0;


// Find what each elf is carrying
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