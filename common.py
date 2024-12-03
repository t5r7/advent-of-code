import os

def get_lines(day, example=False):
	day = str(day).zfill(2) # zero pad
	
	if example:
		return open(os.path.join('inputs', f'day{day}-ex.txt')).readlines()
	return open(os.path.join('inputs', f'day{day}.txt')).readlines()