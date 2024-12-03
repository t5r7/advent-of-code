from re import findall, finditer
from common import *

def part_one():
	total = 0

	for line in get_lines(3, example=False):
		mult_rx = r'mul\(\d{1,3}\,\d{1,3}\)'
		found = finditer(mult_rx, line)

		for f in found:
			f = f.group()
			# print(f)
			nums = findall(r'\d+', f) # this seems inefficient...
			# print(f'{nums[0]} * {nums[1]} = {int(nums[0]) * int(nums[1])}')
			total += (int(nums[0]) * int(nums[1]))

	return total


print(f"part one: {part_one()}")