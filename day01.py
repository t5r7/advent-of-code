from common import *

NUMBERS = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
				  
def part1():
	lines = getDayInput(1, 1)

	digits = []

	for line in lines:
		lineDigits = []

		for char in line:
			if char.isdigit():
				lineDigits.append(int(char))
			
		# "calibration value" of this line is the first and last digits, concatenated
		calibValue = int(f"{lineDigits[0]}{lineDigits[-1]}")

		digits.append(calibValue)

	return sum(digits)


def part2():
	lines = getDayInput(1, 2, False)

	digits = []

	for line in lines:		
		# print(f"\n{line}")
		chars = list(line)
		
		# check for any spelled out numbers, many times
		for _ in range(0, len(chars)*2):
			for i in range(len(NUMBERS)):
				if NUMBERS[i] in "".join(chars):
					# we've found a number, where was it?
					index = "".join(chars).index(NUMBERS[i])

					# print(f"found an {NUMBERS[i]} ({i+1}) at {index}")

					# replace second letter of number with digit
					# cannot do the first letter because of overlapping lettes;
					# eg: nineight, twone, etc (fuck this)
					chars[index+1] = str(i+1)

					# print(chars)

		
		# remove non-digits from the list
		lineDigits = []
		
		for char in chars:
			if char.isdigit():
				lineDigits.append(int(char))

		# print(lineDigits)

		# "calibration value" of this line is the first and last digits, concatenated
		calibValue = int(f"{lineDigits[0]}{lineDigits[-1]}")

		# print(calibValue)

		digits.append(calibValue)

	return sum(digits)


print(f"Part 1: {part1()}")
print(f"Part 2: {part2()}")