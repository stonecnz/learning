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

const blink = () => {
    ansDisplay.style.opacity = 0;
    setTimeout(function() {ansDisplay.style.opacity = 1}, 30);
}

// a function that updates the displays to the current values
const display = () => {
    preDisplay.innerHTML = preCal;
    if (ans != null) {
        ansDisplay.innerHTML = ans; // make sure that you null ans after storing in 'a'
    } else if (numBucket == '') {
        ansDisplay.innerHTML = '0';
    } else {
        ansDisplay.innerHTML = numBucket;
    }
    blink();
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
    a = null;
    b = null;
    operator = null;
    return ans;
}

const updateNum = (num) => {
    switch (numBucket) {
        case '0':
            numBucket = num;
            break;
        case '-0':
            numBucket = '-' + num;
            break;
        default:
            numBucket = numBucket + num;
            break;
    }
    display();
}

numbers.forEach(number => {
    number.addEventListener('click', function() {
        updateNum(number.innerHTML);
    });
});

const updateOperator = (op) => {
    if (operator != null && operator != op) {
        blink();
        operator = op;
    } else if (numBucket != '' && operator == null) {
        blink();
        operator = op;
        a = Number(numBucket);
        numBucket = '';
    } else if (numBucket != '' && a == null) { // if numBucket not empty, and a empty, then a = numBucket
        blink();
        a = Number(numBucket);
        operator = op; // store the operator
        numBucket = '';
    } else if (numBucket != '' && a != null) {  // if numBucket isnt empty AND a isnt empty, then 
        b = Number(numBucket); // store numBucket in b
        numBucket = '';
        ans = calculate(a, b, operator); // calculate the answer and display it
        a = ans; 
        display();
        ans = null;
        operator = op; // store the new operator
    } else if (numBucket == '' && a != null) {
        blink();
        operator = op;
    }
}

operators.forEach(element => {
    element.addEventListener('click', function() {
        updateOperator(element.innerHTML);
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

const calcEquals = () => {
    if (numBucket == "80085" && operator == null) {
        numBucket = "BOOBIES!!!";
        display();
    } else if (numBucket != '' && operator != null) {
        b = Number(numBucket);
        ans = calculate(a, b, operator);
        a = ans;
    } else if (numBucket == '' && operator != null) {
        b = a;
        ans = calculate(a, b, operator);
        a = ans;
    }
    display();
    numBucket = ''
    ans = null;
    b = null;
    operator = null;
}

equals.addEventListener('click', function() {
    calcEquals();
});

const turnNegative = () => {
    if (numBucket[0] == '-') {
        numBucket = numBucket.slice(1);
    } else {
        numBucket = '-' + numBucket;
    }
    display();
}

negative.addEventListener('click', function() {
    //when selected turn the current numBucket into a negative number
    turnNegative();
})

const turnPercent = () => {
    if (numBucket != '') {
        numBucket = Number(numBucket) / 100;
    }
    if (operator === "+" || operator === "-") {
        numBucket = a * numBucket;
    }
    String(numBucket);
    display();
}

percent.addEventListener('click', function() {
    turnPercent();
})

const handleKeyPress = function(e) {
    console.log(e.charCode);
    const numKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '='];
    if (e.key in numKeys) {
        updateNum(e.key);
    } else if (e.charCode == 61) {
        calcEquals();
    } else if (e.charCode == 43 || e.charCode == 45) {
        updateOperator(e.key);
    } else if (e.charCode == 42) {
        updateOperator('×');
    } else if (e.charCode == 47) {
        updateOperator('÷');
    } else if (e.charCode == 95) {
        turnNegative();
    } else if (e.charCode == 37) {
        turnPercent();
    }
}

window.addEventListener('keypress', handleKeyPress, false);











