import time
from functools import cmp_to_key
from common import *

def findHandType(cards):
	# this is very messy and i already don't remember exactly how it works
	# but it seems to work? so let's not touch it

	if len(set(cards)) == 1:
		# five of a kind - if all 5 have same label - returns 7
		return 7

	if len(set(cards)) == 2:
		for card in set(cards):
			if cards.count(card) == 4:
				# four of a kind - if 4 have same label, one different - returns 6
				return 6
		# full house - 3 of one label, 2 of another - returns 5
		return 5

	if len(set(cards)) == 3:
		for card in set(cards):
			if cards.count(card) == 3:
				# three of a kind - 3 of one label, 2 others are different - returns 4
				return 4
		# two pair - 2 of one label, 2 of another, 1 different - returns 3
		return 3

	if len(set(cards)) == 4:
		# one pair - 2 of one label, 3 others are different - returns 2
		return 2

	if len(set(cards)) == 5:
		# high card - all 5 cards are different - returns 1
		return 1
	
	# If none of the above conditions are met, return 0
	return 0


# with jokers, they can be any other card, so we need to find the best hand
# eg: QQQJA would usually be a 3 of a kind, but with the joker it's a 4 of a kind
def findHandTypeWithJokers(cards):
	jokers = cards.count(1) # 1 is the joker value

	if jokers == 0:
		# no jokers, just find the hand type normally
		return findHandType(cards)
	
	# find the most common card
	# this solution came from reddit:
	# https://www.reddit.com/r/adventofcode/comments/18cpk4f/2023_day_7_part_2_poker_logic_with_wildcards_if/
	# without this, i think i would've been here forever
	# (my other solution was to brute force every possible hand)
	mostCommon = 0
	mostCommonCount = 0
	for card in set(cards):
		if card == 1: continue # skip jokers

		if cards.count(card) > mostCommonCount:
			mostCommon = card
			mostCommonCount = cards.count(card)

	# replace the jokers with the most common card
	newCards = cards.copy()

	for i in range(0, 5):
		if newCards[i] == 1:
			newCards[i] = mostCommon

	# now find the hand type
	return findHandType(newCards)


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

		hands.append({
			"cards": cards,
			"bid": int(hand.split(" ")[1]),
			"handType": findHandTypeWithJokers(cards)
		})

	sortedHands = sorted(hands, key=cmp_to_key(findStrongerHand), reverse=True)

	total = 0
	for i in range(len(sortedHands)):
		# print(f"{i + 1}: {sortedHands[i]}")
		total += sortedHands[i]["bid"] * (i + 1)

	return total


startTime = time.time()
print(f"Part 1: {part1()}")
print(f"Time: {round(time.time() - startTime, 2)} seconds")

startTime = time.time()
print(f"Part 2: {part2()}")
print(f"Time: {round(time.time() - startTime, 2)} seconds")