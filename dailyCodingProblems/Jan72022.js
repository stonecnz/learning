const f = (array, number) => {

    // Intuition
    // Iterate over the numbers while tracking individual sum matches in a Set outside the loop.

    // Implementation
    // Uses native JS Set() to dynamically track confirmed values for validation in a future iteration.

    // Time Complexity
    // \mathcal{O}(n)O(n) - assumed full loop over array with fast fail potential each iteration

    // Space Complexity
    // \mathcal{O}(n)O(n) - map tracks a new value per iteration

    let set = new Set();
    
    // Because it's "whether one exists" and not "how many exist" 
    // we don't need to iterate more than 1 full loop max
    for (const current of array) {
        // Quick check if we have already found a match for the sum
        if (set.has(current)) {
            return true;
        }
        set.add(number - current);
    }
    return false;

    // my answer was originally the following but it was faaaar too slow. I looked up another persons answer - see above
    // let answer = false;
    // let num1 = 0;
    // let num2 = 0;
    // for (let index = 0; index < array.length; index++) {
    //     for (let index2 = index+1; index2 < array.length; index2++){
    //         const numToCheck = array[index] + array[index2];
    //         console.log(numToCheck);
    //         if (numToCheck == number) {
    //             answer = true;
    //             num1 = array[index];
    //             num2 = array[index2];
    //         }
    //     }
    // }
    // return {
    //     answer,
    //     num1,
    //     num2
    // };
}

console.log(f([10,15,3,7], 25));

// let readOut = f([10,15,3,7], 26);

// console.log(`Do two number from within the inputted array add up to the inputted number: ${readOut.answer}. Those numbers are: ${readOut.num1} and ${readOut.num2}`);

//inputs: array and number; output: boolean if any two numbers in array add up to the inputed number
// take the first number
// add the second number
// check whether the answer is the inputed number
// if not move onto the first and third number

// Problem description
// Given a list of numbers and a number k, return whether any two numbers from the list add up to k.
// For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.
// Bonus: Can you do this in one pass?