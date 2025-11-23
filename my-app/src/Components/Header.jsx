import React from 'react'
import { FaBars } from 'react-icons/fa'
import useAuthStore from '../store/useAuthStore.js'

const Header =  ({isSideBar,setSideBar}) => {
  const name= useAuthStore((state)=>state.user?.name || "")
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return (
    <div>
      <header className="bg-[#0A4174] shadow-sm flex justify-between items-center px-6 py-4 text-white sticky top-0 z-20">
        <div>
          <h2 className="text-xs sm:text-sm opacity-80">Dashboard</h2>
          <h1 className="sm:text-lg font-bold">
            {new Date().toLocaleDateString(undefined, {
              weekday: 'long',
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </h1>
        </div>


        <div className="flex items-center gap-4">
            <button className="md:hidden" onClick={()=>{setSideBar(!isSideBar)}}>
            <FaBars size={20} />
            </button>

            <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#7BBDE8] flex items-center justify-center rounded-full text-sm font-bold text-[#001D39]">
                {initials}
            </div>
            <span className="hidden sm:block font-medium">{name}</span>
            </div>
        </div>
        </header>
    </div>
  )
}

export default Header
