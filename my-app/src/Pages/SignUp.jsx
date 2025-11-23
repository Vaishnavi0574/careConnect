import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_API_BASE_URL } from "../config/api.js";
import useLoginStore from "../store/useLoginStore.js";
import useAuthStore from "../store/useAuthStore.js";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { setUser } = useAuthStore();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { isLoginClick, setIsloginClick } = useLoginStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLoginClick = () => {
    setIsloginClick(!isLoginClick);
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill all the fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch(`${AUTH_API_BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      setUser(data.user, data.token);

      setSuccess("Sign up successful! ✅");

      // reset form
      setForm({ name: "", email: "", password: "", confirmPassword: "" });

      // optional: navigate to login or dashboard
      setTimeout(() => {
        navigate("/dashboard"); // change to your desired route
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-[#c4d8ff]">
      <div className="bg-white shadow-blue-850 shadow-xl rounded-2xl p-5 sm:p-8 w-full max-w-md border-t-8 border-[#052659]">
        <h2 className="text-xl sm:text-3xl font-bold text-center text-[#052659] mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#052659] mb-1 text-sm sm:text-[1rem] ">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-[#9db3d3] rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#2e529b] text-sm sm:text-[1rem]"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-[#052659] mb-1 text-sm sm:text-[1rem]">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border text-sm sm:text-[1rem] border-[#9db3d3] rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#2e529b]"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-[1rem] text-[#052659] mb-1 ">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border text-sm sm:text-[1rem] border-[#9db3d3] rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#2e529b]"
              placeholder="Enter password"
            />
          </div>

          <div>
            <label className="block text-[#052659] mb-1 text-sm sm:text-[1rem]">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border text-sm sm:text-[1rem] border-[#9db3d3] rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#2e529b]"
              placeholder="Confirm password"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <button
            type="submit"
            className="w-full bg-[#052659] text-white py-2 rounded-lg text-sm sm:text-[1rem] hover:bg-[#2e529b] transition-all shadow-md"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-[#052659]/70 mt-4">
            Already have an account?{" "}
            <button
              onClick={handleLoginClick}
              className="text-[#51758c] hover:underline"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
