import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = ({ showlogin = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUserData(user);
      if (user.role === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserData(null);
    setIsAdmin(false);
    navigate("/");
  };

  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
    { name: "Chat", path: "#", isFuture: true },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.h1
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="text-2xl md:text-3xl font-bold text-white cursor-pointer"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                Test
              </span>
              <span className="text-white mx-1">|</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
                Genius
              </span>
            </motion.h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => !link.isFuture && navigate(link.path)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                  ${
                    link.isFuture
                      ? "text-gray-300 cursor-not-available relative group"
                      : location.pathname === link.path
                      ? "text-white bg-blue-700"
                      : "text-blue-100 hover:bg-blue-700 hover:text-white"
                  }`}
              >
                {link.name}
                {link.isFuture && (
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Coming Soon
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Auth Buttons & Profile */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isLoggedIn ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center space-x-2 bg-blue-700 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-200"
                >
                  <span>{userData?.firstName || "User"}</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </motion.button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-2xl py-2 z-50 border border-white/20 backdrop-blur-sm">
                    {isAdmin && (
                      <button
                        onClick={() => {
                          navigate("/admin");
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-white/90 hover:bg-white/10 transition-all duration-200"
                      >
                        Admin Dashboard
                      </button>
                    )}
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-white/90 hover:bg-white/10 transition-all duration-200"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-white/90 hover:bg-white/10 transition-all duration-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              showlogin && (
                <div className="space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/login")}
                    className="bg-transparent text-white px-4 py-2 rounded-full border border-white hover:bg-white hover:text-blue-600 transition-colors duration-200"
                  >
                    Login
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/signup")}
                    className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors duration-200"
                  >
                    Sign Up
                  </motion.button>
                </div>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-gray-300"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  if (!link.isFuture) {
                    navigate(link.path);
                    setIsMobileMenuOpen(false);
                  }
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  link.isFuture
                    ? "text-gray-400 cursor-not-available"
                    : location.pathname === link.path
                    ? "text-white bg-blue-700"
                    : "text-blue-100 hover:bg-blue-700 hover:text-white"
                }`}
              >
                {link.name}
                {link.isFuture && " (Coming Soon)"}
              </button>
            ))}
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    navigate("/profile");
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:bg-blue-700 hover:text-white"
                >
                  Profile
                </button>
                {isAdmin && (
                  <button
                    onClick={() => {
                      navigate("/admin");
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:bg-blue-700 hover:text-white"
                  >
                    Admin Dashboard
                  </button>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:bg-blue-700 hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              showlogin && (
                <div className="space-y-2 px-3 py-2">
                  <button
                    onClick={() => {
                      navigate("/login");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-center px-4 py-2 rounded-full border border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      navigate("/signup");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-center px-4 py-2 rounded-full bg-white text-blue-600 hover:bg-blue-50"
                  >
                    Sign Up
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
