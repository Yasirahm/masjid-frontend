import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./pages/AdminLogin";
import Navbar from "./components/Navbar";
import AdminInquiries from "./pages/AdminInquiries";
import Inquiry from "./pages/Inquiry";
import ZakatCalculator from "./pages/ZakatCalculator";
import AdminAnnouncements from "./pages/AdminAnnouncements";
import Announcements from "./pages/Announcements"; // Adjust path if needed
import Donate from "./pages/Donate";
import AdminDonations from "./pages/AdminDonations"; // Adjust path if needed

function AppWrapper() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    // Show navbar only on these routes
    const visibleRoutes = ["/dashboard", "/admin"];
    setShowNavbar(visibleRoutes.includes(location.pathname));
  }, [location.pathname]);

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/inquiry" element={<Inquiry />} /> {/* ✅ THIS LINE */}
        <Route path="/admin/inquiries" element={<AdminInquiries />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/zakat-calculator" element={<ZakatCalculator />} />
        <Route path="/admin/announcements" element={<AdminAnnouncements />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/admin/donations" element={<AdminDonations />} />

        {/* Add more routes as needed */}

      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
