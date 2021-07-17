// declaring the global variables
let ans = null;
let a = null;
let b = null;
let operator = null;
let numBucket = '0';
let preCal = '&nbsp;';

// grabbing the elements I will need to manipulate
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

// a function that updates the displays to the current values
const display = () => {
    preDisplay.innerHTML = preCal;
    if (ans != null) {
        ansDisplay.innerHTML = ans; // make sure that you null ans after storing in 'a'
    } else {
        ansDisplay.innerHTML = numBucket;
    }
};

// clearing the data
const clearData = () => {
    ans = null;
    a = null;
    b = null;
    operator = null;
    numBucket = '0';
    preCal = '&nbsp;';
    display();
};

display();

// the math functions that I will use
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

// calculate the answer when certain operators are selected along with two numbers
const calculate = (a, b, operator) => {
    switch (operator) {
        case "+":
            ans = add(a, b);
            break;
        case "-":
            ans = subtract(a, b);
            break;
        case "×":
            ans = multiply(a, b);
            break;
        case "÷":
            ans = divide(a, b);
    }
    preCal = `${a} ${operator} ${b} =`;
    display();
    a = null;
    b = null;
    operator = null;
    return ans;
}

const updateNum = (num) => {
    if (operator != null) {
        numBucket = '0';
    }

    switch (numBucket) {
        case '0':
            numBucket = num.innerHTML;
            break;
        case '-0':
            numBucket = '-' + num.innerHTML;
            break;
        default:
            numBucket = numBucket + num.innerHTML;
            break;
    }
    display();
}

numbers.forEach(number => {
    number.addEventListener('click', function() {
        updateNum(number);
    });
});

// decimal point needs to be added to the bucket somehow?
// convert the numBucket into a string for the mean time because it is easier to add and change with a string and then convert it to a number only when needed

const updateOperator = (op) => {
    if (operator != null && operator != op.innerHTML) {
        operator = op.innerHTML;
    } else if (numBucket != '' && a == null) { // if numBucket not empty, and a empty, then a = numBucket
        a = Number(numBucket);
        operator = op.innerHTML; // store the operator
    } else if (numBucket != '' && a != null) {  // if numBucket isnt empty AND a isnt empty, then 
        b = Number(numBucket); // store numBucket in b
        ans = calculate(a, b, operator); // calculate the answer and display it
        a = ans; // store the ans in a for the next calculation (in case users keep selecting operators to do calculations)
        operator = op.innerHTML; // store the new operator
        ans = null;
    } else if (numBucket == '' && a != null) {
        operator = op.innerHTML;
    }
}

operators.forEach(element => {
    element.addEventListener('click', function() {
        updateOperator(element);
    });
});

clear.addEventListener('click', function() {
    clearData();
});

backspace.addEventListener('click', function() {
    if (numBucket != '') {
        numBucket = numBucket.slice(0, -1);
    }
    if (numBucket.length < 1) {
        numBucket = '0';
    }
    display();
});

equals.addEventListener('click', function() {
    if (numBucket == "80085" && operator == null) {
        numBucket = "BOOBIES!!!";
        display();
    } else if (numBucket != '' && operator != null) {
        b = Number(numBucket);
        ans = calculate(a, b, operator);
        a = ans;
        ans = null;
    } else if (numBucket == '' && operator != null) {
        b = a;
        ans = calculate(a, b, operator);
        a = ans;
        ans = null;
    }
})

negative.addEventListener('click', function() {
    //when selected turn the current numBucket into a negative number
    if (numBucket[0] == '-') {
        numBucket = numBucket.slice(1);
    } else {
        numBucket = '-' + numBucket;
    }
    display();
})

percent.addEventListener('click', function() {
    if (numBucket != '') {
        numBucket = Number(numBucket) / 100;
    }
    if (operator === "+" || operator === "-") {
        numBucket = a * numBucket;
    }
    String(numBucket);
    display();
})

const handleKeyPress = function(e) {
    const numKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const opKeys = ['+', '-', '*', '/'];
    if (e.key in numKeys)
    switch (numBucket) {
        case '0':
            numBucket = e.key;
            break;
        case '-0':
            numBucket = '-' + e.key;
            break;
        default:
            numBucket = numBucket + e.key;
            break;
    } else if (e.key in opKeys) {
        console.log(e.key);
        if (operator != null && operator != e.key) {
            operator = e.key;
        } else if (numBucket != '' && a == null) { // if numBucket not empty, and a empty, then a = numBucket
            a = Number(numBucket);
            operator = e.key; // store the operator
        } else if (numBucket != '' && a != null) {  // if numBucket isnt empty AND a isnt empty, then 
            b = Number(numBucket); // store numBucket in b
            ans = calculate(a, b, operator); // calculate the answer and display it
            a = ans; // store the ans in a for the next calculation (in case users keep selecting operators to do calculations)
            operator = e.key; // store the new operator
            ans = null;
        } else if (numBucket == '' && a != null) {
            operator = e.key;
        }
    };
    display();
}

window.addEventListener('keypress', handleKeyPress, false);











