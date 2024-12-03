from common import *

def part_one():
	left_list = []
	right_list = []

	# create left and right lists
	for line in get_lines(1, example=False):
		# skip blank line
		if line == '\n':
			continue

		left, right = line.split('   ')

		left_list.append(int(left))
		right_list.append(int(right))
	
	# sort asc
	left_list.sort()
	right_list.sort()

	# find the differences
	total_dist = 0
	for i in range(len(left_list)):
		total_dist += abs(right_list[i] - left_list[i])

	return total_dist

def part_two():
	left_list = []
	right_list = []

	# create left and right lists
	for line in get_lines(1, example=False):
		# skip blank line
		if line == '\n':
			continue

		left, right = line.split('   ')

		left_list.append(int(left))
		right_list.append(int(right))

	# sort asc
	left_list.sort()
	right_list.sort()

	total_sim_score = 0
	# get "similarity score" for each number in left list
	for left_num in left_list:
		# how many times does it appear in the right list?
		count_in_right = right_list.count(left_num)
		total_sim_score += left_num * count_in_right

	return total_sim_score





print(f"part one: {part_one()}")
print(f"part two: {part_two()}")