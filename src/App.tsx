import { useCallback, useEffect, useMemo, useState } from "react"
import equalSign from "./assets/equal-white.svg"
import notEqualSign from "./assets/not-equal-white.svg"
import ratioDots from "./assets/ratio-dots.svg"
import "./App.scss"
import RatioInput from "./RatioInput"
import {
  equationIsValid,
  parseValues,
  solveForA,
  solveForB,
  solveForC,
  solveForD,
} from "./functions"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./firebase"

function App() {
  const [values, setValues] = useState({ a: "", b: "", c: "", d: "" })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const solutions = useMemo(() => {
    const parsed = parseValues(values)
    const aNaN = isNaN(parsed.a)
    const bNaN = isNaN(parsed.b)
    const cNaN = isNaN(parsed.c)
    const dNaN = isNaN(parsed.d)
    if (aNaN && !bNaN && !cNaN && !dNaN) {
      return { a: solveForA(parsed.b, parsed.c, parsed.d) }
    }
    if (!aNaN && bNaN && !cNaN && !dNaN) {
      return { b: solveForB(parsed.a, parsed.c, parsed.d) }
    }
    if (!aNaN && !bNaN && cNaN && !dNaN) {
      return { c: solveForC(parsed.a, parsed.b, parsed.d) }
    }
    if (!aNaN && !bNaN && !cNaN && dNaN) {
      return { d: solveForD(parsed.a, parsed.b, parsed.c) }
    }
    return {}
  }, [values])

  const showEqualSign = useMemo(() => {
    const parsed = parseValues(values)
    const aNaN = isNaN(parsed.a)
    const bNaN = isNaN(parsed.b)
    const cNaN = isNaN(parsed.c)
    const dNaN = isNaN(parsed.d)
    if (!aNaN && !bNaN && !cNaN && !dNaN) {
      return equationIsValid(parsed.a, parsed.b, parsed.c, parsed.d)
    }
    return true
  }, [values])

  useEffect(() => {
    const newErrors: { [key: string]: string } = {}
    Object.entries(values).forEach(([key, value]) => {
      try {
        if (value !== "") {
          const parsedValue = parseFloat(value)
          if (isNaN(parsedValue)) {
            throw "Not a number"
          }
          if (parsedValue === 0) {
            throw "No zeroes allowed"
          }
        }
      } catch (e) {
        newErrors[key] = String(e)
      }
    })
    setErrors(newErrors)
  }, [values])

  const handleChangeRatioInput: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      const possibleKeys = Object.keys(values)
      if (!possibleKeys.includes(e.target.name)) {
        throw new Error(
          `<input /> must have a name attribute that is one of the following: "${possibleKeys.join(
            '", "'
          )}"`
        )
      }
      setValues((prev) => ({ ...prev, [e.target.name]: e.target.value.trim() }))
    }, [])

  return (
    <>
      <h1>Ratio Calculator</h1>
      <div>
        <div className="ratios-container">
          <div className="ratio-pair">
            <RatioInput
              value={values.a}
              solution={solutions.a}
              name="a"
              onChange={handleChangeRatioInput}
              error={errors["a"]}
              autoFocus
            />
            <img src={ratioDots} alt="colon" />
            <RatioInput
              value={values.b}
              solution={solutions.b}
              name="b"
              onChange={handleChangeRatioInput}
              error={errors["b"]}
            />
          </div>
          <img
            src={showEqualSign ? equalSign : notEqualSign}
            alt={showEqualSign ? "equal sign" : "not equal sign"}
          />
          <div className="ratio-pair">
            <RatioInput
              value={values.c}
              solution={solutions.c}
              name="c"
              onChange={handleChangeRatioInput}
              error={errors["c"]}
            />
            <img src={ratioDots} alt="colon" />
            <RatioInput
              value={values.d}
              solution={solutions.d}
              name="d"
              onChange={handleChangeRatioInput}
              error={errors["d"]}
            />
          </div>
        </div>
      </div>
      <ToastContainer
        autoClose={2000}
        closeButton={false}
        closeOnClick
        hideProgressBar
        theme="dark"
        style={{
          fontSize: "1em",
        }}
      />
    </>
  )
}

export default App
