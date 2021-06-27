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
    if line.startswith('From'):
        words = line.split()
        
        if len(words) < 3: continue # remove the lines that don't contain times

        times = words[5] # create a variable with the time data
        time = times.split(':') # split the time data into a list of three elements

        hours.append(time[0]) # append the hour data into the hours list

        for hour in hours: # for each of the hours in the hours data add to the emails dict with a count
            emails[hour] = emails.get(hour, 0) + 1

# Turn the dict into a list of tuples and sort by count(hour)
lst = list() 
for key, val in list(emails.items()):
    lst.append((val, key))

lst.sort(reverse=True)

for key, val in lst[:1]: # print the time most emails were sent
    print('time:', val, '\nnumber of emails:', key)