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
            atpos = add.find('@')
            domain = add[atpos+1:]
            emails[domain] = emails.get(domain, 0) + 1

for email in emails:
    print(email, ':', emails[email])

maxNum = 0
maxPerson = ""
for email in emails:
    if emails[email] > maxNum:
        maxNum = emails[email]
        maxPerson = email

print(maxPerson, "has sent the most messages in this file:", maxNum)