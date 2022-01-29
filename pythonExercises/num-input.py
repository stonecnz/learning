# init the list that will contain numbers that the user inputs
numbers = []

# Prompt the user for a number
while True:
    userInput = input("Enter a number: ")

    # create an exit window
    if userInput == 'done':
        break

    # convert the input into an int
    try:    
        integer = int(userInput)

    # guardian that requests another number if the input was inappropriate
    except:
        print("Not a number! Try again... \n")
        continue

    # after converting, add the int into a list of final numbers
    numbers.append(integer)

# print the outputs to the terminal
print('Maximum: ', max(numbers))
print('Minimum: ', min(numbers))