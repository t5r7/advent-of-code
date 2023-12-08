import time, re
from common import *


def part1():
	lines = getDayInput(8, 1)

	directions = list(lines.pop(0))

	nodes = []

	for node in lines:
		split = re.compile("\w{3}").findall(node)

		nodes.append({
			"name": split[0],
			"left": split[1],
			"right": split[2]
		})

	currentNode = next(n for n in nodes if n["name"] == "AAA")

	dirAmount = len(directions)
	dirIndex = 0
	steps = 0
	
	while currentNode["name"] != "ZZZ":
		if dirIndex >= dirAmount:
			dirIndex = 0

		# print(dirIndex, dirAmount)

		left = currentNode["left"]
		right = currentNode["right"]

		if directions[dirIndex] == "L":
			currentNode = next(n for n in nodes if n["name"] == left)
		elif directions[dirIndex] == "R":
			currentNode = next(n for n in nodes if n["name"] == right)

		dirIndex += 1
		steps += 1

	return steps



startTime = time.time()
print(f"Part 1: {part1()}")
print(f"Time: {round(time.time() - startTime, 2)} seconds")

# startTime = time.time()
# print(f"Part 2: {part2()}")
# print(f"Time: {round(time.time() - startTime, 2)} seconds")
