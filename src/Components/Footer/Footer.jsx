import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { TfiLinkedin } from 'react-icons/tfi';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A5C96] text-white">
      {/* Main Footer Section */}
      <section className="px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
        {/* Logo Section */}
        <div>
          <img
            src="/logo.png"
            alt="BesaKina"
            className="w-[150px] filter grayscale mb-4"
          />
          <p className="text-sm mb-6">
            Direct Mailing and Online Market Place.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/ekodus-inc"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <TfiLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* About Us Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">About Us</h3>
          <ul className="space-y-2">
            <li>
              <a href="/aboutus" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <Link to="/listing-categories" className="hover:underline">
                Listing Categories
              </Link>
            </li>
            {/* <li>
              <Link to="#" className="hover:underline">FAQ</Link>
            </li> */}
            <li>
              <Link to="#" className="hover:underline">
                How it works
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/advertisewithus" className="hover:underline">
                Advertise with us
              </a>
            </li>
            <li>
              <Link to="/plans" className="hover:underline">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Enquiry Form
              </Link>
            </li>
            {/* <li>
              <Link to="#" className="hover:underline">Contact Us</Link>
            </li> */}
          </ul>
        </div>

        {/* BesaKina Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">BesaKina</h3>
          <ul className="space-y-2">
            <li>
              <a href="/termsandconditions" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="/PrivacyPolicy" className="hover:underline">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Helpline and Social Section */}
        <div>
          <p className="font-bold">Helpline Number:</p>
          <p className="text-xl font-bold mt-2 mb-8">+91 69139 17916</p>
          <p className="font-medium">Follow Us</p>
          <div className="flex gap-5 pt-4">
            <a href="#" className="hover:text-gray-300">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/ekodus-inc"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <TfiLinkedin size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer Bottom */}
      <div className="bg-[#154879] text-center py-4">
        <p className="text-sm">
          &copy; {currentYear} BesaKina. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
