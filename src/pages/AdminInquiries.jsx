import { useEffect, useState } from "react";
import axios from "axios";

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await axios.get("https://masjid-backend-rt9x.onrender.com/api/inquiries/all");
        setInquiries(res.data);
      } catch (err) {
        alert("Failed to fetch inquiries");
        console.error(err);
      }
    };

    fetchInquiries();
  }, []);

  return (
    <div className="min-h-screen w-screen bg-gray-100 text-black py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          📨 Received Inquiries
        </h2>

        {inquiries.length === 0 ? (
          <p className="text-center text-gray-500">No inquiries found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-xl shadow">
              <thead className="bg-gray-200 text-left text-sm font-medium">
                <tr>
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Message</th>
                  <th className="py-2 px-4 border">Image</th>
                  <th className="py-2 px-4 border">Date</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {inquiries.map((inq) => (
                  <tr key={inq._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border">{inq.name}</td>
                    <td className="py-2 px-4 border">{inq.email}</td>
                    <td className="py-2 px-4 border">{inq.message}</td>
                    <td className="py-2 px-4 border">
                      {inq.image ? (
                        <span className="text-green-600">✔</span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-2 px-4 border">
                      {new Date(inq.createdAt).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInquiries;
