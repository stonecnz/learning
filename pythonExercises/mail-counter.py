# Request the name of the file
fname = input('Enter the file name: ')

# Try opening the file, but reject and exit if the user's input doesn't match a file
try:
    fhand = open(fname)
except:
    print('File cannot be opened:', fname)
    exit()

# Init the running total and the count
emails = dict()
days = []

# Find the interesting lines, split into words, add the email address to a list
for line in fhand:
    if line.startswith('From'):
        words = line.split()
        
        if len(words) < 3: continue

        days.append(words[2])

        for day in days:
            emails[day] = emails.get(day, 0) + 1
        
orderedDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

# print the output]
for day in orderedDays:
    print('There were ', emails[day], ' emails on ', day, ' in', fname)
