import React, { useState } from 'react';
import './App.css';

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

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

  const clearDisplay = () => {
    setDisplayValue('0');
    setOperator(null);
    setPreviousValue(null);
    setWaitingForOperand(false);
  };

  return (
    <div className="calculator">
      <div className="display">{displayValue}</div>
      <div className="buttons">
        <div className="button-row">
          <button className='clear' onClick={clearDisplay}>AC</button>
          <button className='operator' onClick={() => {}}>+/-</button>
          <button className='operator' onClick={() => {}}>%</button>
          <button className='operator' onClick={() => {}}>/</button>
        </div>
        <div className="button-row">
          <button onClick={() => inputDigit(7)}>7</button>
          <button onClick={() => inputDigit(8)}>8</button>
          <button onClick={() => inputDigit(9)}>9</button>
          <button className='operator' onClick={() => {}}>x</button>
        </div>
        <div className="button-row">
          <button onClick={() => inputDigit(4)}>4</button>
          <button onClick={() => inputDigit(5)}>5</button>
          <button onClick={() => inputDigit(6)}>6</button>
          <button className='operator' onClick={() => {}}>-</button>
        </div>
        <div className="button-row">
          <button onClick={() => inputDigit(1)}>1</button>
          <button onClick={() => inputDigit(2)}>2</button>
          <button onClick={() => inputDigit(3)}>3</button>
          <button className='operator' onClick={() => {}}>+</button>
        </div>
        <div className="button-row">
          <button className='zero' onClick={() => inputDigit(0)}>0</button>
          <button onClick={inputDecimal}>.</button>
          <button className='operator' onClick={() => {}}>=</button>
        </div>
      </div>
    </div>
  );
};

export default App;
