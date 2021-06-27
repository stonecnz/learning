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
addy = []

# Find the interesting lines, split into words, add the email address to a list
for line in fhand:
    if line.startswith('From'):
        words = line.split()
        
        if len(words) < 2: continue

        addy.append(words[1])

        for add in addy:
            emails[add] = emails.get(add, 0) + 1

lst = list()
for key, val in list(emails.items()):
    lst.append((val, key))

lst.sort(reverse=True)

for key, val in lst[:1]:
    print('The most emails were sent by', val, '\nThey sent', key, 'emails')