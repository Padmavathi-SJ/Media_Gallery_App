// RightCadetSideBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const RightCadetSideBar = () => {
  // Profile image URLs for cadets (using paths relative to the public folder)
  const profiles = {
    6: "/assets/6.jpg", // cadet_id 6
    7: "/assets/7.jpg", // cadet_id 7
    8: "/assets/8.jpg", // cadet_id 8
    9: "/assets/9.jpg", // cadet_id 9
    10: "/assets/10.jpg", // cadet_id 10
  };

  return (
    <div className="right-cadet-sidebar fixed right-0 top-1/4 w-1/6">
      <div className="flex flex-col items-center space-y-8">
        {Object.entries(profiles).map(([cadetId, profileImage]) => (
          <Link to={`/cadets/${cadetId}`} key={cadetId} className="flex items-center space-x-2">
            <img
              src={profileImage}
              alt={`Cadet ${cadetId} profile`}
              className="w-16 h-16 rounded-full object-cover"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RightCadetSideBar;
