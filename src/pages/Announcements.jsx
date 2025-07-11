import { useEffect, useState } from "react";
import axios from "axios";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true); // optional loading
  const [error, setError] = useState(null);     // for handling errors

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get("https://masjid-backend-rt9x.onrender.com/api/announcements");
        setAnnouncements(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load announcements:", err);
        setError("Failed to load announcements");
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-8">
          🗓️ Upcoming Announcements
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : announcements.length === 0 ? (
          <p className="text-center text-gray-600">No announcements found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {announcements.map((a) => (
              <div
                key={a._id}
                className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
              >
                {a.image ? (
                  <img
                    src={a.image}
                    alt="announcement"
                    className="w-full h-48 object-cover rounded-md mb-4"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />
                ) : null}

                <h2 className="text-xl font-semibold text-blue-700 mb-2">
                  📢 {a.eventName}
                </h2>
                <p className="text-gray-700">
                  <strong>Led by:</strong> {a.leadBy}
                </p>
                <p className="text-gray-700">
                  <strong>Announced by:</strong> {a.announcedBy}
                </p>
                <p className="text-gray-700">
                  <strong>Date & Time:</strong>{" "}
                  {new Date(a.dateTime).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
                <p className="text-gray-700">
                  <strong>Open to:</strong>{" "}
                  {a.gender === "Male"
                    ? "Only Males"
                    : a.gender === "Female"
                    ? "Only Females"
                    : "Everyone"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
