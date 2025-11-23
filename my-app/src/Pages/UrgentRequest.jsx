import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { REQUEST_API_BASE_URL } from "../config/api.js";
import useAuthStore from "../store/useAuthStore.js";
import service_data from "../assets/Data/service_data.js";
// import { useNavigate } from "react-router-dom";

const UrgentRequest = () => {
  const [activeStep, setActiveStep] = useState(1);
  const location=useLocation()
  const urgency =location.state?.urgency
  const userId = useAuthStore((state) => state.user?._id);
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    category: "",
    price: "",
    negotiable: "",
    term: "",
    startDate: "",
    endDate: "",
    description: "",
    requestingFor: "",
    name: "",  
    phone: "",
    address: "",
    additionalInstructions: ""
  });
  // console.log(formData.urgency)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const requiredFieldsStep1 = ["category", "price", "term", "description"];
    const requiredFieldsStep2 = ["requestingFor"];

    if (activeStep === 1) {
      for (let field of requiredFieldsStep1) {
        if (!formData[field]) {
          toast.error(`Please fill in the ${field} field.`);
          return false;
        }
      }

      // endDate should be greater than start date
      // ✅ Long-term validation with start date constraint
      if (formData.term === "long") {
        if (!formData.startDate || !formData.endDate) {
          toast.error("Please provide both start and end dates for long-term requests.");
          return false;
        }

        const today = new Date();
        const startDate = new Date(formData.startDate);
        const endDate=new Date(formData.endDate);
        if(urgency==='urgent'){
          const twoDaysLater = new Date();
          twoDaysLater.setDate(today.getDate() + 2);

          

          if (startDate < today.getDate() || startDate > twoDaysLater) {
            toast.error("Start date must be within 2 days from today.");
            return false;
          }
          if(startDate>endDate){
            toast.error("End date must be greater.");
            return false;
          }
        }
        else{
          if(startDate>endDate){
            toast.error("End date must be greater.");
            return false;
          }
        }
      }
    }

    if (activeStep === 2) {
      for (let field of requiredFieldsStep2) {
        if (!formData[field]) {
          toast.error(`Please select who you are requesting for.`);
          return false;
        }
      }

      if (formData.requestingFor === "someone") {
        if (!formData.name || !formData.address) {
          toast.error("Please fill name and address for 'someone else'.");
          return false;
        }
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateForm()) setActiveStep(2);
  };

  const handleBack = () => setActiveStep(1);

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  try {
    if (!userId) {
      toast.error("User not logged in!");
      return;
    }

    const payload = {
      ...formData,
      createdBy: userId,   // pulled from auth store
      urgency: urgency,    // pulled from location.state
    };
    const response = await fetch(`${REQUEST_API_BASE_URL}/submitrequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message || "Something went wrong");
      return;
    }

    toast.success("Request submitted successfully!");
    console.log("Request Created:", data);

    // reset form
    setFormData({
      category: "",
      price: "",
      negotiable: "",
      term: "",
      startDate: "",
      endDate: "",
      description: "",
      requestingFor: "",
      name: "",
      phone: "",
      address: "",
      additionalInstructions: "",
      urgency: urgency,
    });

    setActiveStep(1);
    setTimeout(() => {
    navigate("/dashboard");
  }, 2000);
  } catch (err) {
    console.error(err);
    toast.error("Network error. Please try again.");
  }
};


  return (
    <div className="flex flex-col  items-center justify-center min-h-screen bg-blue-50 py-9 lg:py-5 px-5">
      <div className="bg-white shadow-md rounded-2xl
      min-w-[90%] md:min-w-[80%] xl:min-w-[60%] p-5 sm:p-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-4 sm:mb-8">
          Create New Request
        </h2>

        {/* Step Indicator */}
        <div className="relative w-64 mx-auto mb-2 sm:mb-4">
          <div className="flex justify-between">
            {[1, 2].map((num) => (
              <button
                key={num}
                onClick={() => setActiveStep(num)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors z-20 ${
                  activeStep === num
                    ? "bg-[#052659] text-white"
                    : "bg-gray-200 text-gray-600 hover:text-[#052659]"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 rounded-full transform -translate-y-1/2"></div>
          <div
            className={`absolute top-1/2 w-1/2 h-1 bg-[#052659] rounded-full transform -translate-y-1/2 transition-all duration-500 ease-in-out ${
              activeStep === 2 ? "translate-x-full" : "translate-x-0"
            }`}
          ></div>
        </div>

        {/* Step Labels */}
        <div className="flex justify-center gap-28 text-sm mb-4 sm:mb-6 px-3">
          <p
            className={`font-medium ${
              activeStep === 1 ? "text-[#052659]" : "text-gray-600"
            }`}
          >
            Request Details
          </p>
          <p
            className={`font-medium ${
              activeStep === 2 ? "text-[#052659]" : "text-gray-600"
            }`}
          >
            Contact Details
          </p>
        </div>

        {/* Step 1 Form */}
        {activeStep === 1 && (
          <form className="grid grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-md p-2 sm:text-[1rem] text-sm focus:outline-[#0a377b]"
              >
                 <option value="">Select category</option>

                {service_data.filter((item)=>item.id<9).map((item) => (
                  <option key={item.id} value={item.title}>
                    {item.title}
                  </option>
                ))}
                <option value='OTHERS'>OTHERS</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price 
                <span className="text-red-500"> *</span>
                <span className="text-xs text-gray-400 pl-1">{formData.term==="long" && (<>(Please provide price for full duration)</>)}</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="w-full border rounded-md p-2 focus:outline-[#0a337b] sm:text-[1rem] text-sm "
              />
            </div>

            {/* Negotiable */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Negotiable
              </label>
              <div className="flex gap-4 mt-2 sm:mt-1 sm:text-[1rem] text-sm ">
                <label>
                  <input
                    type="radio"
                    name="negotiable"
                    value="yes"
                    checked={formData.negotiable === "yes"}
                    onChange={handleChange}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="negotiable"
                    value="no"
                    checked={formData.negotiable === "no"}
                    onChange={handleChange}
                  />{" "}
                  No
                </label>
              </div>
            </div>

            {/* Term Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Term <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4 mt-2 sm:mt-1 sm:text-[1rem] text-sm ">
                <label>
                  <input
                    type="radio"
                    name="term"
                    value="short"
                    checked={formData.term === "short"}
                    onChange={handleChange}
                  />{" "}
                  Short Term
                </label>
                <label>
                  <input
                    type="radio"
                    name="term"
                    value="long"
                    checked={formData.term === "long"}
                    onChange={handleChange}
                  />{" "}
                  Long Term
                </label>
              </div>
            </div>

            {/* Duration for Long Term */}
            {formData.term === "long" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date <span className="text-red-500"> *</span>      
                  </label>
                  
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2 sm:text-[1rem] text-sm focus:outline-[#0a337b]"
                    min={urgency === "urgent" ? new Date().toISOString().split("T")[0] : new Date(
                      Date.now() + 2 * 24 * 60 * 60 * 1000
                    ).toISOString().split("T")[0]}
                    max={urgency === "urgent" ? new Date(
                      Date.now() + 2 * 24 * 60 * 60 * 1000
                    ).toISOString().split("T")[0] : undefined}
                  />
                  
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date <span className="text-red-500"> *</span>
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2 sm:text-[1rem] text-sm focus:outline-[#0a337b]"
                    min={formData.startDate? formData.startDate.split("T")[0]: urgency==="urgent"? new Date(
                      ).toISOString().split("T")
                    : new Date(
                      Date.now() + 2 * 24 * 60 * 60 * 1000
                    ).toISOString().split("T")[0]}
                  />
                </div>
              </>
            )}

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your request"
                className="w-full border rounded-md p-2 sm:text-[1rem] text-sm focus:outline-[#0a337b]"
              ></textarea>
            </div>

            <div className="col-span-2 flex justify-end mt-6">
              <button
                type="button"
                onClick={handleNext}
                className="bg-[#052659] text-white py-1.5 px-6 rounded-md sm:text-[1rem] text-sm hover:bg-[#021838]"
              >
                Next
              </button>
            </div>
          </form>
        )}

        {/* Step 2 Form */}
        {activeStep === 2 && (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700  mb-1">
                Requesting Help for? <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4 mt-1 sm:text-[1rem] text-sm">
                <label>
                  <input
                    type="radio"
                    name="requestingFor"
                    value="yourself"
                    checked={formData.requestingFor === "yourself"}
                    onChange={handleChange}
                  />{" "}
                  Yourself
                </label>
                <label>
                  <input
                    type="radio"
                    name="requestingFor"
                    value="someone"
                    checked={formData.requestingFor === "someone"}
                    onChange={handleChange}
                  />{" "}
                  Someone Else
                </label>
              </div>
            </div>

            {formData.requestingFor === "someone" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full border rounded-md p-2 sm:text-[1rem] text-sm focus:outline-[rgb(10,55,123)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full border rounded-md p-2 sm:text-[1rem] text-sm  focus:outline-[#0a337b]"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                    className="w-full border rounded-md p-2 sm:text-[1rem] text-sm focus:outline-[#0a337b]"
                  ></textarea>
                </div>
              </>
            )}

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Instructions
              </label>
              <textarea
                name="additionalInstructions"
                value={formData.additionalInstructions}
                onChange={handleChange}
                placeholder="Enter any notes or special instructions"
                className="w-full border rounded-md p-2 sm:text-[1rem] text-sm focus:outline-[#0a337b]"
              ></textarea>
            </div>

            <div className="col-span-2 flex justify-between mt-6">
              <button
                type="button"
                onClick={handleBack}
                className="border bg-gray-100 border-gray-400 text-gray-700 py-1.5 px-6 rounded-md sm:text-[1rem] text-sm hover:bg-gray-200"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-[#052659] text-white py-1.5 px-6 rounded-md sm:text-[1rem] text-sm hover:bg-[#021839]"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        toastClassName="rounded-xl shadow-lg"
      />
    </div>
  );
};

export default UrgentRequest;