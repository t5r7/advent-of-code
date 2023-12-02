from common import *

def onlyDigits(string):
	return "".join(c for c in string if c.isdigit())

def onlyAlpha(string):
	return "".join(c for c in string if c.isalpha())

def part1():
	lines = getDayInput(2, 1)

	# amounts
	RED = 12
	GREEN = 13
	BLUE = 14

	possibleGameIDs = []

	for game in lines:
		splitLine = game.split(":")

		gameID = onlyDigits(splitLine[0])
		gameID = int(gameID)

		possible = True

		sets = splitLine[1]
		plays = sets.split(";")
		
		for play in plays:
			bags = play.split(",")
			
			for bag in bags:
				colour = onlyAlpha(bag)
				amount = int(onlyDigits(bag))

				if colour == "red" and amount > RED:
					possible = False
				elif colour == "green" and amount > GREEN:
					possible = False
				elif colour == "blue" and amount > BLUE:
					possible = False
				else:
					pass # possible!
				
		if possible:
				possibleGameIDs.append(gameID)
			
	return sum(possibleGameIDs)

def part2():
	lines = getDayInput(2, 2)

	gamePowers = []

	for game in lines:
		splitLine = game.split(":")

		gameID = onlyDigits(splitLine[0])
		gameID = int(gameID)

		required = {
			"red": 0,
			"green": 0,
			"blue": 0
		}

		sets = splitLine[1]
		plays = sets.split(";")
		
		for play in plays:
			bags = play.split(",")

			for bag in bags:
				colour = onlyAlpha(bag)
				amount = int(onlyDigits(bag))

				if required[colour] >= amount:
					pass # we have enough of this colour for this play
				else:
					required[colour] = amount # we need more of colour for the play!

		gamePower = required["red"] * required["green"] * required["blue"]
		gamePowers.append(gamePower)

	return sum(gamePowers)

print(f"Part 1: {part1()}")
print(f"Part 2: {part2()}")
