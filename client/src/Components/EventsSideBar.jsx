import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventSidebarUpload from './EventSidebarUpload';
import './style.css';

const EventsSideBar = () => {
  const [events, setEvents] = useState([]);
  const [sidebarImages, setSidebarImages] = useState({});
  const [showUpload, setShowUpload] = useState(false);
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
        return imageMap; // Return for chaining
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

    // Ensure images are loaded first
    fetchSidebarImages().then(fetchEvents);
  }, []);

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="sidebar-container flex flex-col items-center bg-white h-full w-auto space-y-3 p-3 animate-upward">
      {events.length > 0 ? (
        events.map((event) => (
          <div
            key={event.event_id}
            className="sidebar-item relative flex flex-col items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg border-2 border-indigo-300 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() => handleEventClick(event.event_id)}
          >
            <img
              src={`http://localhost:5000${sidebarImages[event.event_id]}`}
              alt={event.event_name}
              className="w-12 h-12 object-cover rounded-lg"
            />
            <div className="mt-2 text-xs font-semibold text-white text-center">{event.event_name}</div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm">No events with images found.</p>
      )}

      {/* Upload Section */}
      <div
        className="sidebar-item w-20 h-20 flex flex-col items-center justify-center bg-gray-200 shadow-lg border-2 border-gray-400 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
        onClick={() => setShowUpload(!showUpload)}
      >
        <span className="text-center text-sm font-semibold">Upload Image</span>
      </div>

      {showUpload && <EventSidebarUpload />}
    </div>
  );
};

export default EventsSideBar;
