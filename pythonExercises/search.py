# Request the name of the file
fname = input('Enter the file name: ')

# Try opening the file, but reject and exit if the user's input doesn't match a file
try:
    fhand = open(fname)
except:
    print('File cannot be opened:', fname)
    exit()

# Init the running total and the count
total = 0
count = 0

# Find the interesting parts, extract the floating point number, and add to total and count
for line in fhand:
    if line.startswith('X-DSPAM-Confidence:'):
        index = line.find(":")
        interval = float(line[index+1:])
        total = total + interval
        count = count + 1

# print the output
print('The average spam confidence was', total/count, 'in', fname)
