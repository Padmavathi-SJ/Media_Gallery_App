import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { FiImage } from 'react-icons/fi'; // For the image icon
import Upload from './Upload';
import NavBar from './Navbar';

const TopBar = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleUploadClick = () => setShowUploadModal(true);
  const handleCloseUpload = () => setShowUploadModal(false);

  return (
    <div className="top-bar bg-white text-black dark:bg-gray-900 dark:text-white p-4 flex items-center justify-between">
      {/* Left Section */}
      <div className="left-section flex items-center space-x-4">
        {/* Logo */}
        <Link to="/">
          <img
            src="/assets/barret.jpg" // Path to your logo image in the public/assets folder
            alt="Logo"
            className="w-20 h-20 object-contain mb-10" // Adjust size as needed
          />
        </Link>
        </div>
        
        <div className="center-section flex justify-center">
        <NavBar />
      </div>

      {/* Right Section */}
      <div className="right-section flex items-center mb-10 space-x-4">
        {/* Upload Button */}
        <button
          className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors"
          onClick={handleUploadClick}
        >
          <FiImage size={24} />
        </button>

        {/* User Profile Link with Image */}
        <Link to="/events" className="relative">
          <img
            src="/assets/events.jpg" // Direct path to the image in the public/assets folder
            alt="User Profile"
            className="w-20 h-20 rounded-lg border-2 border-gray-300 hover:border-blue-500 cursor-pointer transition-all"
          />
          {/* Optional indicator (small dot) */}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
        </Link>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
          onClick={handleCloseUpload}
        >
          <div
            className="bg-gray p-8 rounded-lg w-96 border"
            onClick={(e) => e.stopPropagation()}
          >
            <Upload onUploadClick={() => console.log('Image uploaded!')} />
            <button
              onClick={handleCloseUpload}
              className="mt-4 w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
