from common import *

def part1():
	lines = getDayInput(4, 1)

	totalPoints = []

	for card in lines:
		# remove "card #: "
		card = card.split(": ")
		card.pop(0)

		card = "".join(card) # join the list back into a string

		halves = card.split("|")

		winningNums = halves[0].split(" ")
		ourNums = halves[1].split(" ")

		# remove empty things
		winningNums = [x for x in winningNums if x != ' ' and x != '']
		ourNums = [x for x in ourNums if x != ' ' and x != '']
		
		# testMatched = []

		matches = 0
		for num in winningNums:
			if num in ourNums:
				matches += 1
				# testMatched.append(num)

		if matches == 0:
			score = 0
		elif matches == 1:
			score = 1
		else:
			score = 1
			# double for each match
			for _ in range(0, matches-1):
				score = score * 2

		totalPoints.append(score)
		# print(winningNums, ourNums, testMatched, matches, score)

	return sum(totalPoints)

print(f"Part 1: {part1()}")
