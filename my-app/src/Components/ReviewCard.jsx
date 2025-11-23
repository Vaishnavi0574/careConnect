import React from "react";
import { IoIosStar } from "react-icons/io";
import avatar from '../assets/images/avatar.jpg'


const ReviewCard = ({text,profilePic,name,time}) => {
  return (
    <div className="flex flex-col items-start justify-between gap-0 ">
      {/* Message Box */}
      <div className="relative bg-white flex flex-col min-h-[15.5rem] lg:min-h-[18.5rem] justify-between shadow-md rounded-2xl p-6 max-w-md">
        <p className="text-gray-700 text-[0.7rem] lg:text-[1rem] sm:text-[0.8rem] leading-relaxed ">
          {text}
        </p>

        {/* Stars */}
        <div className="flex items-center gap-1 mt-4">
          {[...Array(5)].map((_, i) => (
            <IoIosStar key={i} className="text-amber-400 lg:w-5 lg:h-5" />
          ))}
        </div>

        {/* Speech bubble tail */}
        <div className="absolute -bottom-2 left-10 w-4 h-4 bg-white rotate-45 shadow-md"></div>
      </div>

      {/* Reviewer info */}
      <div className="flex items-center gap-3 mt-6 ml-2">
        {profilePic ? (
  <img
    src={profilePic}
    alt="Profile"
    className="w-10 h-10 rounded-full object-cover"
  />
) : (
  <img
    src={avatar}
    alt="Default Profile"
    className="w-10 h-10 rounded-full object-cover"
  />
)}

        <div>
          <h4 className="font-semibold text-gray-800">{name}</h4>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
