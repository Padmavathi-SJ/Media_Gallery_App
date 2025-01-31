import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const NavBar = () => {
  // Profile image URLs for cadets (using paths relative to the public folder)
  const profiles = {
    cadet1: "/assets/1.jpg",
    cadet2: "/assets/2.jpg",
    cadet3: "/assets/3.jpg",
    cadet4: "/assets/4.jpg",
    cadet5: "/assets/5.jpg",
    cadet6: "/assets/6.jpg",
    cadet7: "/assets/7.jpg",
    cadet8: "/assets/8.jpg",
    cadet9: "/assets/9.jpg",
    cadet10: "/assets/10.jpg",
  };

  return (
    <div className="flex space-x-8 ml-8 mb-10">
      {Object.entries(profiles).map(([name, profileImage]) => (
        <Link to={`/${name}`} key={name} className="flex items-center space-x-2">
          <img
            src={profileImage}
            alt={`${name} profile`}
            className="w-16 h-16 rounded-full object-cover"
          />
        </Link>
      ))}
    </div>
  );
};

export default NavBar;
