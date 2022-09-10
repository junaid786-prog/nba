import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, registerUserAction } from "../redux/actions"
import { useAlert } from "react-alert"

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()
  // states
  const [name, setName] = useState("")
  const [gmail, setGmail] = useState("")
  const [country, setCountry] = useState("")
  const [password, setPassword] = useState("")
  const [cPassword, setCPassword] = useState("")

  const userForRegisteration = {
    name,
    gmail,
    country,
    password,
  }

  const { isAuthenticated, error } = useSelector(
    (state) => state.registeredUser
  )

  const registerUser = () => {
    if (password !== cPassword)
      alert.error("Password and confirm password are not same")
    else {
      setName("")
      setCountry("")
      setPassword("")
      setGmail("")
      dispatch(registerUserAction(userForRegisteration))
    }
  }
  useEffect(() => {
    if (error)
      if (typeof error === "string") alert.error(error)
      else {
        for (let err in error) {
          alert.error(error[err])
        }
        dispatch(clearErrors())
      }
    if (isAuthenticated) {
      navigate("/")
      window.location.reload()
    }
  }, [isAuthenticated, dispatch, error, navigate, alert])
  return (
    <div className="login_section">
      <div className="section_heading">
        <h3>Sign Up to NBA</h3>
      </div>
      <div className="continue_btns">
        <input
          placeholder="Name"
          className="login_first_input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="on"
        />
        <input
          placeholder="Email"
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
        />
        <input
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <input
          placeholder="Confirm Password"
          value={cPassword}
          onChange={(e) => setCPassword(e.target.value)}
          type="password"
        />
      </div>
      <div className="login_btn">
        <button onClick={registerUser}>Continue</button>
      </div>
      <div className="line">
        <hr />
      </div>
      <div className="joining_section">
        <p className="login_p">
          Already registered?
          <span className="c_green cursor_ptr"> Login now</span>
        </p>
      </div>
    </div>
  )
}

export default Register
