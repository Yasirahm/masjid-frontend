import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const AdminPanel = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    familyMembers: "",
    totalAmount: "",
    paidAmount: "",
    remainingAmount: "",
  });

  const [editUserId, setEditUserId] = useState(null);
  const [showMoreMap, setShowMoreMap] = useState({});
  const [monthlyAmount, setMonthlyAmount] = useState(500); // default monthly update
  const [perFamilyRate, setPerFamilyRate] = useState();
  const [searchQuery, setSearchQuery] = useState("");
const [sortDescending, setSortDescending] = useState(false);


  const getAllUsers = async () => {
    try {
      const res = await axios.get("https://masjid-backend-rt9x.onrender.com/api/users");
      setUsers(res.data);
    } catch (err) {
      alert("Failed to fetch users");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newForm = { ...form, [name]: value };

    if (name === "totalAmount" || name === "paidAmount") {
      const total = name === "totalAmount" ? Number(value) : Number(newForm.totalAmount);
      const paid = name === "paidAmount" ? Number(value) : Number(newForm.paidAmount);
      newForm.remainingAmount = total - paid;
    }

    setForm(newForm);
  };

  const handleMonthlyUpdate = () => {
    const updatedUsers = users.map((user) => {
      const addedAmount = perFamilyRate > 0 ? perFamilyRate * user.familyMembers : monthlyAmount;
      const updatedTotal = user.totalAmount + addedAmount;
      const updatedRemaining = updatedTotal - user.paidAmount;

      return axios.put(`https://masjid-backend-rt9x.onrender.com/api/users/update/${user._id}`, {
        ...user,
        totalAmount: updatedTotal,
        remainingAmount: updatedRemaining,
      });
    });

    Promise.all(updatedUsers)
      .then(() => {
        alert("Monthly dues updated for all users");
        getAllUsers();
      })
      .catch(() => alert("Failed to update dues"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        totalAmount: Number(form.totalAmount),
        paidAmount: Number(form.paidAmount),
        remainingAmount: Number(form.remainingAmount),
        familyMembers: Number(form.familyMembers),
      };

      if (editUserId) {
        await axios.put(`https://masjid-backend-rt9x.onrender.com/api/users/update/${editUserId}`, payload);
        alert("User updated successfully");
        setEditUserId(null);
      } else {
        await axios.post("https://masjid-backend-rt9x.onrender.com/api/users/add", payload);
        Swal.fire({
  icon: "success",
  title: "✅ User Added",
  text: "The user has been successfully added to the list.",
  confirmButtonColor: "#3085d6",
});

      }

      setForm({
        name: "",
        email: "",
        phone: "",
        familyMembers: 0,
        totalAmount: 0,
        paidAmount: 0,
        remainingAmount: 0,
      });

      getAllUsers();
    } catch (err) {
      alert("Failed to save user");
    }
  };

  const handleEdit = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      familyMembers: user.familyMembers,
      totalAmount: user.totalAmount,
      paidAmount: user.paidAmount,
      remainingAmount: user.remainingAmount,
    });
    setEditUserId(user._id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`https://masjid-backend-rt9x.onrender.com/api/users/delete/${id}`);
      alert("User deleted successfully");
      getAllUsers();
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  const toggleShowMore = (id) => {
    setShowMoreMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-100 to-gray-300 py-6 px-4 sm:px-6">
      <div className="max-w-screen-lg mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl text-black font-bold text-center mb-6">
          🕌 Masjid Admin Panel
        </h2>

        {/* Monthly Update Settings */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-black font-medium">Monthly Amount (₹):</label>
            <input
              type="number"
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(Number(e.target.value))}
              className="p-2 border rounded w-24"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-black font-medium">Or ₹ per family member:</label>
            <input
              type="number"
              value={perFamilyRate}
              onChange={(e) => setPerFamilyRate(Number(e.target.value))}
              className="p-2 border rounded w-24"
            />
          </div>
          <button
            onClick={handleMonthlyUpdate}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
          >
            📆 Apply Monthly Update
          </button>
        </div>

        {/* Add/Edit Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 sm:p-6 rounded-xl shadow-xl w-full space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[ 
              { label: "Name", name: "name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone", name: "phone", type: "text" },
              { label: "Family Members", name: "familyMembers", type: "number" },
              { label: "Total Amount", name: "totalAmount", type: "number" },
              { label: "Paid Amount", name: "paidAmount", type: "number" },
              { label: "Remaining Amount", name: "remainingAmount", type: "number" },
            ].map(({ label, name, type }) => (
              <div key={name} className="flex flex-col w-full">
                <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
                  {label}
                </label>
                <input
                  type={type}
                  id={name}
                  name={name}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  value={form[name]}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  required
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-lg transition duration-200"
          >
            {editUserId ? "Update User" : "Add User"}
          </button>
        </form>

        {/* User Table */}
        <div className="mt-10 bg-white p-4 sm:p-6 rounded-xl shadow-xl overflow-x-auto">
          <h3 className="text-lg sm:text-xl text-black font-semibold mb-4 text-center">
            📋 All Registered Users
          </h3>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
  {/* Search Bar */}
  <input
    type="text"
    placeholder="Search by name, email or phone"
    className="p-2 border rounded w-full sm:w-1/2"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
  />

  {/* Sort Toggle */}
  <button
    onClick={() => setSortDescending(!sortDescending)}
    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
  >
    {sortDescending ? "🔽 Sort: High to Low" : "🔼 Sort: Low to High"}
  </button>
</div>

          {users.length === 0 ? (
            <p className="text-center text-gray-600">No users found.</p>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="min-w-[800px] text-sm text-gray-800 border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    {["Name", "Email", "Phone", "Family", "Total", "Paid", "Pending", "Actions"].map((head) => (
                      <th key={head} className="border px-3 py-2 text-left whitespace-nowrap">
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
  {users
    .filter((u) =>
      u.name.toLowerCase().includes(searchQuery) ||
      u.email.toLowerCase().includes(searchQuery) ||
      u.phone.toLowerCase().includes(searchQuery)
    )
    .sort((a, b) => {
      if (sortDescending) return b.remainingAmount - a.remainingAmount;
      else return a.remainingAmount - b.remainingAmount;
    })
    .map((u) => (
      <React.Fragment key={u._id}>
        <tr className="hover:bg-gray-50 transition">
          <td className="border px-3 py-2 font-medium">{u.name}</td>
          <td className="border px-3 py-2">{u.email}</td>
          <td className="border px-3 py-2">{u.phone}</td>
          <td className="border px-3 py-2">{u.familyMembers}</td>
          <td className="border px-3 py-2">₹{u.totalAmount}</td>
          <td className="border px-3 py-2">₹{u.paidAmount}</td>
          <td className="border px-3 py-2">₹{u.remainingAmount}</td>
          <td className="border px-3 py-2 space-x-2">
            <button onClick={() => handleEdit(u)} className="text-blue-600 underline">Edit</button>
            <button onClick={() => handleDelete(u._id)} className="text-red-600 underline">Delete</button>
          </td>
        </tr>
        {u.paymentHistory?.length > 0 && (
          <tr className="bg-gray-50">
            <td colSpan="8" className="border px-4 py-3">
              <p className="font-semibold mb-2">🧾 Payment History:</p>
              <ul className="list-disc pl-4 text-sm space-y-1">
                {(showMoreMap[u._id] ? u.paymentHistory : u.paymentHistory.slice(0, 2)).map((p, idx) => (
                  <li key={idx}>
                    ₹{p.amount} — {new Date(p.date).toLocaleString("en-IN", { dateStyle: "short", timeStyle: "short" })} {p.razorpayId ? `— ID: ${p.razorpayId}` : ""}
                  </li>
                ))}
              </ul>
              {u.paymentHistory.length > 2 && (
                <button
                  onClick={() => toggleShowMore(u._id)}
                  className="text-blue-500 text-xs underline mt-2 block"
                >
                  {showMoreMap[u._id] ? "Show Less" : "Show More"}
                </button>
              )}
            </td>
          </tr>
        )}
      </React.Fragment>
    ))}
</tbody>

              </table>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-4 justify-end mt-4">
          <button
            onClick={() => navigate("/admin/inquiries")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow"
          >
            View Inquiries 📩
          </button>

          <button
            onClick={() => navigate("/admin/announcements")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow"
          >
            Add Announcement 📢
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
