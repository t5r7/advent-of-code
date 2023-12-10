import time, re, math
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


def part2():
	lines = getDayInput(8, 2)

	directions = list(lines.pop(0))

	nodes = []

	for node in lines:
		split = re.compile("\w{3}").findall(node)

		nodes.append({
			"name": split[0],
			"left": split[1],
			"right": split[2]
		})

	searchNodes = [n for n in nodes if n["name"].endswith("A")]
	searcherCount = len(searchNodes)

	# find our first Z
	stepsToZ = []
	for i in range(0, searcherCount):
		stepsToZ.append(0)

	atZ = 0 # how many of our searchers have found their Z?

	dirAmount = len(directions)
	dirIndex = 0

	while atZ < searcherCount: # until all searchers have found their Z
		if dirIndex >= dirAmount: # wrap around the directions list
			dirIndex = 0

		# print(f"step {steps}: {directions[dirIndex]}")

		for i in range(0, searcherCount):
			if searchNodes[i] is None:
				continue

			stepsToZ[i] += 1
			# print(f"step {steps}: {i} is at {searchNodes[i]['name']}")

			left = searchNodes[i]["left"]
			right = searchNodes[i]["right"]

			if directions[dirIndex] == "L":
				searchNodes[i] = next(n for n in nodes if n["name"] == left)

			elif directions[dirIndex] == "R":
				searchNodes[i] = next(n for n in nodes if n["name"] == right)

			if searchNodes[i]["name"].endswith("Z"):
				atZ += 1
				searchNodes[i] = None

		dirIndex += 1
		
		# print(f"step {steps}: {atZ}")

	# find the LCM of all the steps to Z
	# i made the mistake of checking reddit before i'd finished this
	# and somehow this is the solution?? feels like cheating
	# i also don't like how this is more maths-y than code-y, isn't as fun :(
	# hey ho - my brute-force solution would've worked..... eventually >_>
	return math.lcm(*stepsToZ)

startTime = time.time()
print(f"Part 1: {part1()}")
print(f"Time: {round(time.time() - startTime, 2)} seconds")

startTime = time.time()
print(f"Part 2: {part2()}")
print(f"Time: {round(time.time() - startTime, 2)} seconds")
