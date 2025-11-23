import React, { useState } from "react";

const Login_settings = () => {
  const [form, setForm] = useState({
    username: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error when typing
  };

  const validate = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.currentPassword.trim())
      newErrors.currentPassword = "Current password is required";
    if (!form.newPassword.trim())
      newErrors.newPassword = "New password is required";
    if (!form.confirmPassword.trim())
      newErrors.confirmPassword = "Please confirm your new password";
    if (
      form.newPassword &&
      form.confirmPassword &&
      form.newPassword !== form.confirmPassword
    )
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Login settings updated:", form);
    alert("Login settings saved (mock).");
  };

  return (
    <div className="bg-[#eaf2f6] rounded-2xl border border-[#bdd8e9] p-6 md:p-8 text-[#001D39] transition-all duration-500 hover:shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold mb-4 text-[#001D39]">
          Login & Security
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Input
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            type="text"
            error={errors.username}
          />
          <Input
            label="Current Password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            type="password"
            error={errors.currentPassword}
          />
          <Input
            label="New Password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            type="password"
            error={errors.newPassword}
          />
          <Input
            label="Confirm New Password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            type="password"
            error={errors.confirmPassword}
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="inline-flex items-center gap-3 px-6 py-2 rounded-xl bg-[#4E8EA2] text-white font-medium shadow-md hover:bg-[#052659] active:bg-[#001D39] transition-all duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

// Reusable Input Component
function Input({ label, name, value, onChange, type, error }) {
  return (
    <label className="block text-sm w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="font-medium text-[#001D39]">{label}</span>
      </div>
      <div className="flex items-center gap-2 bg-white border border-[#bdd8e9] rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#4E8EA2] transition-all duration-300">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="flex-1 bg-transparent text-[#001D39] text-sm focus:outline-none"
        />
      </div>
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </label>
  );
}

export default Login_settings;
