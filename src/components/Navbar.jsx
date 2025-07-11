import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="text-lg sm:text-2xl font-bold">🕌 Masjid Shareef Gundi Suderkote bala</div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-3xl focus:outline-none">
            {menuOpen ? <MdClose /> : <MdMenu />}
          </button>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex justify-end mt-2 space-x-6 text-sm md:text-base">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/announcements" className="hover:underline">Announcements</Link>
        <Link to="/donate" className="hover:underline">Donate</Link>
        <Link to="/inquiry" className="hover:underline">Inquiry</Link>
        <Link to="/zakat-calculator" className="hover:underline">Zakat Calculator</Link>
        <button onClick={handleLogout} className="hover:underline text-red-300">Logout</button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {menuOpen && (
        <div className="md:hidden flex flex-col mt-4 space-y-2 text-sm">
          <Link to="/dashboard" onClick={toggleMenu} className="hover:underline">Dashboard</Link>
          <Link to="/announcements" onClick={toggleMenu} className="hover:underline">Announcements</Link>
          <Link to="/donate" onClick={toggleMenu} className="hover:underline">Donate</Link>
          <Link to="/inquiry" onClick={toggleMenu} className="hover:underline">Inquiry</Link>
          <Link to="/zakat-calculator" onClick={toggleMenu} className="hover:underline">Zakat Calculator</Link>
          <button onClick={() => { toggleMenu(); handleLogout(); }} className="hover:underline text-red-300">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
