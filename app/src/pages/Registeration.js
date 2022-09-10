import { useState } from "react"
import LoginSection from "../components/Login"
import Register from "../components/Register"
import "../css/registeration.css"

const Registeration = () => {
  const [tabIndex, setTabIndex] = useState(1)
  return (
    <div className="registeration_main">
      <div className="tabs_button">
        <button
          onClick={() => setTabIndex(1)}
          className={tabIndex === 1 ? "active_tab_btn" : undefined}
        >
          Register User
        </button>
        <button
          onClick={() => setTabIndex(2)}
          className={tabIndex === 2 ? "active_tab_btn" : undefined}
        >
          Login User
        </button>
      </div>
      <div className="selected_tab">
        {tabIndex === 2 && <LoginSection />}
        {tabIndex === 1 && <Register />}
      </div>
    </div>
  )
}

export default Registeration
