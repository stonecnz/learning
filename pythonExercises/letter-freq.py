import string # for the needed library

fname = input('Enter the file name:') # get the file

try: # tries to open the file and exits the program if the file doesn't exist
    fhand = open(fname)
except:
    print('This file could not be found.')
    exit()

lettersFreq = dict() # letters dict to store the letters and frequency

for line in fhand:
    line = line.rstrip() # removes the right side whitespace
    line = line.translate(line.maketrans('', '', string.punctuation)) # removes punctuation
    line = line.lower() # turns ever line into lower case

    words = line.split() # splits each line into words

    if len(words) == 0 : continue # guardian against empty lines

    for word in words: # iterate across the words
        for letter in word: # to iterate across a string one letter at a time, you don't need to split!
            lettersFreq[letter] = lettersFreq.get(letter, 0) + 1

lst = list()
for key, val in list(lettersFreq.items()):
    lst.append((val, key))

lst.sort(reverse=True)

for key, val in lst[:10]:
    print(val, key)





