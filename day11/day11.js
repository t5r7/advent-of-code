const readFileSync = require("fs").readFileSync;
const input = readFileSync("input.txt", { encoding: "utf8", flag: "r" });

const ROUNDS = 10000; // 20 for part one, 10000 for part two

// i found this on the subreddit and i have no idea what it means even after reading the theory
// thanks j122j: https://www.reddit.com/r/adventofcode/comments/zifqmh/2022_day_11_solutions/izuniw9/
// and jake-gordon: https://github.com/jake-gordon/aoc/blob/main/2022/D11/Explanation.md
let thisIsBeyondMyMathsGrade = 1;

// monkey cage
let monkeys = [];

class Monkey {
	constructor(num, startingItems, operation, operand, divisor, ifTrue, ifFalse) {
		this.num = num;
		this.items = startingItems;
		this.operation = operation;
		this.operand = operand;
		this.divisor = divisor;
		this.ifTrue = ifTrue;
		this.ifFalse = ifFalse;
		this.inspected = 0;
	}

	giveItem(item) {
		this.items.push(item);
	}

	inspectItems() {
		// inspect each item, working backwards from the end of the array
		for (let i = this.items.length - 1; i >= 0; i--) {
			const item = this.items[i];

			const operand = parseInt((Number.isInteger(this.operand)) ? this.operand : item); // if the operand is "old" set it as the current worry level
			
			const worryLevelA = Math.floor(eval(`(${item} ${this.operation} ${operand})`));
			const worryLevel = worryLevelA % thisIsBeyondMyMathsGrade; // thank you subreddit

			if (worryLevel === Infinity) throw new Error(`uh oh: ${item} ${this.operation} ${operand} = ${worryLevelA} (mod ${thisIsBeyondMyMathsGrade} = ${worryLevel})`);

			if (worryLevel % parseInt(this.divisor) === 0) {
				const recipient = monkeys[parseInt(this.ifTrue)];
				recipient.giveItem(worryLevel);

			} else {
				const recipient = monkeys[parseInt(this.ifFalse)];
				recipient.giveItem(worryLevel);
			}

			// remove this item from the array
			this.items.splice(i, 1);


			this.inspected++;
		}
	}
}


// FIGURE OUT THE SILLY INPUT
for (const monkey of input.split("\n\n")) {
	const splitMonkey = monkey.split("\n");
	const num = parseInt(splitMonkey[0].replace(/[^0-9]/g, ""));
	const startingItems = splitMonkey[1].replace(/[^0-9,]/g, "").split(',');
	const operation = splitMonkey[2].charAt(23);
	const operand = parseInt(splitMonkey[2].replace(/[^0-9]/g, ""));
	const divisor = parseInt(splitMonkey[3].replace(/[^0-9]/g, ""));
	const ifTrue = parseInt(splitMonkey[4].replace(/[^0-9]/g, ""));
	const ifFalse = parseInt(splitMonkey[5].replace(/[^0-9]/g, ""));

	monkeys.push(new Monkey(num, startingItems, operation, operand, divisor, ifTrue, ifFalse));
}

thisIsBeyondMyMathsGrade = monkeys.reduce((a, b) => a * b.divisor, 1);

// do the rounds of inspecting items
for (let i = 0; i < ROUNDS; i++) {
	monkeys.forEach(m => m.inspectItems());
}

// get top two monkeys based on items inspected (thank you copilot ily)
const topMonkeys = monkeys.sort((a, b) => b.inspected - a.inspected).slice(0, 2);

const monkeyBusiness = topMonkeys[0].inspected * topMonkeys[1].inspected;
console.log(monkeyBusiness);