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
    <div className="sidebar-container">
      {events.length > 0 ? (
        events.map((event) => (
          <div
            key={event.event_id}
            className="sidebar-item"
            onClick={() => handleEventClick(event.event_id)}
          >
            <img
              src={`http://localhost:5000${sidebarImages[event.event_id]}`}
              alt={event.event_name}
              className="w-16 h-16 object-cover rounded-lg border-2 border-white shadow-md"
            />
            <div>{event.event_name}</div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm">No events with images found.</p>
      )}

      {/* Upload Section */}
      <div
        className="upload-btn"
        onClick={() => setShowUpload(!showUpload)}
      >
        <span>Upload Image</span>
      </div>

      {showUpload && <EventSidebarUpload />}
    </div>
  );
};

export default EventsSideBar;
