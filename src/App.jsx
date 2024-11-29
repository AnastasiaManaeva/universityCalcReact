import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [equation, setEquation] = useState("");
  const [number, setNumber] = useState("");

  const handleClear = () => {
    setNumber("");
    setEquation("");
  };

  const handleOperator = (operator) => {
    if (number !== "") {
      setEquation(prev => prev + " " + operator + " ");
      setNumber("");
    }
  };

  const handleSymbol = (symbol) => {
    setEquation(prev => prev + symbol + " ");
    setNumber(symbol);
  };

  const handleEqual = () => {
    if (number !== "") {
      const finalEquation = equation;
      let result;
      try {
        result = eval(finalEquation);
      } catch (error) {
        result = "Ошибка";
      }
      setEquation(result.toString());
    }
  };

  const handleBackspace = () => {
    if (number !== "") {
      setNumber(prev => prev.slice(0, -1));
    } else if (equation !== "") {
      const lastSpaceIndex = equation.lastIndexOf(' ');
      if (lastSpaceIndex !== -1) {
        setEquation(prev => prev.slice(0, lastSpaceIndex));
      } else {
        setEquation("");
      }
    }
  };

  const handleKeyDown = (event) => {
    const key = event.key;

    if (key === 'Enter') {
      handleEqual();
    } else if (key === 'Backspace') {
      handleBackspace();
    } else if ("0123456789".includes(key)) {
      handleSymbol(key);
    } else if ("+-*/.".includes(key)) {
      handleOperator(key);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [equation, number]);

  return (
    <div className="calculator">
      <span className="shimmer"></span>
      <h1 className='title'>Калькулятор</h1>
      <div className="containerCalc">
        <input className="output" type="text" value={equation || number} readOnly />
        <div className="row">
          <div className="item main back" onClick={handleBackspace}>⬅</div>
          <div className="item main" onClick={handleClear}>C</div>
          <div className="item operation" onClick={() => handleOperator("/")}>/</div>
        </div>
        <div className="row">
          <div className="item" onClick={() => handleSymbol("7")}>7</div>
          <div className="item" onClick={() => handleSymbol("8")}>8</div>
          <div className="item" onClick={() => handleSymbol("9")}>9</div>
          <div className="item operation" onClick={() => handleOperator("*")}>*</div>
        </div>
        <div className="row">
          <div className="item" onClick={() => handleSymbol("4")}>4</div>
          <div className="item" onClick={() => handleSymbol("5")}>5</div>
          <div className="item" onClick={() => handleSymbol("6")}>6</div>
          <div className="item operation" onClick={() => handleOperator("-")}>-</div>
        </div>
        <div className="row">
          <div className="item" onClick={() => handleSymbol("1")}>1</div>
          <div className="item" onClick={() => handleSymbol("2")}>2</div>
          <div className="item" onClick={() => handleSymbol("3")}>3</div>
          <div className="item operation" onClick={() => handleOperator("+")}>+</div>
        </div>
        <div className="row">
          <div className="item" onClick={() => handleSymbol("0")}>0</div>
          <div className="item" onClick={() => handleSymbol(".")}>.</div>
          <div className="item main equal" onClick={handleEqual}>=</div>
        </div>
      </div>
    </div>
  );
};

export default App
