import React, { useState } from "react";
import { FaCog } from "react-icons/fa";
import Account_settings from "../Components/Account_setting";
import Login_settings from "../Components/Login_settings";
import Notification_settings from "../Components/Notification_settings";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="bg-[#BDD8E9] flex justify-center items-center p-6 md:p-10 transition-all duration-700">
      <div className="w-full bg-[#5295b7] border border-[#bdd8e9] shadow-xl rounded-2xl p-6 md:p-8 transition-all duration-500">
        <div className="flex flex-col gap-4">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#bdd8e9] pb-4">
            <div className="flex gap-3 items-center">
              <FaCog size={20} />
              <h2 className="text-[#001D39] font-semibold text:lg md:text-xl tracking-wide">
                Settings
              </h2>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-3">
            <Tab
              label="Account Settings"
              id="account"
              active={activeTab === "account"}
              onClick={() => setActiveTab("account")}
            />
            <Tab
              label="Login & Security"
              id="login"
              active={activeTab === "login"}
              onClick={() => setActiveTab("login")}
            />
            <Tab
              label="Notifications"
              id="notification"
              active={activeTab === "notification"}
              onClick={() => setActiveTab("notification")}
            />
            
          </div>
          {console.log(activeTab)}
          {/* Active Tab Content */}
          {activeTab === "account" ? (
            <Account_settings />
          ) : activeTab === "login" ? (
            <Login_settings />
          ) : activeTab === "notification" ? (
            <Notification_settings />
          ) : (
            <div className="bg-[#eaf2f6] rounded-2xl border border-[#bdd8e9] p-10 text-center text-[#4E8EA2]">
              {activeTab} settings coming soon...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function Tab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl border transition-all duration-300 text-sm font-medium ${
        active
          ? "bg-[#4E8EA2] text-white"
          : "bg-[#eaf2f6] text-[#001D39] border border-[#bdd8e9] hover:bg-[#bdd8e9] active:bg-[#4E8EA2] active:text-white"
      }`}
    >
      {label}
    </button>
  );
}

export default Settings;
