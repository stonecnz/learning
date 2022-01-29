txt = 'but soft what light through yonder window breaks'
words = txt.split() # splits the sentence into elements in a list
print(words)

t = list() # creates a list for the tuples to be appended
print(t)

for word in words: # for each element in the list, create a tuple with the (length and word)
    t.append((len(word), word))
    print(t)

t.sort(reverse=True) # as tuples are sorted using the 1st element in the tuple, in this case, the length, then we can sort the list of tuples according to the reverse length of the words
print(t)

res = list() # create a new list to put the sorted words into
print(res)

for length, word in t: # for each tuple in the list, append the word in sorted order
    # if you don't include length above, then it iterates through the tuples in the list as a single element
    res.append(word)
    print(word)
    print(res)

print(res)