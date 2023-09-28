import React, { useState } from 'react';
import './App.css';

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
    } else if (displayValue.indexOf('.') === -1) {
      setDisplayValue(displayValue + '.');
      setWaitingForOperand(false);
    }
  };

  const clear = () => {
    setDisplayValue('0');
    setOperator(null);
    setPreviousValue(null);
    setErrorMessage('');
    setWaitingForOperand(false);
  };

  const checkNum = (number) => {
    const regex = /^\d+(\.\d+)?$/;
    return regex.test(number);
  };

  const handleEquals = () => {
    if (!operator || !previousValue || !displayValue) return setErrorMessage('Syntax Error: Please enter a valid data');
    else if (!checkNum(previousValue) || !checkNum(displayValue)) return setErrorMessage('Syntax Error: Please enter a valid data');
    else if (operator && previousValue !== null) {
      switch (operator) {
        case '+':
          setDisplayValue(String(parseFloat(previousValue) + parseFloat(displayValue)));
          break;
        case '-':
          setDisplayValue(String(parseFloat(previousValue) - parseFloat(displayValue)));
          break;
        case '*':
          setDisplayValue(String(parseFloat(previousValue) * parseFloat(displayValue)));
          break;
        case '/':
          setDisplayValue(String(parseFloat(previousValue) / parseFloat(displayValue)));
          break;
        case '%':
          setDisplayValue(String(parseFloat(previousValue) * (parseFloat(displayValue) / 100)));
          break;
        case '+/-':
          setDisplayValue(String(-parseFloat(displayValue)));
          break;
        default:
          break;
        }
        setOperator(null);
        setPreviousValue(null);
        setWaitingForOperand(true);
        return setErrorMessage('');
    }
  };

  const add = () => {
    if (operator) {
      handleEquals();
    }
    setOperator('+');
    setPreviousValue(displayValue);
    setDisplayValue('');
    setWaitingForOperand(true);
  };

  const subtract = () => {
    if (operator) {
      handleEquals();
    }
    setOperator('-');
    setPreviousValue(displayValue);
    setDisplayValue('');
    setWaitingForOperand(true);
  };

  const multiply = () => {
    if (operator) {
      handleEquals();
    }
    setOperator('*');
    setPreviousValue(displayValue);
    setDisplayValue('');
    setWaitingForOperand(true);
  };

  const divide = () => {
    if (operator) {
      handleEquals();
    }
    setOperator('/');
    setPreviousValue(displayValue);
    setDisplayValue('');
    setWaitingForOperand(true);
  };

  const percentage = () => {
    setDisplayValue(String(parseFloat(displayValue) / 100));
    setWaitingForOperand(true);
  };

  const handleToggleSign = () => {
    setDisplayValue(String(-parseFloat(displayValue)));
  };
  console.log(displayValue)

  return (
    <div className="calculator">
      <div className="display">
        <h1>{`${previousValue ? previousValue : ''} ${operator ? operator : ''} ${displayValue}`}</h1>
        {errorMessage !== '' && <div class="error-message">{errorMessage}</div>}
      </div>
      <div className="buttons">
        <div className="button-row">
          <button className='clear' onClick={clear}>AC</button>
          <button className='operator' onClick={handleToggleSign}>+/-</button>
          <button className='operator' onClick={percentage}>%</button>
          <button className='operator' onClick={divide}>/</button>
        </div>
        <div className="button-row">
          <button onClick={() => inputDigit(7)}>7</button>
          <button onClick={() => inputDigit(8)}>8</button>
          <button onClick={() => inputDigit(9)}>9</button>
          <button className='operator' onClick={multiply}>x</button>
        </div>
        <div className="button-row">
          <button onClick={() => inputDigit(4)}>4</button>
          <button onClick={() => inputDigit(5)}>5</button>
          <button onClick={() => inputDigit(6)}>6</button>
          <button className='operator' onClick={subtract}>-</button>
        </div>
        <div className="button-row">
          <button onClick={() => inputDigit(1)}>1</button>
          <button onClick={() => inputDigit(2)}>2</button>
          <button onClick={() => inputDigit(3)}>3</button>
          <button className='operator' onClick={add}>+</button>
        </div>
        <div className="button-row">
          <button className='zero' onClick={() => inputDigit(0)}>0</button>
          <button onClick={inputDecimal}>.</button>
          <button className='operator' onClick={handleEquals}>=</button>
        </div>
      </div>
    </div>
  );
};

export default App;
