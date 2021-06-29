// I removed the prompt function as I wanted to use this in gitbash
let answer = 30;

// for each number up until the "answer"
for (let i = 1; i <= answer; i++) {

    // if it is divisable by 3 AND 5, print FIZZBUZZ
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");

    // if only divisable by 5, print BUZZ
    } else if (i % 5 === 0) {
        console.log("Buzz");
    
    // if only divisable by 3, print FIZZ
    } else if (i % 3 === 0) {
        console.log("Fizz");

    // if not divisable by 3 or 5, print the number itself
    } else {
        console.log(i);
    }
}