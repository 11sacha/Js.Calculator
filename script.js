// Object Values
const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitSecondOperand: false,
    operator: null,
};

// Display
const updateDisplay = () => {
    const display = document.querySelector('.screen');
    display.value = calculator.displayValue;
}
updateDisplay();

const keys = document.querySelector('.keys');
keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
        return
    }
    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }
    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }
    if (target.classList.contains('all-clear')) {
        resetCalculator();
        updateDisplay();
        return
    }

    inputDigit(target.value);
    updateDisplay();
})

// Input Digit
const inputDigit = (digit) => {
    const { displayValue, waitSecondOperand } = calculator;

    if (waitSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitSecondOperand = false;
    } else {
        calculator.displayValue = 
            displayValue === '0' ? digit : displayValue + digit;
    }
};

// Input Decimal
const inputDecimal = (dot) => {
    if (calculator.waitSecondOperand === true) {
        calculator.displayValue = '0.';
        calculator.waitSecondOperand = false;
        return;
    }
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
};

// Handle Operators
const handleOperator = (nextOperator) => {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if(operator && calculator.waitSecondOperand) {
        calculator.operator = nextOperator;
        return
    }
    if (firstOperand == null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }

    calculator.waitSecondOperand = true;
    calculator.operator = nextOperator;
};

const calculate = (firstOperand, secondOperand, operator) => {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    }
    return secondOperand;
};

const resetCalculator = () => {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitSecondOperand = false;
    calculator.operator =  null
}




