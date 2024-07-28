import React, { useEffect, useState, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./PasswordGenerator.css";
import copyIcon from "../assets/copy-icon.svg";

const lowerCaseList = "abcdefghijklmnopqrstuvwxyz";
const upperCaseList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbersList = "01234567890";
const symbolsList = "!@#$%^&*()?";

function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [passwordLength, setPasswordLength] = useState(8);

  const selectedChoices = useMemo(() => {
    const choices = [];
    if (lowerCase) choices.push("lowercase");
    if (upperCase) choices.push("uppercase");
    if (numbers) choices.push("numbers");
    if (symbols) choices.push("symbols");
    return choices;
  }, [lowerCase, upperCase, numbers, symbols]);

  useEffect(() => {
    generatePassword();
  }, [passwordLength, selectedChoices]);

  const generatePassword = () => {
    let characterList = "";
    if (lowerCase) characterList += lowerCaseList;
    if (upperCase) characterList += upperCaseList;
    if (numbers) characterList += numbersList;
    if (symbols) characterList += symbolsList;

    if (characterList.length === 0) {
      setPassword("");
      return;
    }

    let tempPassword = "";
    const characterListLength = characterList.length;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characterListLength);
      tempPassword += characterList.charAt(characterIndex);
    }
    setPassword(tempPassword);
  };

  const handleCheckboxChange = (type) => {
    switch (type) {
      case "lowercase":
        setLowerCase(!lowerCase);
        break;
      case "uppercase":
        setUpperCase(!upperCase);
        break;
      case "numbers":
        setNumbers(!numbers);
        break;
      case "symbols":
        setSymbols(!symbols);
        break;
      default:
        break;
    }
  };

  const copyPassword = async () => {
    if (password.length) {
      await navigator.clipboard.writeText(password);
      toast.success("Password copied to clipboard", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <div className="container">
        <h2 className="title">Strong Password Generator</h2>
        <div className="password-wrapper">
          <div className="password-area">
            <div className="password">
              <input
                type="text"
                value={password}
                disabled
                placeholder="Click on Generate Password"
              />
              <img
                src={copyIcon}
                alt="Copy Icon"
                className="copy-icon"
                onClick={copyPassword}
              />
            </div>
          </div>
        </div>
        <div className="setting">
          <h3>Customize Your Password</h3>
          <div className="customize">
            <div className="checkboxes">
              <div className="left">
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    name="lower"
                    id="lower"
                    checked={lowerCase}
                    disabled={selectedChoices.length === 1 && lowerCase}
                    onChange={() => handleCheckboxChange("lowercase")}
                  />
                  <label htmlFor="lower">Include Lower Case (a-z)</label>
                </div>
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    name="upper"
                    id="upper"
                    checked={upperCase}
                    disabled={selectedChoices.length === 1 && upperCase}
                    onChange={() => handleCheckboxChange("uppercase")}
                  />
                  <label htmlFor="upper">Include Upper Case (A-Z)</label>
                </div>
              </div>
              <div className="right">
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    name="numbers"
                    id="numbers"
                    checked={numbers}
                    disabled={selectedChoices.length === 1 && numbers}
                    onChange={() => handleCheckboxChange("numbers")}
                  />
                  <label htmlFor="numbers">Include Numbers (0-9)</label>
                </div>
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    name="symbols"
                    id="symbols"
                    checked={symbols}
                    disabled={selectedChoices.length === 1 && symbols}
                    onChange={() => handleCheckboxChange("symbols")}
                  />
                  <label htmlFor="symbols">Include Symbols (&-#)</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="password-length">
          <h3>Password Length</h3>
          <div className="slider">
            <p className="range-value">{passwordLength}</p>
            <div className="range">
              <input
                type="range"
                min={8}
                max={40}
                value={passwordLength}
                onChange={(event) =>
                  setPasswordLength(Number(event.target.value))
                }
              />
            </div>
          </div>
        </div>
        <div className="buttons">
          <button type="button" onClick={copyPassword}>
            Copy Password
          </button>
          <button type="button" onClick={generatePassword}>
            Generate Password
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default PasswordGenerator;
