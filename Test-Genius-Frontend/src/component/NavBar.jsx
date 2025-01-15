import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { auth } from "../firebase/config"; // Assuming you have this
import { apiConfig } from "../config/apiConfig";

const Navbar = ({ showlogin = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUserData(user);

      // Fetch user progress data
      fetchUserProgress(user.uid);
    }

    // Add event listener for storage changes
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setIsLoggedIn(true);
        setUserData(user);
        fetchUserProgress(user.uid);
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "admin") {
      setIsAdmin(true);
    }
  }, []);

  const fetchUserProgress = async (userId) => {
    try {
      const response = await fetch(
        `${apiConfig.baseURL}/api/users/${userId}/progress`,
        {
          headers: apiConfig.headers,
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user progress");
      }

      const progressData = await response.json();
      localStorage.setItem("userProgress", JSON.stringify(progressData));
    } catch (error) {
      console.error("Error fetching user progress:", error);
    }
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem("user");
      localStorage.removeItem("userProgress");
      setIsLoggedIn(false);
      setUserData(null);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
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

        {/* Navigation Links */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto transition-all duration-300 ease-in-out`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-white/90 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800/90 md:dark:bg-transparent dark:border-gray-700">
            {[
              { path: "/", label: "Home" },
              { path: "/about", label: "About" },
              { path: "/services", label: "Services" },
              { path: "/contact", label: "Contact" },
            ].map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    relative block py-2 px-3 rounded md:p-0 
                    transition-all duration-300
                    ${
                      isActivePath(item.path)
                        ? "text-blue-600 dark:text-blue-500"
                        : "text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-500"
                    }
                  `}
                  aria-current={isActivePath(item.path) ? "page" : undefined}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 
                      ${
                        isActivePath(item.path)
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Login/Profile Button */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ml-4">
          {isLoggedIn && isAdmin && (
            <button
              onClick={() => handleNavigation("/admin")}
              className="text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:shadow-lg focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-200"
            >
              Admin
            </button>
          )}
          {isLoggedIn ? (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleProfileClick}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white flex items-center justify-center hover:shadow-lg transition-all duration-200"
              >
                <svg
                  className="w-6 h-6"
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

              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                  <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-200 dark:border-gray-600">
                    {userData?.displayName || "User"}
                  </div>
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setIsProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate("#");
                      setIsProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    My Progress
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation("/login")}
              className="text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:shadow-lg focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-200"
            >
              Login
            </motion.button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
