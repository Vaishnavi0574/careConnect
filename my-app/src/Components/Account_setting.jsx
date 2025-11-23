import React, { useState, useRef } from "react";
import {
  FaCamera,
  FaEnvelope,
  FaUser,
  FaPhone,
  FaEdit,
  FaRegCalendarAlt,
} from "react-icons/fa";

const Account_setting = () => {
  const [form, setForm] = useState({
    fullName: "Christine Brown",
    email: "christinebrown@gmail.com",
    username: "christinebrown",
    phone: "+1 945-913-2196",
    dateOfBirth: "2005-07-04",
    bio: "Senior blog writer at Hamill Group since 2017.\nI've also been lucky enough to work for the Parisian LLC.",
  });

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  // ----------------- Handlers -----------------

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) setPreview(URL.createObjectURL(f));
  };

  const triggerFile = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = "This field is required";
    });

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Please enter a valid email address";

    if (form.phone && !/^[0-9+\-\s()]+$/.test(form.phone))
      newErrors.phone = "Please enter a valid phone number";

    if (form.dateOfBirth && isNaN(new Date(form.dateOfBirth).getTime()))
      newErrors.dateOfBirth = "Please enter a valid date";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    alert("Profile updated (mock):\n" + JSON.stringify(form, null, 2));
  };

  // ----------------- UI -----------------

  return (
    <div className="bg-[#eaf2f6] rounded-2xl border border-[#bdd8e9] p-6 md:p-8 text-[#001D39] transition-all duration-500 hover:shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Profile Image */}
          <div className="flex flex-col items-start gap-4">
            <div className="relative">
              <div className="h-28 w-28 rounded-full overflow-hidden border-2 border-[#bdd8e9] shadow-inner">
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src="/mnt/data/e6801be4-8f96-4a32-925c-ebe9c5330845.jpg"
                    alt="avatar"
                    className="h-full w-full object-cover bg-gray-300"
                  />
                )}
              </div>

              <div className="absolute left-0 -bottom-3 flex gap-2">
                <button
                  type="button"
                  onClick={triggerFile}
                  className="flex items-center gap-2 px-3 py-1 rounded-lg bg-[#052659] text-white text-xs shadow-md hover:bg-[#001D39] transition-all duration-300"
                >
                  <FaCamera size={14} /> Upload
                </button>
                <input
                  ref={fileInputRef}
                  onChange={handleFile}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    if (fileInputRef.current)
                      fileInputRef.current.value = null;
                  }}
                  className="px-3 py-1 rounded-lg border border-[#4E8EA2] text-xs text-[#001D39] hover:bg-[#bdd8e9] transition-all duration-300"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="text-xs text-[#4E8EA2]">Profile Picture</div>
          </div>

          {/* Form Fields */}
          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Input
                label="Full name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                icon={<FaUser />}
                type="text"
                error={errors.fullName}
              />
              <Input
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                icon={<FaEnvelope />}
                type="email"
                error={errors.email}
              />

              <Input
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                icon={<FaEdit />}
                type="text"
                error={errors.username}
              />

              <Input
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                icon={<FaPhone />}
                type="tel"
                error={errors.phone}
              />

              <Input
                label="Date of Birth"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                icon={<FaRegCalendarAlt />}
                type="date"
                error={errors.dateOfBirth}
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-[#001D39] mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={5}
                className="w-full bg-white border border-[#bdd8e9] rounded-lg p-3 text-sm text-[#001D39] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4E8EA2] transition-all duration-300"
              ></textarea>
              {errors.bio && (
                <p className="text-red-600 text-xs mt-1">{errors.bio}</p>
              )}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="inline-flex items-center gap-3 px-6 py-2 rounded-xl bg-[#4E8EA2] text-white font-medium shadow-md hover:bg-[#052659] active:bg-[#001D39] transition-all duration-300"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

function Input({ label, name, value, onChange, icon, type, error }) {
  return (
    <label className="block text-sm w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="font-medium text-[#001D39]">{label}</span>
      </div>
      <div className="flex items-center gap-2 bg-white border border-[#bdd8e9] rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#4E8EA2] transition-all duration-300">
        <div className="text-[#4E8EA2]">{icon}</div>
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

export default Account_setting;
