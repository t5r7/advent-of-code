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

	steps = 0

	atZ = []
	for i in range(0, searcherCount):
		atZ.append(False)

	dirAmount = len(directions)
	dirIndex = 0

	# print(f"{searcherCount} ghosts")

	while set(atZ) != {True}:
		steps += 1

		if dirIndex >= dirAmount:
			dirIndex = 0

		# print(f"step {steps}: {directions[dirIndex]}")

		for i in range(0, searcherCount):
			# print(f"step {steps}: {i} is at {searchNodes[i]['name']}")

			left = searchNodes[i]["left"]
			right = searchNodes[i]["right"]

			if directions[dirIndex] == "L":
				searchNodes[i] = next(n for n in nodes if n["name"] == left)

				# print(f"step {steps}: {i} is is moving to {searchNodes[i]['name']}")

			elif directions[dirIndex] == "R":
				searchNodes[i] = next(n for n in nodes if n["name"] == right)

				# print(f"step {steps}: {i} is moving to {searchNodes[i]['name']}")

		for i in range(0, searcherCount):
			if searchNodes[i]["name"].endswith("Z"):
				# print(f"step {steps}: {i} is at a Z")
				atZ[i] = True
			else:
				atZ[i] = False

		dirIndex += 1
		
		print(f"step {steps}: {atZ}")


	return steps


startTime = time.time()
print(f"Part 1: {part1()}")
print(f"Time: {round(time.time() - startTime, 2)} seconds")

startTime = time.time()
pt2 = part2()
print(f"Part 2: {pt2}")
print(f"Time: {round(time.time() - startTime, 2)} seconds")
