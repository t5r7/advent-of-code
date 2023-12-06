import re, time
from common import *

def part1():
	lines = getDayInput(6, 1)
	
	times = re.compile('\d+').findall(lines[0])
	dists = re.compile('\d+').findall(lines[1])
	
	waysToWin = []
	
	for i in range(0, len(times)):
		raceLength = int(times[i])
		raceBestDist = int(dists[i])
		raceWaysToWin = 0
		
		# try every button hold duration
		# b = button duration
		for b in range(1, raceLength):
			distance = 0

			for _ in range(0, raceLength - b):
				distance += b # b is also our speed

			if distance > raceBestDist:
				raceWaysToWin += 1

			# print(f"race length: {raceLength}, best distance: {raceBestDist} - button {b}ms = distance {distance}")

		waysToWin.append(raceWaysToWin)
		# print(f"{waysToWin} ways to win race {i + 1}")

	# doing this way is easy and means we don't have to import anything else
	product = 1
	for n in waysToWin:
		product *= n

	return product


def part2():
	lines = getDayInput(6, 2)

	times = re.compile('\d+').findall(lines[0])
	dists = re.compile('\d+').findall(lines[1])

	raceLength = int("".join(times))
	raceBestDist = int("".join(dists))

	raceWaysToWin = 0

	quarter = raceLength // 4
	half = raceLength // 2
	threeQuarters = raceLength // 4 * 3

	# try every button hold duration
	# b = button duration
	for b in range(1, raceLength):
		distance = b * (raceLength - b) # why didn't i think of this for part one??

		if distance > raceBestDist:
			raceWaysToWin += 1

		# i expected this to take longer...
		if b == quarter:
			print(f"25% done in {round(time.time() - startTime, 2)} seconds")
		if b == half:
			print(f"50% done in {round(time.time() - startTime, 2)} seconds")
		if b == threeQuarters:
			print(f"75% done in {round(time.time() - startTime, 2)} seconds")

	return raceWaysToWin


startTime = time.time()
print(f"Part 1: {part1()}")
print(f"Time: {round(time.time() - startTime, 2)} seconds")

startTime = time.time()
print(f"Part 2: {part2()}")
print(f"Time: {round(time.time() - startTime, 2)} seconds")