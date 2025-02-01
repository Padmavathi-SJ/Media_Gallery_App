// LeftCadetSideBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const LeftCadetSideBar = () => {
  // Profile image URLs for cadets (using paths relative to the public folder)
  const profiles = {
    1: "/assets/1.jpg", // cadet_id 1
    2: "/assets/2.jpg", // cadet_id 2
    3: "/assets/3.jpg", // cadet_id 3
    4: "/assets/4.jpg", // cadet_id 4
    5: "/assets/5.jpg", // cadet_id 5
  };

  return (
    <div className="left-cadet-sidebar fixed left-0 top-1/4 w-1/6">
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

export default LeftCadetSideBar;
