import React, { useState } from "react";

const Notification_settings = () => {
  const [form, setForm] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  });

  const handleToggle = (name) => {
    setForm({ ...form, [name]: !form[name] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Notification settings updated:", form);
    alert("Notification settings saved (mock).");
  };

  return (
    <div className="bg-[#eaf2f6] rounded-2xl border border-[#bdd8e9] p-6 md:p-8 text-[#001D39] transition-all duration-500 hover:shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold mb-4 text-[#001D39]">
          Notification Settings
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Email Notifications */}
          <SettingToggle
            label="Email Notifications"
            checked={form.emailNotifications}
            onChange={() => handleToggle("emailNotifications")}
          />

          {/* SMS Notifications */}
          <SettingToggle
            label="SMS Notifications"
            checked={form.smsNotifications}
            onChange={() => handleToggle("smsNotifications")}
          />

          {/* Push Notifications */}
          <SettingToggle
            label="Push Notifications"
            checked={form.pushNotifications}
            onChange={() => handleToggle("pushNotifications")}
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="inline-flex items-center gap-3 px-6 py-2 rounded-xl bg-[#4E8EA2] text-white font-medium shadow-md hover:bg-[#052659] active:bg-[#001D39] transition-all duration-300"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

// Toggle UI Component
function SettingToggle({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between bg-white border border-[#bdd8e9] rounded-lg px-4 py-2 shadow-sm">
      <span className="sm:text-[1rem] text-sm text-[#001D39]">{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="w-10 sm:w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-[#4E8EA2] transition-all duration-300"></div>
        <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow transform peer-checked:translate-x-5 transition-all duration-300"></div>
      </label>
    </div>
  );
}

export default Notification_settings;
