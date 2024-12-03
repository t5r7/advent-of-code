import re
from common import *

def part_one():
	total = 0

	for line in get_lines(3, example=False):
		mult_rx = r'mul\(\d{1,3}\,\d{1,3}\)'
		found = re.finditer(mult_rx, line)

		for f in found:
			mult_instruction = f.group()
			# print(f)
			nums = re.findall(r'\d+', mult_instruction)  # this seems inefficient...
			# print(f'{nums[0]} * {nums[1]} = {int(nums[0]) * int(nums[1])}')
			total += (int(nums[0]) * int(nums[1]))

	return total




def part_two():
	lines = get_lines(3, example=False)

	# concat all lines into one string
	memory = ''.join(lines)

	total = 0
	dont_ranges = []

	# mark out ranges that are in dont() "blocks"
	dont_rx = r'don\'t\(\)'
	dont_funcs = re.finditer(dont_rx, memory)

	for f in dont_funcs:
		current_pos = f.start()

		# print(f'found dont() at {current_pos}')

		# we need to find the next do() that comes after this don't()
		next_do = memory[current_pos:].find('do()')

		if next_do != -1:
			# if we found a do() after this dont()
			end_pos = next_do + current_pos
			# print(f'found do() at {end_pos}')
		else:
			# otherwise we're the last one
			end_pos = len(memory)

		dont_ranges.append((current_pos, end_pos))

	# print(dont_ranges)

	mult_rx = r'mul\(\d{1,3}\,\d{1,3}\)'
	instructions = re.finditer(mult_rx, memory)

	for f in instructions:
		mult_instruction = f.group()
		current_pos = f.start()

		# check if this instruction is in a dont() block
		in_dont = False
		for r in dont_ranges:
			if r[0] <= current_pos <= r[1]:
				in_dont = True
				break

		if in_dont:
			# print(f'found instruction in dont() block: {mult_instruction}')
			continue

		# print(f)
		nums = re.findall(r'\d+', mult_instruction)  # this seems inefficient...
		# print(f'{nums[0]} * {nums[1]} = {int(nums[0]) * int(nums[1])}')
		total += (int(nums[0]) * int(nums[1]))

	return total


print(f"part one: {part_one()}")
print(f"part two: {part_two()}")
