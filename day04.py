from common import *

def getMatchCount(card):
	card = card.split(": ")
	card.pop(0)

	card = "".join(card) # join the list back into a string

	halves = card.split("|")

	winningNums = halves[0].split(" ")
	ourNums = halves[1].split(" ")

	# remove empty things
	winningNums = [x for x in winningNums if x != ' ' and x != '']
	ourNums = [x for x in ourNums if x != ' ' and x != '']
	
	matches = 0
	for num in winningNums:
		if num in ourNums:
			matches += 1

	return matches

def part1():
	lines = getDayInput(4, 1)

	totalPoints = []

	for card in lines:
		matches = getMatchCount(card)

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

def part2():
	lines = getDayInput(4, 2)
	scratchcards = []

	for card in lines:
		scratchcards.append({
			"matches": getMatchCount(card),
			"count": 1	
		})

	for i in range(0, len(scratchcards)):
		card = scratchcards[i]

		for _ in range(0, card["count"]):
			for j in range(i+1, i+1+card["matches"]):
				scratchcards[j]["count"] += 1

	total = 0
	for card in scratchcards:
		total += card["count"]

	return total

print(f"Part 1: {part1()}")
print(f"Part 2: {part2()}")
