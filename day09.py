import time
from common import *


def part1():
	lines = getDayInput(9, 1)

	extrapolatedValues = []

	for history in lines:
		values = [history.split(" ")]

		for i in range(0, len(values[0]), 1):
			values[0][i] = int(values[0][i])

		# work until we get to all diffs as 0
		while set(values[-1]) != {0}:
			diffList = []

			if len(values[-1]) == 1:
				# if there's only one value, the diff between itself and itself is 0
				# this only happened while i was using the (incorrect) absolute difference
				# but i am leaving it in because why not
				diffList.append(0)
			else:
				# otherwise, we need to work out the diff between each value
				for i in range(0, len(values[-1])-1, 1):			
					# for some reason, it isn't absolute diff, it's right number minus left number
					diffList.append(values[-1][i+1] - values[-1][i])

			values.append(diffList)

		# print(values)

		# add in the extrapolated values to the end of each row
		values[-1].append(0) # but add a 0 to the end of the last row first

		for i in range(len(values)-2, -1, -1): # for each iteration, excluding the last
			# get the diff from the last value of the row below
			diff = values[i+1][-1]
			extrapolated = values[i][-1] + diff
			values[i].append(extrapolated)

		# print(values)

		# get our top-most extrapolated value
		extrapolatedValues.append(values[0][-1])
		# print(extrapolatedValues)

	return sum(extrapolatedValues)


def part2():
	lines = getDayInput(9, 1)

	extrapolatedValues = []

	for history in lines:
		values = [history.split(" ")]

		for i in range(0, len(values[0]), 1):
			values[0][i] = int(values[0][i])

		# work until we get to all diffs as 0
		while set(values[-1]) != {0}:
			diffList = []

			if len(values[-1]) == 1:
				# if there's only one value, the diff between itself and itself is 0
				# this only happened while i was using the (incorrect) absolute difference
				# but i am leaving it in because why not
				diffList.append(0)
			else:
				# otherwise, we need to work out the diff between each value
				for i in range(0, len(values[-1])-1, 1):
					# for some reason, it isn't absolute diff, it's right number minus left number
					diffList.append(values[-1][i+1] - values[-1][i])

			values.append(diffList)

		# print(values)

		# add in the extrapolated values to the end of each row
		values[-1].insert(0, 0) # but add a 0 to the beginning of the last row first

		for i in range(len(values)-2, -1, -1):  # for each iteration, excluding the last
			# get the diff from the first value of the row below
			diff = values[i+1][0]
			extrapolated = values[i][0] - diff
			values[i].insert(0, extrapolated)

		# print(values)

		# get our top-most extrapolated value
		extrapolatedValues.append(values[0][0])
		# print(extrapolatedValues)

	return sum(extrapolatedValues)

startTime = time.time()
print(f"Part 1: {part1()}")
print(f"Time: {round(time.time() - startTime, 2)} seconds")

startTime = time.time()
print(f"Part 2: {part2()}")
print(f"Time: {round(time.time() - startTime, 2)} seconds")
