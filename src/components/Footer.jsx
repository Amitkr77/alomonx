import { Phone, Mail } from "lucide-react";
import Link from "next/link";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
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
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/service" className="hover:text-blue-600">
                Services
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-blue-600">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-600">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {/* Middle - Links */}
        <div>
          <h3 className="font-semibold mb-4">Services</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/services/web-development"
                className="hover:text-blue-600"
              >
                Web development
              </Link>
            </li>
            <li>
              <Link
                href="/services/digital-marketing"
                className="hover:text-blue-600"
              >
                Digital marketing
              </Link>
            </li>
          </ul>
        </div>

        {/* Right - Search + Social */}
        <div>
          <div className="flex space-x-4 text-gray-600 text-lg">
            <Link href="https://www.facebook.com/share/19funaxch4/?mibextid=wwXIfr">
              <FaFacebook className="hover:text-blue-600" />
            </Link>
            {/* <Link href="#">
              <FaTwitter className="hover:text-blue-400" />
            </Link> */}
            <Link href="https://www.instagram.com/alomonx?igsh=MW1ndW03c2R0aHBvNw==">
              <FaInstagram className="hover:text-pink-500" />
            </Link>
            <Link href="https://www.linkedin.com/company/alomonx-technology/">
              <FaLinkedin className="hover:text-blue-500" />
            </Link>
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
            <Phone size={16} /> +91 92346 25064
          </div>
          <div className="flex items-center gap-2">
            <FaWhatsapp size={16} />
            +91 92346 25064
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} /> info@alomonx.com
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-xs py-4 border-t border-gray-200">
        © 2025. All rights reserved. Designed by Amit kumar{" "}
        <span className="text-blue-600">Alomonx Technology</span>
      </div>
    </footer>
  );
}
