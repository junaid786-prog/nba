import React, { useState } from "react"
import { AddPlayerTab, ManageTeamTab, MyTeamTab } from "../components/Tabs"
import "../css/dashboard.css"

const Dashboard = () => {
  const [tabIndex, setTabIndex] = useState(1)
  const [activeTab, setActiveTab] = useState(1)

  const setTabIndexFunction = (i) => {
    setTabIndex(i)
    setActiveTab(i)
  }
  return (
    <div className="dashboard_container">
      <div className="tabs_buttons">
        <button
          onClick={() => {
            setTabIndex(1)
            setActiveTab(1)
          }}
          className={activeTab === 1 ? "active_tab_button" : undefined}
        >
          My Team
        </button>
        <button
          onClick={() => {
            setTabIndex(2)
            setActiveTab(2)
          }}
          className={activeTab === 2 ? "active_tab_button" : undefined}
        >
          Manage Team
        </button>
        <button
          onClick={() => {
            setTabIndex(3)
            setActiveTab(3)
          }}
          className={activeTab === 3 ? "active_tab_button" : undefined}
        >
          Add Player
        </button>
      </div>
      <div className="specific_tab">
        {tabIndex === 1 && <MyTeamTab setTabIndex={setTabIndexFunction} />}
        {tabIndex === 2 && <ManageTeamTab setTabIndex={setTabIndexFunction} />}
        {tabIndex === 3 && <AddPlayerTab />}
      </div>
    </div>
  )
}

export default Dashboard
