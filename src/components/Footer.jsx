import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-green-600 to-gray-900 text-white py-5 px-6  mt-16 text-xs md:text-sm">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Hadith Section */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-2">🌙 Beautiful Hadith</h3>
          <p className="italic leading-relaxed">
            "The most beloved of people to Allah are those who are most beneficial to people." <br />
            <span className="block mt-2 text-green-100">— Prophet Muhammad ﷺ (Al-Muʻjam al-Awsaṭ)</span>
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-2">📎 Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-yellow-300 transition">Home</a></li>
            <li><a href="/donate" className="hover:text-yellow-300 transition">Donate</a></li>
            <li><a href="/inquiry" className="hover:text-yellow-300 transition">Send Inquiry</a></li>
            <li><a href="/zakat-calculator" className="hover:text-yellow-300 transition">Zakat Calculator</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-2">📬 Contact</h3>
          <p>
            Jamia Masjid Check Saderkote Bala<br />
            Kashmir, India<br />
            📞 +91 *********<br />
            📧 masjid@shareef.org
          </p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center mt-10 border-t border-green-600 pt-4 text-green-200">
        <p>
          © {new Date().getFullYear()} Jamia Masjid Check Saderkote Bala. All rights reserved. Built with 🤲 for the Ummah.
        </p>
        <p>
          Designed and Created by{" "}
          <a
            href="https://yasirhamid.netlify.app/"
            className="text-yellow-300 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Yasir Hamid
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
