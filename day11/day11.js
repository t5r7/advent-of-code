const readFileSync = require("fs").readFileSync;

// Read Input file
const input = readFileSync("input.txt", { encoding: "utf8", flag: "r" });

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
			const worryLevel = Math.floor(eval(`(${item} ${this.operation} ${operand}) / 3`));

			if (worryLevel % parseInt(this.divisor) === 0) {
				const recipient = monkeys.find(m => m.num === parseInt(this.ifTrue));
				recipient.giveItem(worryLevel);

			} else {
				const recipient = monkeys.find(m => m.num === parseInt(this.ifFalse));
				recipient.giveItem(worryLevel);
			}

			// remove this item from the array
			this.items.splice(i, 1);

			this.inspected++;
		}
	}
}

// FIGURE OUT THE SILLY INPUT

let monkeys = [];

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

// do twenty rounds of inspecting items
for (let i = 0; i < 20; i++) {
	monkeys.forEach(m => m.inspectItems());
}

// get top two monkeys based on items inspected (thank you copilot ily)
const topMonkeys = monkeys.sort((a, b) => b.inspected - a.inspected).slice(0, 2);

const monkeyBusiness = topMonkeys[0].inspected * topMonkeys[1].inspected;
console.log("part one: ", monkeyBusiness);