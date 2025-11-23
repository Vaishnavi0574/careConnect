import React from 'react';
import { CiLogout } from 'react-icons/ci';
import { FaCog, FaEdit, FaHome, FaUser } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore"; // ✅ Import your auth store

const SideBar = ({ 
  isSideBar, setSideBar, 
  isRequest, setIsRequest, 
  isProfile, setIsProfile, 
  isSetting, setIsSettings, 
  isNewRequest, setNewRequest 
}) => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const name= useAuthStore((state)=>state.user?.name || "")
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    logout(); 
    navigate("/"); 
  };

  return (
    <aside
      className={`w-64 bg-[#001D39] absolute overflow-auto shadow-lg z-30 flex flex-col justify-between text-white md:fixed top-0 left-0 h-full transform transition-transform duration-700 ease-in-out md:duration-0
        ${isSideBar ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className='relative'>
        <IoClose className='absolute right-2 top-2 w-6 h-6 md:hidden' onClick={()=>setSideBar(false)}/>
        
        <div className="p-6 flex items-center gap-2 cursor-pointer" onClick={() => navigate("/dashboard")}>
          {/* Avatar */}
          <div className="w-10 h-10 bg-[#7BBDE8] rounded-full flex items-center justify-center font-bold text-[#001D39]">
            {initials}
          </div>
          <h1 className="text-xl font-bold">{name}</h1>
        </div>

        <button 
          className="mx-6 my-4 bg-[#4E8EA2] hover:bg-[#6EA2B3] text-white font-medium py-2 px-4 rounded-lg transition text-[0.9rem] md:text-[1rem]" 
          onClick={() => { setNewRequest(true); }}
        >
          + Post New Request
        </button>

        <nav className="md:mt-4 md:space-y-2 text-[0.8rem] md:text-[1rem]">
          <button
            className="flex items-center w-full gap-3 text-[#BDD8E9] hover:bg-[#0A4174] px-6 py-2 transition"
            onClick={() => navigate("/")}
          >
            <FaHome />
            <span>Home</span>
          </button>

          <button
            className={`flex items-center w-full gap-3 hover:bg-[#0A4174] hover:text-[#BDD8E9] px-6 py-2 transition ${
              isProfile ? "bg-[#7BBDE8] text-[#001D39]" : "text-[#BDD8E9]"
            }`}
            onClick={() => {
              navigate("/dashboard");
              setIsProfile(true);
              setIsRequest(false);
              setIsSettings(false);
            }}
          >
            <FaEdit />
            <span>Dashboard</span>
          </button>

          <button
            className={`flex items-center w-full gap-3 hover:bg-[#0A4174] hover:text-[#BDD8E9] px-6 py-2 transition ${
              isRequest ? "bg-[#7BBDE8] text-[#001D39]" : "text-[#BDD8E9]"
            }`}
            onClick={() => {
              navigate("/dashboard/requests");
              setIsProfile(false);
              setIsRequest(true);
              setIsSettings(false);
            }}
          >
            <FaUser />
            <span>Requests</span>
          </button>

          <button
            className={`flex items-center w-full gap-3 hover:bg-[#0A4174] hover:text-[#BDD8E9] px-6 py-2 transition ${
              isSetting ? "bg-[#7BBDE8] text-[#001D39]" : "text-[#BDD8E9]"
            }`}
            onClick={() => {
              navigate("/dashboard/settings");
              setIsProfile(false);
              setIsRequest(false);
              setIsSettings(true);
            }}
          >
            <FaCog />
            <span>Settings</span>
          </button>

          {/* ✅ Logout Button */}
          <button
            className="flex items-center w-full gap-3 text-[#BDD8E9] hover:bg-[#0A4174] px-6 py-2 transition"
            onClick={handleLogout}
          >
            <CiLogout />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      <div className="p-6 border-t border-[#49769F]">
        <div className="bg-[#4E8EA2] rounded-lg p-3 text-center">
          <p className="text-sm text-white">Upgrade to PRO</p>
          <button 
            className="mt-2 bg-[#7BBDE8] text-[#001D39] px-4 py-1 rounded-lg text-sm font-semibold hover:bg-[#6EA2B3] transition"
            onClick={()=>navigate("/upgrade")}
          >
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
