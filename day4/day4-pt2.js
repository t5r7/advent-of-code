const readFileSync = require("fs").readFileSync;

// Read Input file
const input = readFileSync("input.txt", { encoding: "utf8", flag: "r" });

let count = 0;

for(const group of input.split("\n")) {
    if(!group) continue; // empty group
    
    const firstElfRange = getBetweenRange(group.split(',')[0]);
    const secondElfRange = getBetweenRange(group.split(',')[1]);

    let overlap = false;

    // this could be made more efficient using one for loop
    // taking into account the min/max of both arrays
    // buuuuut that's effort and this works and got the answer
    // so i am calling this a win
    
    // check if any of the first elf's sections are also in the second elf's
    for(const section of firstElfRange) {
        if(secondElfRange.includes(section)) {
            overlap = true;
            break;
        }
    }

    // likewise but for the second elf
    for (const section of secondElfRange) {
        if (firstElfRange.includes(section)) {
            overlap = true;
            break;
        }
    }

    if (overlap) count++;
}

console.log(count);

// turns out i did need this after all!
function getBetweenRange(range) {
    let nums = [];

    const from = parseInt(range.split('-')[0]);
    const to = parseInt(range.split('-')[1]);

    for (let i = from; i <= to; i++) {
        nums.push(i);
    }

    return nums.sort((a, b) => { return a - b }); // sort from smallest to largest and return
}