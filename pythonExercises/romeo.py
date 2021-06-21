# Request the name of the file
fname = input('Enter the file name: ')

# Try opening the file, but reject and exit if the user's input doesn't match a file
try:
    fhand = open(fname)
except:
    print('File cannot be opened:', fname)
    exit()

# init the vocab list
vocab = []

# go through each line in the document
for line in fhand:

    # split each line into a list of words
    words = line.split()

    # guardian check to make sure there are actually words in the list
    if len(words) == 0: continue

    # go through each word in the list
    for word in words:

        #remove capitalisation
        lowerWord = word.lower()

        # remove punctuation
        if lowerWord.endswith("'s"):
            cleanWord = lowerWord[:-2]
        elif lowerWord.endswith('.'):
            cleanWord = lowerWord[:-1]
        elif lowerWord.endswith(','):
            cleanWord = lowerWord[:-1]
        else:    
            cleanWord = lowerWord

        # check that the word is in the vocab list or not
        if cleanWord not in vocab:

            # if not in the vocab list, then add it
            vocab.append(cleanWord)

# sort the list
vocab.sort()

print(vocab)
