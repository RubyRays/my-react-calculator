import React, { useState } from "react";
import Button from "./Button";
import buttons from "../buttons";

function Calculator(prop) {
  const [num, setNum] = useState("");
  const [equation, setEquation] = useState("");
//   const [history, setHistory] = useState("");

  function handleChange(e) {
    const newValue = e.target.value;
    setEquation(newValue);
  }

  function handleClick(event) {
    const newnum = event.target.value;
    const operands = ["+", "-", "*", "/", "^", "√"];
    if (operands.includes(newnum)) {
      if (num !== "") {
        setEquation((prevNum) => {
          return [...prevNum, Number(num), newnum];
        });
        setNum("");
      }
    } else if (newnum === "clear") {
      setEquation("");
      setNum("");
    } else if (newnum === "=") {
      //only works when there is a complete equation
      if (num !== "" && equation.length > 1) {
        setEquation((prevNum) => {
          return [...prevNum, Number(num)];
        });
        const res = (opr) => {
          switch (equation[1]) {
            case "+":
              return Number(equation[0]) + Number(num);
            case "-":
              return Number(equation[0]) - Number(num);
            case "*":
              return Number(equation[0]) * Number(num);
            case "/":
              return Number(equation[0]) / Number(num);
            case "^":
              return Math.pow(Number(equation[0]), Number(num));
            default:
              return 0;
          }
        };

        setNum(res);
        // setHistory(equation);
        setEquation("");
      } else {
        if (equation[1] === "√") {
          const res = Math.sqrt(Number(equation[0]));
          setNum(res);
          setEquation("");
        } else {
          console.log("error");
        }
      }

      console.log(equation.length);
    } else {
      if (newnum === "(-)") {
        const result = "-" + num;
        setNum(result);
      } else {
        const result = num + newnum;
        setNum(result);
      }
    }
    console.log(equation);
  }

  return (
    <div className="calc-body">
      <div class="calc-equation">{equation}</div>
      <div>
        <input onChange={handleChange} className="calc-display" value={num} />
      </div>
      <div className="calc-body-number-pad">
        <div className="calc-number-pad">
          {buttons.slice(0, 15).map((newbuttons) => (
            <Button
              key={newbuttons.id}
              id={newbuttons.id}
              name={newbuttons.name}
              onClicked={handleClick}
            />
          ))}
        </div>
        <div className="calc-number-pad2">
          {buttons.slice(15, 20).map((newbuttons2) => (
            <Button
              key={newbuttons2.id}
              name={newbuttons2.name}
              onClicked={handleClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calculator;
