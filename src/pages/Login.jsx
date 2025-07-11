import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://masjid-backend-rt9x.onrender.com/api/users/login", form);
      const user = res.data.user;

      localStorage.setItem("user", JSON.stringify(user));

      if (
        form.name.toLowerCase() === "yasir hamid" &&
        form.email === "ratherseenu16@gmail.com" &&
        form.phone === "6005441991"
      ) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div
  className="min-h-screen w-screen flex items-center justify-center bg-cover bg-center px-4"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1519818187420-8e49de7adeef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFzamlkfGVufDB8fDB8fHww')",
  }}
>
  <div className="relative max-w-md w-full overflow-hidden z-10 bg-gray-800 p-8 rounded-lg shadow-md 
    before:content-[''] before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full 
    before:-z-10 before:blur-2xl 
    after:content-[''] after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full 
    after:-z-10 after:blur-xl after:top-24 after:-right-12"
  >
    <h2 className="text-2xl font-bold text-white mb-6 text-center">User Login</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300">Full Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
          placeholder="Enter your full name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Email Address</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Phone</label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
          placeholder="Enter your phone number"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-90 transition-all"
        >
          Login
        </button>
      </div>
    </form>
  </div>
    
</div>

  );
};

export default Login;
