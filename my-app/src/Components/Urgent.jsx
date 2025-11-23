import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Urgent = ({setNewRequest,isNewRequest}) => {
  const [urgency, setUrgency] = useState("");
  const navigate=useNavigate();

    const handleSubmit = (e) => {
    e.preventDefault();

    if (!isNewRequest) return;

    if (!urgency) {
      toast.warning(" Please select one option before continuing.");
      return;
    }

    if (urgency === "urgent") {
      toast.success(" Redirecting to urgent request form...");
      setTimeout(() => navigate("/newrequest/urgent", { state: { urgency } }), 1200);
    }

    if (urgency === "non-urgent") {
      toast.info(" Redirecting to non-urgent request form...");
      setTimeout(() => navigate("/newrequest/nonurgent", { state: { urgency } }), 1200);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen min-w-[50%] sm:min-w-[45%]">
      <div className="text-white rounded-2xl shadow-lg w-full max-w-md p-4 sm:p-6 bg-white/25 backdrop-blur-md border border-white/20">
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 sm:mb-6">
          Do you need urgent help?
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Urgent Help Option */}
          <label
            className={`flex items-center gap-3 p-3 sm:p-4 border-2 rounded-xl cursor-pointer transition ${
              urgency === "urgent"
                ? "border-[#0A4174] bg-[#E2ECF5] text-[#0a4174]"
                : "border-gray-300 hover:border-[#4E8EA2]"
            }`}
          >
            <input
              type="radio"
              name="urgency"
              value="urgent"
              checked={urgency === "urgent"}
              onChange={() => setUrgency("urgent")}
              className="accent-[#0A4174] w-5 h-5"
            />
            <div>
              <p className={`font-medium `}>⚡ Urgent Help</p>
              <p className={` text-sm ${
                urgency==='urgent'?"text-gray-700": "text-gray-200"
              }`}>Yes, I need help right away.</p>
            </div>
          </label>

          {/* Non-Urgent Option */}
          <label
            className={`flex items-center gap-3 p-3 sm:p-4  border-2 rounded-xl cursor-pointer transition ${
              urgency === "non-urgent"
                ? "border-[#0A4174] text-[#0a4174] bg-[#E2ECF5]"
                : "border-gray-300 hover:border-[#4E8EA2]"
            }`}
          >
            <input
              type="radio"
              name="urgency"
              value="non-urgent"
              checked={urgency === "non-urgent"}
              onChange={() => setUrgency("non-urgent")}
              className="accent-[#0A4174] w-5 h-5"
            />
            <div>
              <p className=" font-medium">⏳ Schedule for later</p>
              <p className={` text-sm ${
                urgency==='non-urgent'?"text-gray-700": "text-gray-200"
              }`}>No rush, I need it later.</p>
            </div>
          </label>

          <div className="w-full flex justify-center gap-4 items-center">
            <button
            type="button"
            className="sm:mt-4 bg-[#7c858e] text-white py-2 px-4 rounded-xl hover:bg-[#49769F] transition w-full"
            onClick={()=>setNewRequest(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="sm:mt-4 bg-[#0A4174] text-white py-2 px-4 rounded-xl hover:bg-[#49769F] transition w-full" 
        
          >
            Continue
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Urgent;
