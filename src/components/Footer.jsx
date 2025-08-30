import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Phone,
  Dock,
  Mail,
} from "lucide-react";
import {
  FaWhatsapp,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaFacebook,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-50 text-gray-700">
      <div className="max-w-7xl mx-auto  py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Left - Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Alomonx <span className="text-blue-600">Technology</span>
          </h2>
          <p className="mt-4 text-sm">
            At Alomonx Technology, we are committed to delivering cutting-edge
            digital marketing, software development, and political campaign
            strategies. Let’s shape the future together!
          </p>
        </div>

        {/* Middle - Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-blue-600">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Portfolio
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Contact
              </a>
            </li>
          </ul>
        </div>
        {/* Middle - Links */}
        <div>
          <h3 className="font-semibold mb-4">Services</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-blue-600">
                Web development
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Digital marketing
              </a>
            </li>
          </ul>
        </div>

        {/* Right - Search + Social */}
        <div>
          <div className="flex space-x-4 text-gray-600 text-lg">
            <a href="#">
              <FaFacebook className="hover:text-blue-600" />
            </a>
            <a href="#">
              <FaTwitter className="hover:text-blue-400" />
            </a>
            <a href="#">
              <FaInstagram className="hover:text-pink-500" />
            </a>
            <a href="#">
              <FaYoutube className="hover:text-red-500" />
            </a>
          </div>
          <div className="mt-4">
            <h1>Kurji, Digha, Patna Bihar</h1>
            <p>
              Monday – Saturday <br /> 10:00 a.m. – 6:00 p.m.
            </p>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-blue-100 py-6">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-sm">
          <p className="font-semibold">Need Help?</p>
          <div className="flex items-center gap-2">
            <Phone size={16} /> 1-800-555-4321
          </div>
          <div className="flex items-center gap-2">
            <FaWhatsapp size={16} />
            1-800-555-4321
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} /> hello@alomonx.com
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-xs py-4 border-t border-gray-200">
        © 2023. All rights reserved. Designed by{" "}
        <span className="text-blue-600">Alomonx Technology</span>
      </div>
    </footer>
  );
}
