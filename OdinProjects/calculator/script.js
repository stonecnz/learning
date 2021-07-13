let ans = null;
let a = null;
let b = null;
let operator = null;
let numBucket = '0';


const ansDisplay = document.querySelector('.ans');
const preDisplay = document.querySelector('.previousCal');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const backspace = document.querySelector('.backspace');
const negative = document.querySelector('.negative');
const percent = document.querySelector('.percent');
const decimal = document.querySelector('.decimal');

const clearData = () => {
    ans = null;
    a = null;
    b = null;
    operator = null;
    preDisplay.innerHTML = "&nbsp;";
    numBucket = 0;
    ansDisplay.innerHTML = numBucket;
};

ansDisplay.innerHTML = numBucket;


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
numbers.forEach(number => {
    number.addEventListener('click', function() {
        if (numBucket === null || numBucket === 0) {
            numBucket = Number(number.innerHTML);
            ansDisplay.innerHTML = numBucket;
        } else if (numBucket === "-0") {
            numBucket = -1 * Number(number.innerHTML); 
            ansDisplay.innerHTML = numBucket;
        } else if (numBucket < 0) {
            numBucket = (numBucket * 10) - Number(number.innerHTML); 
            ansDisplay.innerHTML = numBucket;
        } else {
            numBucket = (numBucket * 10) + Number(number.innerHTML); 
            ansDisplay.innerHTML = numBucket;
        }
    })
});

// decimal point needs to be added to the bucket somehow?
// convert the numBucket into a string for the mean time because it is easier to add and change with a string and then convert it to a number only when needed

operators.forEach(element => {
    element.addEventListener('click', function() { // when operated clicked
        if (numBucket != null && a === null) { // if numBucket not empty, and a empty, then a = numBucket
            a = numBucket;
            numBucket = null; //clear the numBucket so that we can add new stuff to it
            operator = element.innerHTML; // store the operator
        } else if (numBucket != null && a != null) {  // if numBucket isnt empty AND a isnt empty, then 
            b = numBucket; // store numBucket in b
            numBucket = null; // wipe numBucket
            ans = calculate(a, b, operator); // calculate the answer and display it
            a = ans; // store the ans in a for the next calculation (in case users keep selecting operators to do calculations)
            operator = element.innerHTML; // store the new operator
            ans = null;
        } else if (numBucket === null && a != null) {
            operator = element.innerHTML;
        }
    })
});

clear.addEventListener('click', function() {
    clearData();
});

backspace.addEventListener('click', function() {
    if (numBucket != null || numBucket != 0) {
        numBucket = Math.floor(numBucket / 10);
        ansDisplay.innerHTML = numBucket;
    }
});

equals.addEventListener('click', function() {
    if (numBucket != null && operator != null) {
        b = numBucket;
        numBucket = null;
        ans = calculate(a, b, operator);
        a = ans;
        ans = null;
    } else if (numBucket === null && operator != null) {
        b = a;
        ans = calculate(a, b, operator);
        a = ans;
        ans = null;
    }
})

negative.addEventListener('click', function() {
    //when selected turn the current numBucket into a negative number
    if (numBucket != null && numBucket != 0) {
        numBucket = numBucket * -1
        ansDisplay.innerHTML = numBucket;
    } else if (numBucket === 0) {
        numBucket = "-0";
        ansDisplay.innerHTML = numBucket;
    }
})

percent.addEventListener('click', function() {
    if (numBucket != null || numBucket != 0) {
        numBucket = numBucket / 100;
        ansDisplay.innerHTML = numBucket;
    }
    if (numBucket != null && (operator === "+" || operator === "-")) {
        numBucket = a * numBucket;
        ansDisplay.innerHTML = numBucket;
    }
})










