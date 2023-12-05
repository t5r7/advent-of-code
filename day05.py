import re
from common import *


def part1():
	lines = getDayInput(5, 1, False, True)

	seeds = re.compile('\d+').findall(lines[0]) # first use of regex this year!
	lines.pop(0) # we've now looked at our seeds

	# mattie did this what the fuck is a map
	seeds = list(map(lambda i: int(i), seeds))

	lovelyLittleDatabase = {}
	locations = []

	maps = "\n".join(lines).split("\n\n")

	for m in maps: # for each map section
		thisMap = m.split("\n")
		title = None

		for line in thisMap:
			if line.endswith(":"):
				title = line
				lovelyLittleDatabase[title] = []
				continue

			numbers = line.split(" ")
			if title:
				lovelyLittleDatabase[title].append(numbers)
	
	for seed in seeds:
		for m in lovelyLittleDatabase:
			numberList = lovelyLittleDatabase[m]
			
			for setOfNumbers in numberList:
				dest, source, length = setOfNumbers[0], setOfNumbers[1], setOfNumbers[2]
				dest, source, length = int(dest), int(source), int(length)

				if seed >= source and seed <= source + length:
					seed = dest + (seed - source)
					# print(seed)
					break

		# print("new seed time")
		locations.append(seed)

	# find lowest location\
	return min(locations)


def part2():
	lines = getDayInput(5, 2, False, True)

	# first use of regex this year!
	seedsRanges = re.compile('\d+').findall(lines[0])
	lines.pop(0)  # we've now looked at our seeds

	# mattie did this what the fuck is a map
	seedsRanges = list(map(lambda i: int(i), seedsRanges))

	lovelyLittleDatabase = {}
	locations = []

	maps = "\n".join(lines).split("\n\n")

	for m in maps:  # for each map section
		thisMap = m.split("\n")
		title = None

		for line in thisMap:
			if line.endswith(":"):
				title = line
				lovelyLittleDatabase[title] = []
				continue

			numbers = line.split(" ")
			if title:
				lovelyLittleDatabase[title].append(numbers)

	for i in range(0, len(seedsRanges), 2):
		for seed in range(seedsRanges[i], seedsRanges[i] + seedsRanges[i + 1]):
			for m in lovelyLittleDatabase:
				numberList = lovelyLittleDatabase[m]

				for setOfNumbers in numberList:
					dest, source, length = setOfNumbers[0], setOfNumbers[1], setOfNumbers[2]
					dest, source, length = int(dest), int(source), int(length)

					if seed >= source and seed <= source + length:
						seed = dest + (seed - source)
						# print(seed)
						break

			# print("new seed time")
			locations.append(seed)

	# find lowest location
	return min(locations)

print(f"Part 1: {part1()}")
print(f"Part 2: {part2()}")
