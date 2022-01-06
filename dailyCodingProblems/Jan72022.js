const f = (array, number) => {
    let answer = false;
    let num1 = 0;
    let num2 = 0;
    for (let index = 0; index < array.length; index++) {
        for (let index2 = index+1; index2 < array.length; index2++){
            const numToCheck = array[index] + array[index2];
            console.log(numToCheck);
            if (numToCheck == number) {
                answer = true;
                num1 = array[index];
                num2 = array[index2];
            }
        }
    }
    return {
        answer,
        num1,
        num2
    };
}

let readOut = f([10,15,3,7], 26);

console.log(`Do two number from within the inputted array add up to the inputted number: ${readOut.answer}. Those numbers are: ${readOut.num1} and ${readOut.num2}`);

//inputs: array and number; output: boolean if any two numbers in array add up to the inputed number
// take the first number
// add the second number
// check whether the answer is the inputed number
// if not move onto the first and third number

// Problem description
// Given a list of numbers and a number k, return whether any two numbers from the list add up to k.
// For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.
// Bonus: Can you do this in one pass?