import string

# Request the name of the file
fname = input('Enter the file name: ')

# Try opening the file, but reject and exit if the user's input doesn't match a file
try:
    fhand = open(fname)
except:
    print('File cannot be opened:', fname)
    exit()

# init the vocab list
vocab = dict()

# go through each line in the document
for line in fhand:

    # clean up words - get rid of punctuation or capitlisation and split into a list
    line = line.rstrip()
    line = line.translate(line.maketrans('', '', string.punctuation))
    line = line.lower()
    words = line.split()

    # guardian check to make sure there are actually words in the list
    if len(words) == 0: continue

    # go through each word in the list
    for word in words:

        # check that the word is in the vocab list or not and increment count, if not, then add.
        vocab[word] = vocab.get(word, 0) + 1

# set up a list for ordering the keys in the dictionary 
lst = list(vocab.keys())
lst.sort()

# for each of the ordered list, find the corresponding key in the dict and present the key and value
for key in lst:
    print(key, vocab[key])

