import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; // Import the CSS file

const EventsSideBar = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventResponse = await fetch('http://localhost:5000/api/events');
        const eventData = await eventResponse.json();
        setEvents(eventData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const getEventIcon = (eventName) => {
    switch (eventName.toLowerCase()) {
      case 'music':
        return '🎵'; // Music icon
      case 'sports':
        return '⚽'; // Sports icon
      case 'conference':
        return '📅'; // Conference icon
      case 'art':
        return '🎨'; // Art icon
      case 'education':
        return '📚'; // Education icon
      default:
        return '🎉'; // Default icon for other events
    }
  };

  return (
    <div className="sidebar-container flex flex-col items-center bg-white h-full w-auto space-y-3 p-3 animate-upward">
      {events.map((event) => (
        <div
          key={event.event_id}
          className="sidebar-item relative flex flex-col items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg border-2 border-indigo-300 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
          onClick={() => handleEventClick(event.event_id)}
        >
          <div className="icon text-3xl animate-bounce">{getEventIcon(event.event_name)}</div>
          <div className="mt-2 text-xs font-semibold text-white text-center">{event.event_name}</div>
        </div>
      ))}
    </div>
  );
};

export default EventsSideBar;
