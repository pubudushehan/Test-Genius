import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ showlogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md dark:bg-gray-900/95 fixed w-full z-50 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo and Text */}
        <div
          onClick={handleLogoClick}
          className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer group"
        >
          <img
            src="https://cdn.pixabay.com/photo/2017/09/29/00/30/checkmark-icon-2797531_960_720.png"
            className="h-8 transition-transform duration-300 group-hover:scale-110"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-300">
            Test Genius
          </span>
        </div>

        {/* Spacer div to push navigation to right */}
        <div className="flex-grow"></div>

        {/* Navigation Links - Now aligned to right */}
        <div
          className={`${
            isMobileMenuOpen ? 'block' : 'hidden'
          } w-full md:block md:w-auto transition-all duration-300 ease-in-out`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-white/90 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800/90 md:dark:bg-transparent dark:border-gray-700">
            {[
              { path: '/', label: 'Home' },
              { path: '/progress', label: 'Progress' },
              { path: '/about', label: 'About' },
              { path: '/services', label: 'Services' },
              { path: '/contact', label: 'Contact' }
            ].map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    relative block py-2 px-3 rounded md:p-0 
                    transition-all duration-300
                    ${isActivePath(item.path)
                      ? 'text-blue-600 dark:text-blue-500'
                      : 'text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-500'
                    }
                  `}
                  aria-current={isActivePath(item.path) ? 'page' : undefined}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 
                      ${isActivePath(item.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile menu button - Moved after navigation */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ml-4"
          aria-controls="navbar-sticky"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>

        {/* Login Button */}
        {showlogin && (
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ml-4">
            <button
              onClick={() => handleNavigation('/login')}
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-300 transform hover:scale-105 active:scale-95 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;






