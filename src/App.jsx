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
import Announcements from "./pages/Announcements";
import Donate from "./pages/Donate";
import AdminDonations from "./pages/AdminDonations";
import Footer from "./components/Footer";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute"; // ✅ Import guard

function AppWrapper() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    // Show navbar only on selected pages
    const visibleRoutes = ["/dashboard", "/admin"];
    setShowNavbar(visibleRoutes.includes(location.pathname));
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/zakat-calculator" element={<ZakatCalculator />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/donate" element={<Donate />} />

        {/* 🔒 Protected admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminPanel />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/inquiries"
          element={
            <ProtectedAdminRoute>
              <AdminInquiries />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/announcements"
          element={
            <ProtectedAdminRoute>
              <AdminAnnouncements />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/donations"
          element={
            <ProtectedAdminRoute>
              <AdminDonations />
            </ProtectedAdminRoute>
          }
        />
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
