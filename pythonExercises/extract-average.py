import re
fname = input('Enter file name: ')
fhand = open(fname)
numbers = list()
for line in fhand:
    line = line.rstrip()
    x = re.findall('\\S+ \\S+: (\\d+)', line)
    if len(x) > 0:
        numbers.append(float(x[0]))

print('Total: ', sum(numbers),'\nCount: ', len(numbers), '\nAverage: ', sum(numbers)/len(numbers))

