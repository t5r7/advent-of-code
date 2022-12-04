import { readFileSync } from "node:fs";

// Read Input file
const input = readFileSync("input.txt", { encoding: "utf8", flag: "r" });

let sum = 0; // total sum
let i = 1; // loop index, starts at one for %
let thisThree = []; // each group of three bags

for(const bag of input.split("\n")) {
    if(!bag) continue; // blank lines

    thisThree.push(bag); // add this bag to the current group
    
    // every three we can work on the group
    if (i % 3 == 0) {
        const commonChar = getCommonCharacter(thisThree[0].split(''), thisThree[1].split(''), thisThree[2].split(''));

        let thisCharValue = commonChar.toLowerCase().charCodeAt() - 96; // use ascii codes to get pos in alphabet (1-26)
        if (commonChar.toUpperCase() == commonChar) thisCharValue += 26; // if it's a capital letter, we need to add 26 for 27-52

        console.log(thisThree, commonChar, thisCharValue);

        sum += thisCharValue;

        // wipe the group now we're done
        thisThree = [];
    }

    i++;
}

console.log(sum);


// Out of curiosity, I got the new OpenAI chatbot to write this bit
// https://chat.openai.com/chat
// prompt: "in javascript, write a function to get the only common character across three arrays of single character strings"
// took a few attempts to get a working version, it got very confident that there were no problems with some obviously broken implementations

// == BEGIN AI STUFF ==
function getCommonCharacter(arr1, arr2, arr3) {
    // Create a Set from each array to remove duplicates
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    const set3 = new Set(arr3);

    // Use the spread operator (...) to convert each Set to an array
    // and then use the Array.filter() method to keep only the elements
    // that are present in all three arrays
    const common = [...set1, ...set2, ...set3].filter(c => set1.has(c) && set2.has(c) && set3.has(c));

    // Return the first element in the common array, or null if the array is empty
    return common.length > 0 ? common[0] : null;
}
// == END AI STUFF ==

// the future is terrifying but also this is SO COOL