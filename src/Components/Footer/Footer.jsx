// src/Components/Footer/Footer.jsx

import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SocialIcons = () => (
  <div className="flex space-x-4">
    <a
      href="https://www.facebook.com/yourpage"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
      className="text-white hover:text-gray-300 transition-colors duration-300"
    >
      <FaFacebook size={20} />
    </a>
    <a
      href="https://www.instagram.com/yourprofile"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      className="text-white hover:text-gray-300 transition-colors duration-300"
    >
      <FaInstagram size={20} />
    </a>
    <a
      href="https://twitter.com/yourprofile"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter"
      className="text-white hover:text-gray-300 transition-colors duration-300"
    >
      <FaTwitter size={20} />
    </a>
    <a
      href="https://www.linkedin.com/company/ekodus-inc"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      className="text-white hover:text-gray-300 transition-colors duration-300"
    >
      <FaLinkedin size={20} />
    </a>
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A5C96] text-white">
      {/* Main Footer Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
        {/* Logo Section */}
        <div>
          <img
            src="/logo.png"
            alt="BesaKina Logo"
            className="w-40 filter grayscale mb-4"
          />
          <p className="text-sm mb-6">
            Online Market Place connecting buyers and sellers seamlessly.
          </p>
          <SocialIcons />
        </div>

        {/* About Us Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">About Us</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/aboutus" className="hover:underline transition underline-offset-2">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/listing-categories" className="hover:underline transition underline-offset-2">
                Listing Categories
              </Link>
            </li>
            {/* <li>
              <Link to="#" className="hover:underline transition underline-offset-2">
                How It Works
              </Link>
            </li> */}
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/advertisewithus" className="hover:underline transition underline-offset-2">
                Advertise with Us
              </Link>
            </li>
            <li>
              <Link to="/plans" className="hover:underline transition underline-offset-2">
                Pricing
              </Link>
            </li>
            {/* <li>
              <Link to="#" className="hover:underline transition underline-offset-2">
                Enquiry Form
              </Link>
            </li> */}
          </ul>
        </div>

        {/* BesaKina Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">BesaKina</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/termsandconditions" className="hover:underline transition underline-offset-2">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/PrivacyPolicy" className="hover:underline transition underline-offset-2">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Helpline and Social Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">Need Help?</h3>
          <p className="font-medium">Helpline Number:</p>
          <p className="text-xl font-bold mt-2 mb-6">+91 69139 17916</p>
          <p className="font-medium mb-4">Follow Us</p>
          <SocialIcons />
        </div>
      </div>

      {/* Newsletter Subscription (Optional) */}
      <div className="bg-[#154879] py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
          <h3 className="text-lg font-semibold mb-4 md:mb-0">Subscribe to our Newsletter</h3>
          <form className="w-full md:w-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-l-md text-gray-800 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-[#1A5C96] hover:bg-[#154879] text-white px-4 py-2 rounded-r-md transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

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
