import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const NavBar = () => {
  // Profile image URLs (using paths relative to the public folder)
  const profiles = {
    akila: "/assets/1.jpg",
    padma: "/assets/2.jpg",
    mom: "/assets/3.jpg",
    dad: "/assets/4.jpg",
    john: "/assets/5.jpg", // New profiles
    emma: "/assets/6.jpg",
    liam: "/assets/7.jpg",
    sophia: "/assets/8.jpg",
    michael: "/assets/9.jpg",
    olivia: "/assets/10.jpg",
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
