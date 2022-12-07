const readFileSync = require("fs").readFileSync;

// Read Input file
const input = readFileSync("input.txt", { encoding: "utf8", flag: "r" });

let fs = {};
let workingDir = [];

for (const line of input.split("\n")) {
    if(!line) continue; // skip blank lines


    // set our current directory
    if(line.startsWith("$ cd")) {
        
        // parse the command
        const cmd = line.split(" ")[1]; // will be "cd"
        const arg = line.split(" ")[2];  // will be the folder

        if(arg == "/") workingDir = []; // return to / properly

        if (arg == "..") {
            workingDir.pop(); // go up a folder by removing the last in the working dir array
        } else { 
            workingDir.push(arg); // else we can append the folder to the end
        }   

        // if the current dir doesnt exist we init its size
        if (!fs[workingDir.join("/")]) fs[workingDir.join("/")] = 0; 
        continue; // done with this line
    }


    // deal with files
    if(line.startsWith("$")) continue; // we don't care about the other commands

    const size = line.split(" ")[0]; // file size
    const name = line.split(" ")[1]; // file name

    if (size === "dir") continue; // we don't care about it telling us there's a dir there

    fs[workingDir.join("/")] += parseInt(size); // add the size of the file to the size of the current dir
}


// i stole this bit off george and i dont understand it really
// but maybe it works?
for (const dir in fs) {
    const name = dir;
    let size = fs[dir];

    for(const subDir in fs) {
        const subName = subDir;
        const subSize = fs[subDir];

        if (name == subName) continue;
        if (subName.startsWith(name)) size += subSize;
    }

    fs[dir] = size;
}
// thanks again big g x

let totalSize = 0; // of all folders <= 100000
for(const dir in fs) {
    const name = dir;
    const size = fs[dir];

    if(name == "/") continue; // skip over root
    if (size <= 100000) totalSize += size; // if we're under we can add to total size
}

console.log("part one, total size:", totalSize);


// PART TWO
const spaceTotal = 70000000;
const spaceRequired = 30000000;
const spaceUsed = fs["/"];
const spaceFree = spaceTotal - spaceUsed;
const toFree = spaceRequired - spaceFree;

console.log(spaceFree, "free");
console.log(toFree, "needed to free");

let candidates = []; // for deletion
for (const dir in fs) {
    const name = dir;
    const size = fs[dir];

    if (size > toFree) candidates.push({ name, size });
}

const sortedCandidates = candidates.sort((a, b) => { return a.size - b.size; });

console.log("part two, folder to delete:", sortedCandidates[0].size, sortedCandidates[0]);