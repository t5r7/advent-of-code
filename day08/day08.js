const readFileSync = require("fs").readFileSync;

// Read Input file
const input = readFileSync("input.txt", { encoding: "utf8", flag: "r" });


let grid = [];

let i = 0;
for(const line of input.split("\n")) {
    if(!line) continue; // skip blanks

    if(!grid[i]) grid[i] = []; // if there's no existing row then make one

    // build the rows by adding trees
    for(const char of line.split("")) {
        grid[i].push(char);
    }

    i++;
}

console.table(grid);

let visible = 0;

for(const row in grid) {
    for(const col in grid) {
        const tree = grid[row][col];
        console.log("checking tree", tree, "at", row, col);
        
        // Efficiency? what's that?

        // check visibility from above
        let visibleFromAbove = true;
        for(let i = 0; i < row; i++) {
            const checkTree = grid[i][col];
            if (checkTree >= tree) {
                visibleFromAbove = false;
                break;
            }
        }
        console.log(visibleFromAbove, "above");

        // check visibility from below
        let visibleFromBelow = true;
        for (let i = grid.length - 1; i > row; i--) {
            const checkTree = grid[i][col];
            if (checkTree >= tree) {
                visibleFromBelow = false;
                break;
            }
        }
        console.log(visibleFromBelow, "below");

        // check visibility from left
        let visibleFromLeft = true;
        for (let i = 0; i < col; i++) {
            const checkTree = grid[row][i];
            if (checkTree >= tree) {
                visibleFromLeft = false;
                break;
            }
        }
        console.log(visibleFromLeft, "left");

        // check visibility from right
        let visibleFromRight = true;
        for (let i = grid[row].length - 1; i > col; i--) {
            const checkTree = grid[row][i];
            if (checkTree >= tree) {
                visibleFromRight = false;
                break;
            }
        }
        console.log(visibleFromRight, "right");

        if(visibleFromAbove || visibleFromBelow || visibleFromLeft || visibleFromRight) visible++;

    }
}

console.log(visible);