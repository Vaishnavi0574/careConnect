import React, { useEffect } from "react";

const UpGrade = () => {
  useEffect(() => {
    // Load Razorpay script dynamically
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleUpgrade = () => {
    const options = {
      key: "rzp_test_1234567890abcdef", // Dummy test key (replace with yours)
      amount: 10000, // ₹100 (in paise)
      currency: "INR",
      name: "Demo Company",
      description: "Upgrade Plan (Demo)",
      image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Razorpay_logo.svg",
      handler: function (response) {
        alert("Payment Successful (demo): " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleUpgrade}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
      >
        Upgrade
      </button>
    </div>
  );
};

export default UpGrade;
