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

let scores = [];

for(let row in grid) {
    for(let col in grid) {
        // i hate JS
        row = parseInt(row);
        col = parseInt(col);

        const tree = grid[row][col];
        console.log("checking tree", tree, "at", row, col);
        
        // Efficiency? what's that?

        // check above
        let visibleFromAbove = 0;
        for(let i = row-1; i >= 0; i--) { // start one row above and move up
            const checkTree = grid[i][col];
            if(checkTree >= tree) {
                visibleFromAbove++;
                break;
            }
            visibleFromAbove++
        }
        
        // check below
        let visibleFromBelow = 0;
        for (let i = row + 1; i < grid.length; i++) { // work downwards
            const checkTree = grid[i][col];
            if (checkTree >= tree) {
                visibleFromBelow++;
                break;
            }
            visibleFromBelow++
        }

        // check left
        let visibleFromLeft = 0;
        for (let i = col-1; i >= 0; i--) { // work leftwards
            const checkTree = grid[row][i];
            if (checkTree >= tree) {
                visibleFromLeft++;
                break;
            }
            visibleFromLeft++
        }

        // check right
        let visibleFromRight = 0;
        for (let i = col + 1; i < grid[row].length; i++) { // work rightwards
            const checkTree = grid[row][i];
            if (checkTree >= tree) {
                visibleFromRight++;
                break;
            }
            visibleFromRight++
        }


        const score = visibleFromAbove * visibleFromLeft * visibleFromBelow * visibleFromRight;

        console.log("   above", visibleFromAbove, "below", visibleFromBelow, "left", visibleFromLeft, "right", visibleFromRight, "for a score of", score);

        scores.push(score);
    }

}

const sortedScores = scores.sort((a, b) => a - b).reverse();
console.log(sortedScores[0]);
