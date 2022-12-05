const readFileSync = require("fs").readFileSync;

// Read Input file
const input = readFileSync("input.txt", { encoding: "utf8", flag: "r" });


let lookingAtStart = true;
let doneReverse = false;
let stacks = new Array();

for(const line of input.split("\n")) {
    let blankLine = (line.length <= 1) ? true : false;

    if (blankLine) lookingAtStart = false; // whether we are looking at the input (the stacks from 1-9), we can use blank lines to determine this

    if (lookingAtStart === true) { // if we're looking at the start we need to process the input
        const matched = line.match(/.{1,4}/g);
        if(!matched) continue;

        let i = 0;
        for (const crate of matched) { // split each line into groups of 4 chars
            if (crate.match(/ [0-9] /g)) continue;  // if the content is " X " we're at the bottom row so discard it

            let value = crate.replace(/\[|\]/g, "").replace(/ /g, "") // remove the square brackets and then spaces

            if (!stacks[i]) stacks[i] = new Array(); // init a new array if one doesn't exist for this stack

            if (value !== "") stacks[i].push(value); // add to the array if not a blank

            i++;
        }
    } else { // we can move on and work on the movements now
        if (blankLine) continue; // skip over blank lines

        const commands = line.match(/[0-9]+/g);
        const moveWhat = parseInt(commands[0]); // how many crates
        const moveFrom = parseInt(commands[1] - 1); // from what stack (minus one since we are zero-indexed)
        const moveTo = parseInt(commands[2] - 1); // to which stack (minus one since we are zero-indexed)                

        console.log(`\n==new move command==\ngoing to move ${moveWhat} crates from stack ${moveFrom+1} (index ${moveFrom}) to stack ${moveTo+1} (index ${moveTo})`);

        for(let i = 1; i <= moveWhat; i++) { // repeat for how many crates we have to move
            console.log(`moving crate #${i}/${moveWhat} with value ${stacks[moveFrom][0]}`);

            stacks[moveTo].unshift(stacks[moveFrom][0]); // add source crate to start of dest stack
            stacks[moveFrom].shift(); // remove the first crate (the one we moved) from the source stack
        }
    }
}


console.log(stacks);

let bottomRows = "";
stacks.forEach(s => bottomRows += s[0]); // append last crate of each stack

console.log(bottomRows);
