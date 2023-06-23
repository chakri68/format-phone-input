import { useRef } from "react";
import "./App.css";
import { isValidDigit } from "./lib/utils";
import { formatTel } from "./lib/inputFormat";

function App() {
  const phoneNumber = useRef(""); // To store the phoneNumber without any state changes
  function handleInputChange(e) {
    let prevCount = 0;
    const selEnd = e.target.selectionEnd;
    for (let char of e.target.value.slice(0, selEnd)) {
      if (isValidDigit(char)) {
        prevCount += 1;
      }
    }
    const formattedTel = formatTel(e.target.value);
    let reqInd = 0;
    for (let char of formattedTel) {
      if (isValidDigit(char)) {
        if (prevCount <= 0) break;
        prevCount -= 1;
      }
      reqInd += 1;
    }
    e.target.value = formattedTel;
    e.target.selectionEnd = reqInd;
    phoneNumber.current = formattedTel;
  }

  return (
    <>
      <div className="container text-center">
        <input
          type="tel"
          id="phone"
          maxLength="16"
          placeholder="mobile number"
          autoComplete="off"
          onInput={handleInputChange}
        />
        <div>
          <label htmlFor="phone">(123) 456-7890</label>
        </div>
      </div>
    </>
  );
}

export default App;
