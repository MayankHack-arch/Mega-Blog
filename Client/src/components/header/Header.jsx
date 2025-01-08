import React from 'react';
import { Container, Logo } from '../index.js';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LogoutBtn from './LogoutBtn.jsx';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
    { name: "My Posts", slug:"/my-posts", active: authStatus},
  ];

  return (
    <header className="py-4 shadow-md bg-gray-800">
      <Container>
        <nav className="flex items-center">
          {/* Logo */}
          <Link to="/" className="mr-auto">
            <Logo width="70px" />
          </Link>

          {/* Navigation Items */}
          <ul className="flex space-x-4">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-4 py-2 text-white duration-200 rounded-lg hover:bg-gray-700 hover:text-blue-300"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {/* Logout Button */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
