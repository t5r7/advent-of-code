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
	endingInZ = 0

	steps = 0

	dirAmount = len(directions)
	dirIndex = 0

	# print(f"{searcherCount} ghosts")

	while endingInZ < searcherCount:
		if dirIndex >= dirAmount:
			dirIndex = 0

		direction = directions[dirIndex]
		# print(f"going {direction}")

		for i in range(0, searcherCount):
			steps += 1

			node = searchNodes[i]
			
			if node is None:
				# print(f"searcher {i} is done, no need to step")
				continue
			else:
				# print(f"searcher {i} starting at {searchNodes[i]['name']}")
				pass
			
			left = node["left"]
			right = node["right"]

			if direction == "L":
				searchNodes[i] = next(n for n in nodes if n["name"] == left)
				# print(f"searcher {i} is now at {searchNodes[i]['name']}")
			elif direction == "R":
				searchNodes[i] = next(n for n in nodes if n["name"] == right)
				# print(f"searcher {i} is now at {searchNodes[i]['name']}")

			
			if searchNodes[i]["name"].endswith("Z"):
				# print(f"searcher {i} found z")
				endingInZ += 1
				searchNodes[i] = None

		dirIndex += 1

	return steps


startTime = time.time()
print(f"Part 1: {part1()}")
print(f"Time: {round(time.time() - startTime, 2)} seconds")

startTime = time.time()
pt2 = part2()
print(f"Part 2: {pt2}", end="")
if int(pt2) <= 133194:
	print(" is wrong")
print(f"Time: {round(time.time() - startTime, 2)} seconds")
