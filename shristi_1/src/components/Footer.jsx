import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative z-20 bg-gradient-to-r from-[#011640] to-[#022a80] text-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          
          {/* About Section */}
          <div>
            <h2 className="text-xl font-bold">About Shristi</h2>
            <p className="mt-2 text-gray-300">
              Shristi is the annual technical fest of NERIST, bringing together tech enthusiasts for an innovative experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-bold">Quick Links</h2>
            <ul className="mt-2 space-y-2">
              <li><Link to="/events" className="hover:text-yellow-400 hover:scale-105 transition-transform">Events</Link></li>
              <li><Link to="/timeline" className="hover:text-yellow-400 hover:scale-105 transition-transform">Timeline</Link></li>
              <li><Link to="/sponsors" className="hover:text-yellow-400 hover:scale-105 transition-transform">Sponsors</Link></li>
              <li><Link to="/developers" className="hover:text-yellow-400 hover:scale-105 transition-transform">Developers</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-xl font-bold">Contact Us</h2>
            <p className="mt-2 text-gray-300">Email: contact@shristi.com</p>
            <p className="mt-1 text-gray-300">Phone: +91 98765 43210</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-500 mt-6 pt-4 text-center text-gray-300">
          &copy; {new Date().getFullYear()} Shristi Tech Fest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
