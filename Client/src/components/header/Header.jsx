import React, { useState } from "react";
import { Container, Logo } from "../index.js";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn.jsx";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
    { name: "My Posts", slug: "/my-posts", active: authStatus },
  ];

  const handleNavigation = (slug) => {
    navigate(slug);
    setMenuOpen(false); // Close menu on navigation
    document.body.style.overflow = "auto"; // Enable scrolling
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = menuOpen ? "auto" : "hidden"; // Lock/unlock scrolling
  };

  return (
    <header className="py-4 shadow-md bg-gray-800">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="mr-auto">
            <Logo width="70px" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>

          {/* Desktop Navigation Items */}
          <ul className="hidden lg:flex space-x-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-4 py-2 text-white duration-200 rounded-lg hover:bg-gray-700 hover:text-blue-300"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Navigation Items */}
          <div
            className={`fixed inset-0 z-50 bg-gray-800 transform ${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out lg:hidden`}
          >
            <ul className="flex flex-col items-start w-full p-4 space-y-2">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => handleNavigation(item.slug)}
                        className="block w-full px-4 py-2 text-white duration-200 rounded-lg hover:bg-gray-700 hover:text-blue-300"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
