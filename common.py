import os

FOLDER = "inputs"

def getDayInput(day, test=False):
	"""
	Reads the input file for the given day and returns its contents as a list of strings.

	Parameters:
		- day (int): The day for which to read the input file.
		- test (bool): Whether to read the test input file for that day. Defaults to False.

	Returns:
		- A list of strings (the lines of the input fule)
	"""

	if test:
		fileName = f"day{str(day).zfill(2)}-test.txt"
	else:
		fileName = f"day{str(day).zfill(2)}.txt"

	filePath = os.path.join(FOLDER, fileName)

	with open(filePath, "r") as f:
		return f.read().splitlines()