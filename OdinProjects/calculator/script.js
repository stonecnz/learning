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
const clear = document.querySelector('.clear');
const backspace = document.querySelector('.backspace');

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
            ansDisplay.innerHTML += numBucket;
        } else {
            numBucket = (numBucket * 10) + Number(number.innerHTML); 
            ansDisplay.innerHTML += number.innerHTML;
        }
    })
});


operators.forEach(element => {
    element.addEventListener('click', function() { // when operated clicked
        if (numBucket != null && a === null) { // if numBucket not empty, and a empty, then a = numBucket
            a = numBucket;
            numBucket = null; //clear the numBucket so that we can add new stuff to it
            operator = element.innerHTML; // store the operator
            if (ansDisplay.innerHTML != "") {
                ansDisplay.innerHTML += ` ${operator} `;
            }
        } else if (numBucket != null && a != null) {  // if numBucket isnt empty AND a isnt empty, then 
            b = numBucket; // store numBucket in b
            numBucket = null; // wipe numBucket
            ans = calculate(a, b, operator); // calculate the answer and display it
            a = ans; // store the ans in a for the next calculation (in case users keep selecting operators to do calculations)
            operator = element.innerHTML; // store the new operator
        }
    })
});

clear.addEventListener('click', function() {
    clearData();
    ansDisplay.innerHTML = "";
    preDisplay.innerHTML = "";
    numBucket = null;
});

backspace.addEventListener('click', function() {
    if (numBucket != null) {
        numBucket = Math.floor(numBucket / 10);
    }
});

equals.addEventListener('click', function() {
    if (numBucket != null && operator != null) {
        b = numBucket;
        numBucket = null;
        ans = calculate(a, b, operator);
        a = ans;
    } else if (numBucket === null && operator != null) {
        b = a;
        ans = calculate(a, b, operator);
        a = ans;
    }
})









