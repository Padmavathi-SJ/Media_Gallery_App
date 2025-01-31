import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const EventsSideBar = () => {
  const [events, setEvents] = useState([]);
  const [sidebarImages, setSidebarImages] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSidebarImages = async () => {
      try {
        const imageResponse = await fetch('http://localhost:5000/api/get-event-sidebar-images');
        const imageData = await imageResponse.json();
        const imageMap = {};
        imageData.forEach((item) => {
          imageMap[item.event_id] = item.image_url;
        });
        setSidebarImages(imageMap);
        return imageMap;
      } catch (error) {
        console.error('Error fetching sidebar images:', error);
        return {};
      }
    };

    const fetchEvents = async (imageMap) => {
      try {
        const eventResponse = await fetch('http://localhost:5000/api/events');
        const eventData = await eventResponse.json();

        // Filter events that have an image in `sidebarImages`
        const filteredEvents = eventData.filter(event => imageMap[event.event_id]);
        setEvents(filteredEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchSidebarImages().then(fetchEvents);
  }, []);

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="sidebar-container flex flex-col items-center bg-white bg-opacity-90 backdrop-blur-md rounded-lg h-full w-auto space-y-2 p-2">
      {events.length > 0 ? (
        events.map((event) => (
          <div
            key={event.event_id}
            className="flex flex-col items-center space-y-2 cursor-pointer"
            onClick={() => handleEventClick(event.event_id)}
          >
            <img
              src={`http://localhost:5000${sidebarImages[event.event_id]}`}
              alt={event.event_name}
              className="w-20 h-20 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            />
            <div className="text-gray-800 text-sm font-semibold">{event.event_name}</div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm">No events with images found.</p>
      )}

      

    </div>
  );
};

export default EventsSideBar;
