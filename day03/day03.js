const readFileSync = require("fs").readFileSync;

// Read Input file
const input = readFileSync("input.txt", { encoding: "utf8", flag: "r" });

let sum = 0;

for(const bag of input.split("\n")) {
    if(!bag) continue; // blank lines

    const firstHalf = bag.slice(0, bag.length/2).split(''); // first compartment
    const secondHalf = bag.slice(bag.length / 2, bag.length).split(''); // second compartment

    let matchingLetter = null;
    firstHalf.forEach(letter => {
        if(secondHalf.includes(letter)) {
            matchingLetter = letter;
            return;
        }
    });

    let thisCharValue = matchingLetter.toLowerCase().charCodeAt() - 96; // use ascii codes to get pos in alphabet (1-26)
    if (matchingLetter.toUpperCase() == matchingLetter) thisCharValue += 26; // if it's a capital letter, we need to add 26 for 27-52
    
    console.log(matchingLetter, thisCharValue);
    sum += thisCharValue;
}

console.log(sum);