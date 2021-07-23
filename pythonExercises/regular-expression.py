import re

# Request the name of the file
fname = input('Enter the file name: ')

# Try opening the file, but reject and exit if the user's input doesn't match a file
try:
    fhand = open(fname)
except:
    print('File cannot be opened:', fname)
    exit()

# Init the emails dict
count = 0
regEx = input("Enter a regular expression: ")

print(regEx)

# Find the interesting lines, split into words, add the email address to a list
for line in fhand:
    line = line.rstrip()
    x = re.findall(regEx, line)
    if len(x) > 0: 
        count += 1

print(fname, 'had', count, 'lines that matched', regEx)