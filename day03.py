from common import *

def part1():
	lines = getDayInput(3, 1)

	grid = []
	partNumbers = []

	for line in lines:
		line = line.replace(".", ' ')
		grid.append(list(line))

	for row in range(0, len(grid)):
		for col in range(0, len(grid[row])):
			thisSpot = grid[row][col]

			# ignore things that aren't numbers
			if not thisSpot.isdigit():
				continue
			
			# if we're here, we have a number in this spot
			thisNum = "" # because we might have multi-digit numbers
			numLength = 0

			# do we have a multi-digit number?
			for i in range(col, len(grid[row])):
				if grid[row][i].isdigit():
					thisNum += f"{grid[row][i]}"
					grid[row][i] = ' ' # wipe number so we don't see it again

					numLength += 1
				else:
					break

			# print(f"Found {thisNum} at ({row}, {col}) - {numLength} long")

			adjacent = []

			# check adjacent spaces, including diagonals
			for x in range(row-1, row+2):
				for y in range(col-1, col+numLength+1):
					if x < 0 or y < 0: continue
					if x >= len(grid) or y >= len(grid[row]): continue

					adjacent.append(grid[x][y])

					
			# remove empty spots from adjacent
			adjacent = [x for x in adjacent if x != ' ']

			# if we have anything left in the adjacent list (symbols),
			# we have found a part number!
			if len(adjacent) > 0: partNumbers.append(int(thisNum))

	return sum(partNumbers)


def part2():
	lines = getDayInput(3, 2)

	grid = []
	gearRatios = []

	for line in lines:
		line = line.replace(".", ' ')
		grid.append(list(line))

	for row in range(0, len(grid)):
		for col in range(0, len(grid[row])):
			thisSpot = grid[row][col]
			
			# ignore non-asterisks
			if thisSpot != '*': continue

			grid[row][col] = ' ' # wipe asterisk so we don't see it again

			surroundingRatios = []

			# check adjacent spaces around the asterisk
			for x in range(row-1, row+2):
				for y in range(col-1, col+2):
					if x < 0 or y < 0: continue
					if x >= len(grid) or y >= len(grid[row]): continue

					# skip non-numbers
					thisSpot = grid[x][y]
					if not thisSpot.isdigit(): continue

					# we need to see if we have a multi-digit number
					thisNum = ""
					thisRow = grid[x]
					
					# check before our number
					for i in range(y-1, -1, -1):
						if thisRow[i].isdigit():
							thisNum += f"{thisRow[i]}"
							thisRow[i] = ' '
						else:
							break

					# reverse the numbers before
					thisNum = thisNum[::-1]
					
					# check after our number
					for i in range(y, len(thisRow)):
						if thisRow[i].isdigit():
							thisNum += f"{thisRow[i]}"
							thisRow[i] = ' '
						else:
							break
					
					surroundingRatios.append(int(thisNum))

			if len(surroundingRatios) == 2:
				gearRatios.append(surroundingRatios[0] * surroundingRatios[1])

	return sum(gearRatios)

print(f"Part 1: {part1()}")
print(f"Part 2: {part2()}")
