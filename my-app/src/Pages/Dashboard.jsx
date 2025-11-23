import React, { useEffect, useState } from "react";
import SideBar from "../Components/SideBar";
import Header from "../Components/Header";
import Profile from "./Profile";
import Requests from "./Requests";
import Settings from "./Settings";
import Urgent from "../Components/Urgent";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
    const [isSideBar,setSideBar]=useState(false);
    const [isWindowMd,setWindowMd]=useState(true); 

    const [isRequest,setIsRequest]=useState(false);
    const [isSetting,setIsSettings]=useState(false);
    const [isProfile,setIsProfile]=useState(true);
    const [isNewRequest,setNewRequest]=useState(false);
    
    const handleSideBar=()=>{
        if(window.innerWidth<768){
            setWindowMd(false)
        }else{
            setWindowMd(true)
        }
    }

    useEffect(() => {
        handleSideBar();
        window.addEventListener("resize", handleSideBar);
        return () => {
          window.removeEventListener("resize", handleSideBar);
        };
      }, []);

  return (
    <div className={`flex h-screen bg-[#BDD8E9] font-sans overflow-hidden relative`}>
      <ToastContainer position="top-center"   autoClose={3000} hideProgressBar={false} className="p-3"/>
      {isNewRequest && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <Urgent setNewRequest={setNewRequest} isNewRequest/>
          </div>
        )}

      {!isWindowMd && isSideBar && (
        <div
          className="fixed inset-0 md:bg-blue-50 bg-transparent bg-opacity-40 backdrop-blur-sm z-20 "
          onClick={() => setSideBar(false)}
        ></div>
      )}

      {isWindowMd ? (
        <SideBar isSideBar={true} setSideBar={setSideBar} isRequest={isRequest} setIsRequest={setIsRequest} isProfile={isProfile} setIsProfile={setIsProfile} isSetting={isSetting} setIsSettings={setIsSettings} isNewRequest={isNewRequest} setNewRequest={setNewRequest}/>
      ) : (
        <SideBar isSideBar={isSideBar} setSideBar={setSideBar} isRequest={isRequest} setIsRequest={setIsRequest} isProfile={isProfile} setIsProfile={setIsProfile} isSetting={isSetting} setIsSettings={setIsSettings} isNewRequest={isNewRequest} setNewRequest={setNewRequest}/>
      )}

      {/* Main Content */}
      <div className="flex-1 min-h-[100vh] ml-0 md:ml-64 flex flex-col overflow-y-auto relative z-10">
        {/* Header */}
        <Header isSideBar={isSideBar} setSideBar={setSideBar}/>
        
        {
            isProfile ?
                <Profile/>
            : isRequest ?
                <Requests/>
            : isSetting ?
                <Settings/>
            :
                <Profile/>
        }
      </div>
    </div>
  );
};

export default Dashboard;
