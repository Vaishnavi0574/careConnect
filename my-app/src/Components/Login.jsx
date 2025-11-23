import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { AUTH_API_BASE_URL } from "../config/api.js";
import useAuthStore from "../store/useAuthStore.js";

const Login = ({ handleLoginClick }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthStore();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${AUTH_API_BASE_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      setUser(data.user, data.token);
      

      handleLoginClick(); // close modal
      // window.location.href = "/dashboard"; // redirect to dashboard
    } catch (err) {
      setLoading(false);
      setError("Server error. Please try again later.");
    }
  };

  return (
    
    <div className="w-[80%] sm:w-[60%] md:w-[40%]">
      
      <div className="min-h-[25rem] flex items-center justify-center rounded-lg w-full">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-8 w-full max-w-md shadow-lg text-white relative">
          <IoClose
            className="w-6 h-6 absolute right-2 top-2"
            onClick={handleLoginClick}
          />
          <h2 className="text-xl sm:text-3xl font-semibold mb-6 text-center">
            Login
          </h2>

          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="p-3 rounded-lg bg-white/20 placeholder-gray-300 outline-none focus:ring-2 focus:ring-[#bdd8e9] text-sm sm:text-[1rem]"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="p-3 rounded-lg bg-white/20 placeholder-gray-300 outline-none focus:ring-2 focus:ring-[#bdd8e9] text-sm sm:text-[1rem]"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              className="bg-[#bdd8e9] text-[#052659] font-semibold py-2 rounded-lg hover:bg-[#a7cde0] transition text-sm sm:text-[1rem]"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-300 mt-4">
            Don’t have an account?{" "}
            <a href="/signup" className="text-[#bdd8e9] hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
