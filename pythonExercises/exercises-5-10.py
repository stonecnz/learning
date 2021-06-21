numbers = []

while True:
    a = input("Enter a number: ")
    try:    
        b = int(a)
    except:
        if a == "done":
            total = sum(numbers)
            print("\n*** Descriptive Statistics ***\n\nTotal: ", total)
            count = len(numbers)
            print("Count: ", count)
            average = total / count
            print("Average: ", average)
            maxNum = max(numbers)
            print("Max: ", maxNum)
            minNum = min(numbers)
            print("Min: ", minNum)
            break
        print("Not a number! Try again... \n")
        continue
    numbers.append(b)