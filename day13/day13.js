const readFileSync = require("fs").readFileSync;
const input = readFileSync("input-test.txt", { encoding: "utf8", flag: "r" });

let group = [];
let pairIndex = 1;
let inOrderIndexes = [];

for(const line of input.split("\n")) {
	if(!line) {
		group = [];
		continue;
	}

	group.push(line);

	if(group.length == 2) {
		if (!group[0].startsWith("[") || !group[1].startsWith("[")) continue;

		const left = eval(group[0]);
		const right = eval(group[1]);
	
		if (checkOrder(left, right)) {
			inOrderIndexes.push(pairIndex);
		}
		
		pairIndex++;
	}
}

console.log(inOrderIndexes);

function checkOrder(left, right) {
	// console.log(left, right);

	const largest = Math.max(left.length, right.length);

	for (let i = 0; i < largest; i++) {
		const firstItem = left[i];
		const secondItem = right[i];


		if (!firstItem) return true;
		if (!secondItem) return false;

		if (typeof (firstItem) === 'number' && typeof (secondItem) === 'number') {
			if (firstItem > secondItem) return false;
			if (secondItem < firstItem) return true;
		}

		if (!Array.isArray(firstItem)) return checkOrder([firstItem], secondItem);
		if (!Array.isArray(secondItem)) return checkOrder(firstItem, [secondItem]);

		const knowsOrder = checkOrder(firstItem, secondItem);
		if (knowsOrder !== undefined) return knowsOrder;
	}
}