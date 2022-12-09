const readFileSync = require("fs").readFileSync;

// Read Input file
const input = readFileSync("input.txt", { encoding: "utf8", flag: "r" });


let totalPoints = 0;

for (const line of input.split("\n")) {
    if (!line) continue; // ignore blank lines

    let pointsThisTime = 0; // points from this game

    const theirPlay = line.split(" ")[0].toLowerCase();
    const myPlay = line.split(" ")[1].toLowerCase();
    let state = null;

    // i'm sure there's a more mathematical way of doing this
    // perhaps by converting the rock/paper/scissors into numbers
    // but this is less to think about and there's not too much to manually write
    switch (myPlay) {
        case "x": // rock
            pointsThisTime += 1; // we get 1 point for choosing rock
            if (theirPlay == "a") state = "draw"; // they chose rock
            if (theirPlay == "b") state = "loss"; // they chose paper
            if (theirPlay == "c") state = "win"; // they chose scissors
            break;
        case "y": // paper
            pointsThisTime += 2; // we get 2 points for choosing paper
            if (theirPlay == "a") state = "win"; // they chose rock
            if (theirPlay == "b") state = "draw"; // they chose paper
            if (theirPlay == "c") state = "loss"; // they chose scissors
            break;
        case "z": // scissors
            pointsThisTime += 3; // we get 3 points for choosing scissors
            if (theirPlay == "a") state = "loss"; // they chose rock
            if (theirPlay == "b") state = "win"; // they chose paper
            if (theirPlay == "c") state = "draw"; // they chose scissors
            break;
    }

    switch (state) {
        case "win":
            pointsThisTime += 6;
            break;
        case "draw":
            pointsThisTime += 3;
            break;
        case "loss":
            pointsThisTime += 0;
            break;
    }

    console.log(`a ${state} for us! ${pointsThisTime} from this game (${theirPlay} vs ${myPlay})`);

    totalPoints += pointsThisTime;
}

console.log(totalPoints);