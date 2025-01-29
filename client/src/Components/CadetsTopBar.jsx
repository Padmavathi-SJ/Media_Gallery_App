import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './Navbar'; // Import NavBar for profile navigation

const CadetsTopBar = () => {
  return (
    <div className="top-bar bg-white text-black dark:bg-gray-900 dark:text-white p-4 flex items-center justify-between">
      {/* Left Section: Logo */}
      <div className="left-section flex items-center space-x-4">
        {/* Logo */}
        <Link to="/">
          <img
            src="/assets/barret.jpg" // Replace with your actual logo path
            alt="Logo"
            className="w-20 h-20 object-contain mb-10" // Match the size to TopBar
          />
        </Link>
      </div>

      {/* Center Section: NavBar */}
      <div className="center-section flex justify-center">
        <NavBar />
      </div>

      {/* Right Section */}
      <div className="right-section flex items-center space-x-4">
        

        {/* User Profile Link with Image */}
                <Link to="/events" className="relative">
                  <img
                    src="/assets/events.jpg" // Direct path to the image in the public/assets folder
                    alt="User Profile"
                    className="w-20 h-20 mb-10 rounded-lg border-2 border-gray-300 hover:border-blue-500 cursor-pointer transition-all"
                  />
                  {/* Optional indicator (small dot) */}
                  <span className="absolute bottom-0 mb-10 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                </Link>
      </div>
    </div>
  );
};

export default CadetsTopBar;
