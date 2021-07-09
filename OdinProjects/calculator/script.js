let ans = null;
let a = null;
let b = null;
let operator = null;
let previousCal = null;

const ansDisplay = document.querySelector('.ans');
const preDisplay = document.querySelector('.previousCal');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');

const clearData = () => {
    ans = null;
    a = null;
    b = null;
    operator = null;
    previousCal = null;
};


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
    ansDisplay.innerHTML = ans;
    a = null;
    b = null;
    operator = null;
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
    preDisplay.innerHTML = `${a} ${operator} ${b} =`;
}

// init a bucket to add the current number into. When a number is selected calculate what the current number is with the select in the ones column
let numBucket = null;
numbers.forEach(number => {
    number.addEventListener('click', function() {
        if (numBucket === null) {
            numBucket = Number(number.innerHTML);
        } else {
            numBucket = (numBucket * 10) + Number(number.innerHTML); 
        }
        console.log(numBucket);
    })
});



operators.forEach(element => {
    element.addEventListener('click', function() { // when operated clicked
        console.log(`a = ${a} b = ${b} operator = ${operator} ans = ${ans}`);
        if (numBucket != null && a === null) { // if numBucket not empty, and a empty, then a = numBucket
            a = numBucket;
            numBucket = null;
            operator = element.innerHTML;
        } else if (numBucket != null && a != null) { 
            b = numBucket;
            numBucket = null;
            ans = calculate(a, b, operator);
            a = ans;
            operator = element.innerHTML;
        }
    })
});









