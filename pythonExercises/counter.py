def counter(string, letter):
    count = 0
    for char in string:
        if char == letter:
            count = count + 1 
    print(count)

string = input("Give me a word: ")
letter = input("Give me a letter: ")

counter(string, letter)
print(string.count(letter))