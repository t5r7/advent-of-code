import time
from functools import cmp_to_key
from common import *

# five of a kind - if all 5 have same label
# four of a kind - if 4 have same label, one different
# full house - 3 of one label, 2 of another
# three of a kind - 3 of one label, 2 others are different
# two pair - 2 of one label, 2 of another, 1 different
# one pair - 2 of one label, 3 others are different
# high card - all 5 cards are different
def findHandType(cards):
	# five of a kind
	if len(set(cards)) == 1:
		return 7

	# four of a kind
	if len(set(cards)) == 2:
		for card in set(cards):
			if cards.count(card) == 4:
				return 6
		return 5

	# three of a kind
	if len(set(cards)) == 3:
		for card in set(cards):
			if cards.count(card) == 3:
				return 4
		return 3

	if len(set(cards)) == 4:
		return 2

	# high card
	if len(set(cards)) == 5:
		return 1
	
	return 0


def findStrongerHand(hand1, hand2):
	if hand1["handType"] > hand2["handType"]:
		return -1
	elif hand1["handType"] < hand2["handType"]:
		return 1
	else:
		# hand types are equal, check for which has the higher card
		hand1Cards = hand1["cards"]
		hand2Cards = hand2["cards"]

		for i in range(5):
			if hand1Cards[i] > hand2Cards[i]:
				return -1
			elif hand1Cards[i] < hand2Cards[i]:
				return 1

		return 0


# for pt2 - we can replace "0" (joker) with any card to make a better hand
def findBestWithJokers(cards):
	bestHand = 0
	bestCards = cards.copy()

	for i in range(5):
		c = cards[i]

		if c == 1:
			# we have a joker, let's see what happens if we replace it with each card
			# including keeping it as a joker
			for j in range(14, 1, -1):
				newCards = bestCards.copy()
				newCards[i] = j

				handType = findHandType(newCards)
				if handType >= bestHand:
					bestHand = handType
					bestCards = newCards

	print(f"{cards} ({findHandType(cards)}) -> {bestCards} ({findHandType(bestCards)})")
	return bestCards


def part1():
	lines = getDayInput(7, 1)

	hands = []
	for hand in lines:
		cards = list(hand.split(" ")[0])

		# replace letters with numbers
		# and make sure cards are ints
		for i in range(len(cards)):
			if cards[i] == "T":
				cards[i] = 10
			elif cards[i] == "J":
				cards[i] = 11
			elif cards[i] == "Q":
				cards[i] = 12
			elif cards[i] == "K":
				cards[i] = 13
			elif cards[i] == "A":
				cards[i] = 14
			else:
				cards[i] = int(cards[i])

		hands.append({
			"cards": cards,
			"bid": int(hand.split(" ")[1]),
			"handType": findHandType(cards)
		})

	sortedHands = sorted(hands, key=cmp_to_key(findStrongerHand), reverse=True)

	total = 0
	for i in range(len(sortedHands)):
		# print(f"{i + 1}: {sortedHands[i]}")
		total += sortedHands[i]["bid"] * (i + 1)

	return total


def part2():
	lines = getDayInput(7, 2)
	# part 2 test from reddit:
	# https://www.reddit.com/r/adventofcode/comments/18cr4xr/2023_day_7_better_example_input_not_a_spoiler/
	# expected output: Part 1: 6592, Part 2: 6839

	hands = []
	for hand in lines:
		cards = list(hand.split(" ")[0])

		# replace letters with numbers
		# and make sure cards are ints
		for i in range(len(cards)):
			if cards[i] == "J":
				cards[i] = 1
			elif cards[i] == "T":
				cards[i] = 10
			elif cards[i] == "Q":
				cards[i] = 11
			elif cards[i] == "K":
				cards[i] = 12
			elif cards[i] == "A":
				cards[i] = 13
			else:
				cards[i] = int(cards[i])

		cardsWithJoker = findBestWithJokers(cards)

		hands.append({
			"cards": cards,
			"cardsWithJoker": cardsWithJoker,
			"bid": int(hand.split(" ")[1]),
			"handType": findHandType(cardsWithJoker)
		})

	sortedHands = sorted(hands, key=cmp_to_key(findStrongerHand), reverse=True)

	total = 0
	for i in range(len(sortedHands)):
		print(f"{i + 1}: {sortedHands[i]}")
		total += sortedHands[i]["bid"] * (i + 1)

	return total


startTime = time.time()
print(f"Part 1: {part1()}")
print(f"Time: {round(time.time() - startTime, 2)} seconds")

startTime = time.time()
print(f"Part 2: {part2()}")
print(f"Time: {round(time.time() - startTime, 2)} seconds")