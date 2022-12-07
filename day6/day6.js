const readFileSync = require("fs").readFileSync;

// Read Input file
const input = readFileSync("input.txt", { encoding: "utf8", flag: "r" });


let currentCheck = [];
let currentCharIndex = 0;
let uniqueChars = 14; // this is 4 for part one, 14 for part two

for (const char of input.split("")) {
    
    currentCheck.push(char); // add current character to the current 4 we're checking

    // console.log(currentCheck);

    if (currentCheck.length === (uniqueChars+1)) {
        currentCheck.shift(); // remove first element if we have unique+1 chars in the array
        // then check whether any chars are unique
        const currentCheckSet = new Set(currentCheck); // sets only contain unique elements
        console.log(currentCheck, currentCheckSet.size);
        if (currentCheckSet.size === uniqueChars) { console.log(currentCharIndex+1); break; }

    }

    currentCharIndex++;
}