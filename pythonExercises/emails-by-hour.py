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
emails = dict()
hours = []

# Find the interesting lines, split into words, add the email address to a list
for line in fhand:
    line = line.rstrip()
    x = re.findall('^From .* ([0-9][0-9]):', line)
    if len(x) > 0:
        hours.append(x)
        for hour in hours:
            emails[hour] = emails.get(hour, 0) + 1

# Turn the dict into a list of tuples and sort by count(hour)
lst = list() 
for key, val in list(emails.items()):
    lst.append((val, key))

lst.sort(reverse=True)

for key, val in lst[:1]: # print the time most emails were sent
    print('time:', val, '\nnumber of emails:', key)