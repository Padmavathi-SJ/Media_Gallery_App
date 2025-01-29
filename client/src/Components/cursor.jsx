import React, { useState, useEffect } from 'react';
import './style.css';

const Cursor = () => {
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const moveCursor = (e) => {
      const newTrail = {
        x: e.clientX,
        y: e.clientY,
        id: Math.random(),
      };
      setTrail((prevTrail) => [...prevTrail, newTrail]);

      // Remove trail particles after a short time
      setTimeout(() => {
        setTrail((prevTrail) => prevTrail.slice(1));
      }, 500);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <div className="cursor-container">
      {trail.map((particle) => (
        <div
          key={particle.id}
          className="cursor-particle"
          style={{
            left: particle.x,
            top: particle.y,
          }}
        />
      ))}
    </div>
  );
};

export default Cursor;
