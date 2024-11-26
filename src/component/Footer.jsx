import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <footer className="bg-white border-t border-gray-200 shadow dark:bg-gray-800 dark:border-gray-600">
      <div className="w-full p-4 md:flex md:items-center md:justify-between md:p-6">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="/" className="hover:underline">
            PS Education
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a
              onClick={() => handleNavigation('/about')}
              className="hover:underline me-4 md:me-6 cursor-pointer"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:underline me-4 md:me-6"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:underline me-4 md:me-6"
            >
              Licensing
            </a>
          </li>
          <li>
            <a
              onClick={() => handleNavigation('/contact')}
              className="hover:underline cursor-pointer"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
