//math functions
function add(a, b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    if(b===0)
        return 'Cannot divide by 0.';
    return a/b;
}

function root(a,b){
    if(a < 0)
        return 'Cannot root negatives.';
    return Math.sqrt(a);
}

function mod(a,b){
    if(b===0)
        return 'Cannot divide by 0.';
    return a%b;
}

//uses the math functions
function operate(a,b,operator)
{
    return operator(a,b);
}


function setOperator(operator, str)
{
    //another operator has been chosen already, must complete that calculation
    if(operatorValid && !calculationEnd)
    {
        equalsClick(null);
    }
    //if at the end of a previous calculation, keep the stored value
    if(!calculationEnd)
    {
        storedValue = currentValue;
    }
    currentOperator = operator;
    //disable all operators
    operators.forEach(btn => btn.setAttribute('disabled','true'));
    decimal.removeAttribute('disabled');
    //clear the input value
    currentValue = '0';
    //update display
    display.textContent = storedValue + ' ' + str;
    calculationEnd = false;
    operatorValid = true;
}

function equalsClick(e)
{
    let result;
    if(!operatorValid){
        //if no operator is active, just return the input
        result = currentValue; 
    }
    else{
        result = operate(+storedValue, +currentValue, currentOperator);
        display.textContent = result;
        storedValue = String(result);
    }
    operators.forEach(btn => btn.removeAttribute('disabled'));
    decimal.removeAttribute('disabled');
    calculationEnd = true;
    //reset values if an error is given
    if(isNaN(result))
    {
        currentValue = '0';
        storedValue = '0';
        currentOperator = null;
        calculationEnd = false;
        operatorValid = false;
    }
}

function rootClick(e)
{
    if(calculationEnd)
    {
        currentValue = storedValue;
    }
    setOperator(root);
    equalsClick(null);
}

function digitClick(e)
{
    if(calculationEnd)
    {
        storedValue = '0';
        operator = null;
        calculationEnd = false;
        operatorValid = false;
        currentValue = '0';
    }
    previousValue = currentValue;
    
    const digit = this.getAttribute('data-num');
    if(digit === ".")
        decimal.setAttribute('disabled', 'true');
    if(currentValue === '0' && digit !== ".")
        currentValue = digit;
    else
        currentValue = currentValue+''+digit;
    operators.forEach(btn => btn.removeAttribute('disabled'));
    display.textContent = currentValue;
}

function backspace(e)
{
    if(calculationEnd)
    {
        clear(null);
    }
    else
    {
        let toRemove = currentValue.charAt(currentValue.length-1);
        if(toRemove==='.')
            decimal.removeAttribute('disabled');
        currentValue = currentValue.slice(0, currentValue.length-1);
        if(currentValue === '')
            currentValue = '0';
        display.textContent = currentValue;
    }
}

function clear(e)
{
    currentValue = '0';
    storedValue = '0';
    currentOperator = null;
    calculationEnd = false;
    operatorValid = false;
    operators.forEach(btn => btn.removeAttribute('disabled'));
    decimal.removeAttribute('disabled');
    display.textContent = currentValue;
}

let currentValue = '0';
let storedValue = 0;
let currentOperator = null;
let calculationEnd = false;
let operatorValid = false;

const calculator = document.querySelector('#calculator');
const digits = document.querySelectorAll('.digit');
const display = document.querySelector('#display-text');
const operators = document.querySelectorAll('.operator');
const equalsBtn = document.querySelector('#equals');
const decimal = document.querySelector('#decimal');
equalsBtn.addEventListener('click', equalsClick);
document.querySelector('#add').addEventListener('click', ()=>{setOperator(add,'+')});
document.querySelector('#subtract').addEventListener('click', ()=>{setOperator(subtract, '-')});
document.querySelector('#multiply').addEventListener('click', ()=>{setOperator(multiply,'x')});
document.querySelector('#divide').addEventListener('click', ()=>{setOperator(divide,'/')});
document.querySelector('#mod').addEventListener('click', ()=>{setOperator(mod,'%')});
document.querySelector('#clear').addEventListener('click', clear);
document.querySelector('#sqrt').addEventListener('click', rootClick);
document.querySelector('#delete').addEventListener('click', backspace);



digits.forEach(digit =>{
    digit.addEventListener('click', digitClick);
});

