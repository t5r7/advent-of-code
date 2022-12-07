const readFileSync = require("fs").readFileSync;

// Read Input file
const input = readFileSync("input.txt", { encoding: "utf8", flag: "r" });

let fs = {};
let workingDir = [];

let listingFiles = false;
for (const line of input.split("\n")) {
    if(!line) continue;


    // set our current directory
    if(line.startsWith("$ cd")) {
        
        // parse the command
        const cmd = line.split(" ")[1]; // will be "cd"
        const arg = line.split(" ")[2];  // will be the folder

        if(arg == "/") workingDir = [];

        if (arg == "..") {
            workingDir.pop();
        } else { 
            workingDir.push(arg);
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

    // console.log(workingDir, size, name);

    fs[workingDir.join("/")] += parseInt(size);
}

console.log(fs);

// i stole this bit off george and i dont understand it really
// but maybe it works?
for (const dir in fs) {
    const dirName = dir;
    let dirSize = fs[dir];

    for(const subDir in fs) {
        const subDirName = subDir;
        const subDirSize = fs[subDir];

        if(dirName == subDirName) {
            continue;
        }
        if(subDirName.startsWith(dirName)) {
            dirSize += subDirSize;
        }
    }

    fs[dir] = dirSize;
}

console.log(fs);

let totalSize = 0;
for(const folder in fs) {
    const folderName = folder;
    const folderSize = fs[folder];

    if(folderName == "/") continue;

    if (folderSize <= 100000) {
        // console.log("adding this folder", folderName, folderSize);

        totalSize += folderSize;
    }

}

console.log(totalSize);