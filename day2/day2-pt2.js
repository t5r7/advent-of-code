import { readFileSync } from "node:fs";

// Read Input file
const input = readFileSync("input.txt", { encoding: "utf8", flag: "r" });


let totalPoints = 0;

for (const line of input.split("\n")) {
    if (!line) continue; // ignore blank lines

    let pointsThisTime = 0; // points from this game
    let state = null; // win/loss/draw, for adding right # of points in each game
    let needTo = null; // win/loss/draw, only for logging later

    const theirPlay = line.split(" ")[0].toLowerCase();
    let myPlay = line.split(" ")[1].toLowerCase();

    // this will change our shape depending on the goal of this game
    switch (myPlay) {
        case "x": // we need to lose
            needTo = "lose";
            if (theirPlay == "a") myPlay = "z"; // they chose rock - to lose we need to pick scissors
            if (theirPlay == "b") myPlay = "x"; // they chose paper - to lose we need to pick rock
            if (theirPlay == "c") myPlay = "y"; // they chose scissors - to lose we need to pick paper
            break;
        case "y": // we need to draw
            needTo = "draw";
            if (theirPlay == "a") myPlay = "x"; // they chose rock - to draw we need to pick rock
            if (theirPlay == "b") myPlay = "y"; // they chose paper - to draw we need to pick paper
            if (theirPlay == "c") myPlay = "z"; // they chose scissors - to draw we need to pick scissors
            break;
        case "z": // we need to win
            needTo = "win";
            if (theirPlay == "a") myPlay = "y"; // they chose rock - to win we need to pick paper
            if (theirPlay == "b") myPlay = "z"; // they chose paper - to win we need to pick scissors
            if (theirPlay == "c") myPlay = "x"; // they chose scissors - to win we need to pick rock
            break;
    }

    // do as part one now we've changed our shape
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

    console.log(`a ${state} for us (we needed to ${needTo})! ${pointsThisTime} from this game (${theirPlay} vs ${myPlay})`);

    totalPoints += pointsThisTime;
}

console.log(totalPoints);