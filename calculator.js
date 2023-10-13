
let buffer = '0';
let runningTotal = 0;
let previousOperator = null;
const screen = document.querySelector('.results-screen');

// routing function

function buttonClick(value) {
  if (isNaN(parseInt(value))) {  // if the value is NOT a number...
    handleSymbol(value);  // call handleSymbol function and pass-in value
  } else {
    handleNumber(value);  // call handleNumber function and pass-in value
  }
  rerender();
}

// create function to handle numbers

function handleNumber(number) {
  // console.log('number');

  if (buffer === '0') {
    buffer = number; // assign to buffer and make them the same thing
  } else {
    buffer += number; // add to the end
  }
  console.log(buffer);
}

// create function to handle the Math

function handleMath(value) {
  if (buffer === '0') {
    // do nothing
    return;
  }
  const intBuffer = parseInt(buffer);

  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperator = value;
  buffer = "0";
}

// function for flushOperation to handle division, mult, etc

function flushOperation(intBuffer) {
  if (previousOperator === '+') {
    runningTotal += intBuffer
  } else if (previousOperator === '-') {
    runningTotal -= intBuffer
  } else if (previousOperator === 'x') {
    runningTotal *= intBuffer
  } else if (previousOperator === '÷') {
    runningTotal /= intBuffer;
  }
}

// create function to handle symbols

function handleSymbol(symbol) {
  // console.log('symbol');

  switch (symbol) {
    case "C":
      buffer = "0";
      break;
    case "=":
      if (previousOperator === null) {
        // need two numbers to do math
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;

      break;
    case "←":
      if (buffer.length === 1) {
        buffer = '0';
      } else {
        buffer = buffer.substring(0, buffer.length - 1); // uses substring() method to get a portion of the string, and remove the last number from the string. In other words, it takes the original 'buffer' string and extracts a new string that includes all characters from the beginning (index 0) up to, but not including the last character. This simulates a "delete" or "backspace" functionality
      }
      break;
    case "÷":
    case "x":
    case "-":
    case "+":
      handleMath(symbol);
      break;
  }
}

function init() {
  document
  .querySelector('.calc-buttons')
  .addEventListener("click", function (event) {
    buttonClick(event.target.innerText);
    
    // inside the event handler, this line is executed. event.target refers to the specific element that was clicked (i.e. the element inside the .calc-buttons container that triggered the click event)
    
    // .innerText gets the text content of the clicked element (i.e. 'number' or 'symbol' when testing)
    
  });
}

function rerender() {
  screen.innerText = buffer; // makes buffer and screen be the same thing
}

init();