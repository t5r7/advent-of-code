from common import *

def part_one():
	safe_count = 0

	for line in get_lines(2, example=False):
		# skip blanks
		if line == '\n':
			continue

		line_nums = line.split(' ')
		line_is_safe = True # assume safe until proven otherwise
		seen_pos_diff = False
		seen_neg_diff = False

		print(line_nums)

		for i in range(len(line_nums) - 1):
			diff = int(line_nums[i]) - int(line_nums[i + 1])
			# print(f"{line_nums[i]} - {line_nums[i + 1]} = {diff}")

			# if diff is 0, not safe
			if diff == 0:
				# print("not safe - diff is 0")
				line_is_safe = False
				break

			if diff > 0:
				seen_neg_diff = True
			elif diff < 0:
				seen_pos_diff = True

			# if we've seen both a positive and negative diff, this line is not safe
			if seen_pos_diff and seen_neg_diff:
				# print("not safe - both pos and neg diffs")
				line_is_safe = False
				break

			# now convert diff to absolute value, we no longer care about +/-
			diff = abs(diff)

			# if the diff is < 1 or > 3, not safe
			if diff < 1 or diff > 3:
				# print("not safe - diff < 1 or > 3")
				line_is_safe = False
				break
		
		if line_is_safe:
			safe_count += 1

	return safe_count


def part_two():
	safe_count = 0

	for line in get_lines(2, example=False):
		# skip blanks
		if line == '\n':
			continue

		line_nums = line.split(' ')
		if(part_two_check_levels(line_nums)):
			safe_count += 1
		else:
			# see if removing any number makes it safe
			for i in range(len(line_nums)):
				# there are probably better ways to do this than brute force
				new_line_nums = line_nums.copy()
				new_line_nums.pop(i)
				if(part_two_check_levels(new_line_nums)):
					safe_count += 1
					break

	return safe_count

def part_two_check_levels(levels):
	line_is_safe = True  # assume safe until proven otherwise
	seen_pos_diff = False
	seen_neg_diff = False

	for i in range(len(levels) - 1):
		diff = int(levels[i]) - int(levels[i + 1])
		# print(f"{line_nums[i]} - {line_nums[i + 1]} = {diff}")

		# if diff is 0, not safe
		if diff == 0:
			# print("not safe - diff is 0")
			line_is_safe = False
			break

		if diff > 0:
			seen_neg_diff = True
		elif diff < 0:
			seen_pos_diff = True

		# if we've seen both a positive and negative diff, this line is not safe
		if seen_pos_diff and seen_neg_diff:
			# print("not safe - both pos and neg diffs")
			line_is_safe = False
			break

		# now convert diff to absolute value, we no longer care about +/-
		diff = abs(diff)

		# if the diff is < 1 or > 3, not safe
		if diff < 1 or diff > 3:
			# print("not safe - diff < 1 or > 3")
			line_is_safe = False
			break

	return line_is_safe

print(f"part one: {part_one()}")
print(f"part two: {part_two()}")
