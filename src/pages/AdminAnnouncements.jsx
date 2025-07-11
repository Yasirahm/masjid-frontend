import { useState } from "react";
import axios from "axios";

const AdminAnnouncements = () => {
  const [form, setForm] = useState({
    eventName: "",
    leadBy: "",
    announcedBy: "",
    dateTime: "",
    gender: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files?.[0] || null });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }

      const res = await axios.post(
        "https://masjid-backend-rt9x.onrender.com/api/announcements/add",
        formData
      );

      if (res.status === 201) {
        alert("✅ Announcement uploaded!");
        setForm({
          eventName: "",
          leadBy: "",
          announcedBy: "",
          dateTime: "",
          gender: "",
          image: null,
        });
      } else {
        alert("❌ Upload failed");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("❌ Failed to upload announcement");
    }
  };

  return (
    <div className="min-h-screen w-screen bg-blue-50 flex items-center justify-center py-10 px-4">
      <div className="bg-white w-full max-w-2xl p-8 rounded-xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-center text-blue-700">
          📢 Upload New Announcement
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white text-black">
          {/* Text Inputs */}
          {[
            { label: "Event Name", name: "eventName" },
            { label: "Lead By", name: "leadBy" },
            { label: "Announced By", name: "announcedBy" },
            {
              label: "Date & Time",
              name: "dateTime",
              type: "datetime-local",
            },
          ].map(({ label, name, type = "text" }) => (
            <div key={name}>
              <label className="block bg-white  text-whitetext-sm font-semibold mb-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                required
                className="w-full border text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          {/* Gender Dropdown */}
          <div>
            <label className="block text-black  text-sm font-semibold mb-1">
              Gender Allowed
            </label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="w-full border text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select</option>
              <option value="Male">Only Male</option>
              <option value="Female">Only Female</option>
              <option value="Both">Both</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-lg transition duration-200"
          >
            Upload Announcement
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAnnouncements;
