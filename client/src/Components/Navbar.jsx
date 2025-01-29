import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const NavBar = () => {
  // Profile image URLs (using paths relative to the public folder)
  const profiles = {
    akila: "/assets/akila.jpg",
    padma: "/assets/padma.jpg",
    mom: "/assets/mom.jpeg",
    dad: "/assets/dad.jpeg",
    john: "/assets/dad.jpeg", // New profiles
    emma: "/assets/dad.jpeg",
    liam: "/assets/dad.jpeg",
    sophia: "/assets/dad.jpeg",
    michael: "/assets/dad.jpeg",
    olivia: "/assets/dad.jpeg",
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
