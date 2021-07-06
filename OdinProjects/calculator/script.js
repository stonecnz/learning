let ans = null;
let a = null;
let b = null;
let operator = null;
let previousCal = null;
// calculate the answer when certain operators are selected along with two numbers
const calculate = (a, b, operator) => {
    switch (operator) {
        case "+":
            ans = add(a, b);
            break;
        case "-":
            ans = subtract(a, b);
            break;
        case "*":
            ans = multiply(a, b);
            break;
        case "/":
            ans = divide(a, b);
    }
    returnPreviousCal(a, b, operator);
    return ans;
}

// the math functions that we will use
const add = (a, b) => {
    return a + b;
};

const subtract = (a, b) => {
    return a - b;
};

const multiply = (a, b) => {
    return a * b;
};

const divide = (a, b) => {
    if (b === 0) {
        return "ERROR! You Womble!" // adding in the divide by zero error message
    } else {
        return a / b;
    };
};

const returnPreviousCal = (a, b, operator) => {
    console.log(`${a} ${operator} ${b} =`);
}
a = 1;
b = 2;
operator = "-";

ans = calculate(a, b, operator);
console.log(ans);