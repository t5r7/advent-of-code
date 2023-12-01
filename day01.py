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
		chars = list(line)
		
		# check for any spelled out numbers, once for each char in the list)
		for _ in range(0, len(chars)):
			for num in NUMBERS: # check every spelled-out number
				charString = "".join(chars)

				if num in charString:
					# we've found a number, where was it in the line?
					index = charString.index(num)
					
					# what digit is it?
					digit = str(NUMBERS.index(num) + 1)

					# replace *second letter* of number with digit
					# cannot do the first letter because of overlapping letters;
					# eg: nineight, twone, etc (fuck this)
					chars[index + 1] = digit

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