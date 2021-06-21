# Request the name of the file
fname = input('Enter the file name: ')

# Try opening the file, but reject and exit if the user's input doesn't match a file
try:
    fhand = open(fname)
except:
    if fname == "na na boo boo":
        print("NA NA BOO BOO TO YOU - You have been punk'd!")
        exit()
    print('File cannot be opened:', fname)
    exit()

# Init the running total and the count
emails = []

# Find the interesting lines, split into words, add the email address to a list
for line in fhand:
    if line.startswith('From:'):
        words = line.split()
        emails.append(words[1])

# print the output
for email in emails:
    print(email)
print('There were ', len(emails), ' emails in', fname)
