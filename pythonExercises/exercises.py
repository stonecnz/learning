while True:
    a = input("Please enter a score between 0.1 and 1.0: \n")
    try:
        score = float(a)
        if score <= 1:
            break
        print("Your score wasn't a valid number")
    except:
        print("\nYou did not enter a numeric value. Fuck off.\n")

def computeGrade(score):
    try:
        if score >= 0.1 and score < 0.6:
            fS = "F"
        elif score >= 0.6 and score < 0.7:
            fS = "D"
        elif score >= 0.7 and score < 0.8:
            fS = "C"
        elif score >= 0.8 and score < 0.9:
            fS = "B"
        elif score >= 0.9 and score <= 1.0:
            fS = "A"
        return fS
    except:
        print("The number you provided was not within the bounds of this excercise.")

print(computeGrade(score))