import { useEffect, useState } from "react";
import axios from "axios";

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get("https://masjid-backend-rt9x.onrender.com/api/donations/all");
        setDonations(res.data);
      } catch (error) {
        console.error("Failed to load donations:", error);
      }
    };

    fetchDonations();
  }, []);

  return (
    <div className="bg-white rounded-xl p-6 shadow-md overflow-x-auto">
      <h2 className="text-xl font-bold mb-4 text-blue-700">💳 Donation Transactions</h2>

      {donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        <table className="min-w-full text-sm table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Order ID</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id} className="text-center">
                <td className="px-4 py-2 border">{donation.name}</td>
                <td className="px-4 py-2 border">{donation.donationType}</td>
                <td className="px-4 py-2 border">₹{donation.amount}</td>
                <td className="px-4 py-2 border">{donation.phone}</td>
                <td className="px-4 py-2 border">{donation.email}</td>
                <td className="px-4 py-2 border">{donation.orderId}</td>
                <td className="px-4 py-2 border text-green-600 font-semibold">{donation.status}</td>
                <td className="px-4 py-2 border">
                  {new Date(donation.createdAt).toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDonations;
