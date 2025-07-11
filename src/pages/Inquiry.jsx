import { useState } from "react";
import axios from "axios";

const Inquiry = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("message", form.message);
      if (image) {
        formData.append("image", image);
      }

      await axios.post("https://masjid-backend-rt9x.onrender.com/api/inquiries/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Inquiry submitted successfully. Thank you!");
      setForm({ name: "", email: "", message: "" });
      setImage(null);
    } catch (err) {
      alert("Failed to submit inquiry.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen w-screen px-4 py-10 bg-gray-100 text-black flex justify-center items-start">
      <div className="max-w-xl w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          📩 Send Your Inquiry
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              required
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Your message, suggestion, or complaint..."
            ></textarea>
          </div>

         
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition"
          >
            Submit Inquiry
          </button>
        </form>
      </div>
    </div>
  );
};

export default Inquiry;
