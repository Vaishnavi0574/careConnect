import React, { useState, useEffect } from 'react';
import { MdOutlinePendingActions } from 'react-icons/md';
import useAuthStore from '../store/useAuthStore.js';
import { REQUEST_API_BASE_URL } from "../config/api.js";
import { io } from "socket.io-client";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Connect to backend socket
const socket = io("http://localhost:3000"); // match your backend URL

const Profile = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [completedRequests, setCompletedRequests] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  
  const name = useAuthStore((state) => state.user?.name || "");
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase();
  const [myTab, setMyTab] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const tasksRes = await fetch(`${REQUEST_API_BASE_URL}/mytasks`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const taskData = await tasksRes.json();
        if (taskData.success) {
          setPendingTasks(taskData.pendingTasks);
          setCompletedTasks(taskData.completedTasks);
        }

        const reqRes = await fetch(`${REQUEST_API_BASE_URL}/myrequests`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const reqData = await reqRes.json();
        if (reqData.success) {
          setPendingRequests(reqData.pendingRequests);
          setCompletedRequests(reqData.completedRequests);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();

    // Listen for new requests via Socket.IO
    socket.on("newRequest", (newReq) => {
      toast.info(`New request made: ${newReq.category}`);
      setPendingRequests(prev => [newReq, ...prev]);
    });

    return () => {
      socket.off("newRequest");
    };
  }, []);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <section className="bg-[#7BBDE8] m-6 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-center text-[#001D39]">
        <div>
          <h2 className="text-2xl font-bold">Hi, {name.split(" ")[0]}</h2>
          <p className="text-[#0A4174] text-sm ms:text-[1rem]">
            Need help with some task of your day? We're here for you
          </p>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
          alt="Illustration"
          className="w-24 h-24 sm:w-28 sm:h-28 mt-4 sm:mt-0"
        />
      </section>

      {/* Overview Cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6">
        {[
          { color: "#4E8EA2", label: "Pending Tasks", value: pendingTasks.length },
          { color: "#6EA2B3", label: "Completed Tasks", value: completedTasks.length },
          { color: "#7BBDE8", label: "Pending Requests", value: pendingRequests.length },
          { color: "#49769F", label: "Completed Requests", value: completedRequests.length },
        ].map((item, i) => (
          <div
            key={i}
            className="p-4 rounded-xl text-white flex flex-col justify-center shadow-md hover:scale-105 transition-transform duration-300 ease-in-out"
            style={{ backgroundColor: item.color }}
          >
            <h3 className="text-2xl font-bold">{item.value}</h3>
            <p className="text-sm">{item.label}</p>
          </div>
        ))}
      </section>

      {/* Tab buttons */}
      <section className="px-6 pt-8">
        <div className={`grid gap-3 grid-cols-2 sm:w-[69%] lg:w-[45%] xl:w-[35%]`}>
          <button
            className={`px-8 py-2 min-h-[2.8rem] transition-all duration-200 w-full relative
              ${myTab ? "bg-blue-50 text-black rounded-t-lg z-10 translate-y-0"
                      : "bg-[#447cb0] text-white rounded-lg translate-y-[-0.4rem] shadow-lg"}`}
            onClick={() => setMyTab(true)}
          >
            My Tasks
          </button>

          <button
            className={`px-8 py-2 min-h-[2.8rem] transition-all duration-200 w-full relative
              ${!myTab ? "bg-blue-50 text-black rounded-t-lg z-10 translate-y-0"
                       : "bg-[#447cb0] text-white rounded-lg translate-y-[-0.4rem] shadow-lg"}`}
            onClick={() => setMyTab(false)}
          >
            My Requests
          </button>
        </div>
      </section>

      {/* Tasks & Requests Sections */}
      {myTab ? (
        <div className={`grid grid-cols-1 lg:grid-cols-2 px-9 gap-7 ${myTab ? "bg-blue-50":""}`}>
          {/* Pending Tasks */}
          <section className="py-5 transition-colors duration-300">
            <h2 className="font-semibold text-[#001D39] text-xl mb-4">Pending Tasks</h2>
            <div className="space-y-4">
              {pendingTasks.length === 0 && <p>No pending tasks.</p>}
              {pendingTasks.map((task, i) => (
                <div key={i} className="rounded-xl p-4 shadow-sm bg-blue-100 flex justify-between items-center border border-[#BDD8E9]">
                  <div className="flex items-center gap-4">
                    <MdOutlinePendingActions className="w-7 h-7 text-[#001D39]" />
                    <div>
                      <h3 className="font-semibold text-[#001D39]">{task.category}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <input type="checkbox" className="accent-[#7BBDE8]" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Completed Tasks */}
          <section className="py-5 transition-colors duration-300">
            <h2 className="font-semibold text-[#001D39] text-xl mb-4">Completed Tasks</h2>
            <div className="space-y-4">
              {completedTasks.length === 0 && <p>No completed tasks.</p>}
              {completedTasks.map((task, i) => (
                <div key={i} className="rounded-xl p-4 shadow-sm bg-blue-100 flex justify-between items-center border border-[#BDD8E9]">
                  <div className="flex items-center gap-4">
                    <MdOutlinePendingActions className="w-7 h-7 text-[#001D39]" />
                    <div>
                      <h3 className="font-semibold text-[#001D39]">{task.category}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <input type="checkbox" className="accent-[#7BBDE8]" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className={`grid grid-cols-1 lg:grid-cols-2 px-9 gap-7 ${!myTab ? "bg-blue-50":""}`}>
          {/* Pending Requests */}
          <section className="py-5 transition-colors duration-300">
            <h2 className="font-semibold text-[#001D39] text-xl mb-4">Pending Requests</h2>
            <div className="space-y-4">
              {pendingRequests.length === 0 && <p>No pending requests.</p>}
              {pendingRequests.map((req, i) => (
                <div key={i} className="rounded-xl p-4 shadow-sm bg-blue-100 flex justify-between items-center border border-[#BDD8E9]">
                  <div className="flex items-center gap-4">
                    <MdOutlinePendingActions className="w-7 h-7 text-[#001D39]" />
                    <div>
                      <h3 className="font-semibold text-[#001D39]">{req.category}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <input type="checkbox" className="accent-[#7BBDE8]" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Completed Requests */}
          <section className="py-5 transition-colors duration-300">
            <h2 className="font-semibold text-[#001D39] text-xl mb-4">Completed Requests</h2>
            <div className="space-y-4">
              {completedRequests.length === 0 && <p>No completed requests.</p>}
              {completedRequests.map((req, i) => (
                <div key={i} className="rounded-xl p-4 shadow-sm bg-blue-100 flex justify-between items-center border border-[#BDD8E9]">
                  <div className="flex items-center gap-4">
                    <MdOutlinePendingActions className="w-7 h-7 text-[#001D39]" />
                    <div>
                      <h3 className="font-semibold text-[#001D39]">{req.category}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <input type="checkbox" className="accent-[#7BBDE8]" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default Profile;
