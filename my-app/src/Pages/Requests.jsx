import { useState, useEffect } from "react";
import request_bg from "../assets/images/request_bg.jpg";
import service_data from "../assets/Data/service_data";
import { REQUEST_API_BASE_URL } from "../config/api";
import { toast, ToastContainer } from "react-toastify"
const Requests = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectCategory, setSelectCategory] = useState("All");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchRequests = async () => {
    try {
      const res = await fetch(
        `${REQUEST_API_BASE_URL}/allrequests?category=${selectCategory}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      setRequests(data.requests);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchRequests();
}, [selectCategory]); 


  const acceptThisRequest = async (id) => {
  try {
    const res = await fetch(`${REQUEST_API_BASE_URL}/accept/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Error accepting request");
      return;
    }

    // ⭐ AUTO REMOVE CARD (no click needed)
    setRequests((prev) => prev.filter((req) => req._id !== id));

    // ⭐ TOAST SUCCESS
    toast.success("Request accepted!");

  } catch (error) {
    console.error("Accept Error:", error);
    toast.error("Something went wrong");
  }
};



  const handleShowToggle = () =>
    setVisibleCount((prev) => (prev > 6 ? 6 : prev + 3));

  return (
    <div className="p-6 text-gray-800">
      <header
        className="bg-center bg-cover bg-no-repeat text-white rounded-xl p-5 sm:p-7 mx-auto mb-10 shadow-md hover:shadow-lg"
        style={{ backgroundImage: `url(${request_bg})` }}
      >
        <h1 className="text-[1.8rem] sm:text-4xl font-bold mb-3">
          Requests That Can Wait — But Still Matter
        </h1>
        <p className="text-gray-200 max-w-2xl text-sm sm:text-[1rem]">
          These requests may not be urgent, but they still matter.
          Choose a task, lend your time, and help someone when it suits you best.
        </p>
      </header>

      <section className="mx-auto mb-12">
        <h2 className="text-2xl font-semibold text-[#23689d] mb-4">
          Top Categories
        </h2>
        

        <div
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-3"
          style={{ scrollSnapType: "x mandatory" }}
        >
          
          {service_data.map(({ id, title, icon: Icon }) => (
            <div
              key={id}
              onClick={() => setSelectCategory(title === "MANY MORE" ? "OTHERS" : title)}
              className={`flex-shrink-0 min-w-[220px] sm:min-w-[260px] flex items-center gap-4
              ${id % 4 === 0 ? "bg-[#6ea2b3]" :
                id % 4 === 1 ? "bg-[#4e8ea2]" :
                id % 4 === 2 ? "bg-[#49769f]" :
                "bg-[#7bbde8]"}
              px-5 py-4 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.03]
              transition-all duration-300 cursor-pointer
              ${selectCategory === title ? "  shadow-2xl shadow-blue-600 border-3 border-b-blue-350 " : ""}`}
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-[#23689d]/30 text-[#23689d]">
                {Icon && <Icon className="w-6 h-6 sm:w-8 sm:h-8" />}
              </div>
              <span className="font-semibold text-white">
                {title === "MANY MORE" ? "OTHERS" : title}
              </span>
            </div>
          ))}

        </div>
      </section>

      <section className="mx-auto">
        <h2 className="text-2xl font-semibold text-[#23689d] mb-6">Requests</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : requests.length === 0 ? (
          <p className="text-center text-gray-500">No requests found.</p>
        ) : (
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            {requests.slice(0, visibleCount).map((a, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:scale-[1.03] transition-all duration-300 space-y-3">
                <p className="text-sm text-[#23689d] font-medium">
                  {a.category}
                </p>

                <h3 className="font-semibold text-lg text-[#1f456e]">
                  {a.description}
                </h3>

                <div className="flex gap-2">
                  <p className="text-gray-800">{a.price}</p>
                  <p className="text-gray-500">
                    {a.negotiable ? "(Negotiable)" : "(Non-negotiable)"}
                  </p>
                </div>

                <div>
                  <p className="text-[0.9rem] text-gray-700">
                    {a.userName}
                  </p>
                  <p className="text-[0.8rem] text-gray-400">
                    {timeAgo(a.createdAt)}
                  </p>


                  <p className="text-[0.9rem]     text-gray-700 font-medium">
                    {a.createdBy?.name || "Unknown"}
                  </p>

                </div >
                  <button onClick={()=>acceptThisRequest(a._id)}>
                    <p className="text-[0.9rem]  text-[#1f456e] border-2 border-[#48759c] bg-[#b6d9f8] px-4 py-[2px] rounded-full hover:bg-[#7dbbf1] mt-2">
                      Accept
                    </p>
                  </button>

              </div>
            ))}
          </div>
        )}

         {requests.length >6 ?<div className="flex justify-center mt-8">
          <button
            onClick={handleShowToggle}
            className="px-8 py-2 bg-[#23689d] text-white font-medium rounded-full hover:bg-[#1f456e] hover:scale-105 transition-all duration-300 shadow-md"
          >
            {visibleCount > 6 ? "Show Less" : "Show More"}
          </button>
        </div>:""}
      </section>
    </div>
  );
};
const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (let key in intervals) {
    const interval = Math.floor(seconds / intervals[key]);
    if (interval >= 1) return `${interval} ${key}${interval > 1 ? "s" : ""} ago`;
  }

  return "just now";
};

export default Requests;
