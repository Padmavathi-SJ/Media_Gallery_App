import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const NavBar = () => {
  // Profile image URLs for cadets (using paths relative to the public folder)
  const profiles = {
    1: "/assets/1.jpg", // cadet_id 1
    2: "/assets/2.jpg", // cadet_id 2
    3: "/assets/3.jpg", // cadet_id 3
    4: "/assets/4.jpg", // cadet_id 4
    5: "/assets/5.jpg", // cadet_id 5
    6: "/assets/6.jpg", // cadet_id 6
    7: "/assets/7.jpg", // cadet_id 7
    8: "/assets/8.jpg", // cadet_id 8
    9: "/assets/9.jpg", // cadet_id 9
    10: "/assets/10.jpg", // cadet_id 10
  };

  return (
    <div className="flex space-x-8 ml-8 mb-10">
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
  );
};

export default NavBar;
