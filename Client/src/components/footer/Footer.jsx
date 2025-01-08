import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo.jsx';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Copyright */}
          <div>
            <div className="mb-4">
              <Logo width="120px" />
            </div>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} DevUI. All Rights Reserved.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4 text-gray-500">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  className="hover:text-white transition duration-200"
                  to="/"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition duration-200"
                  to="/"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition duration-200"
                  to="/"
                >
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition duration-200"
                  to="/"
                >
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4 text-gray-500">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  className="hover:text-white transition duration-200"
                  to="/"
                >
                  Account
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition duration-200"
                  to="/"
                >
                  Help
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition duration-200"
                  to="/"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition duration-200"
                  to="/"
                >
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4 text-gray-500">
              Legals
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  className="hover:text-white transition duration-200"
                  to="/"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition duration-200"
                  to="/"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition duration-200"
                  to="/"
                >
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-center text-sm text-gray-500">
          Powered by DevUI. Built with ❤️ and React.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
