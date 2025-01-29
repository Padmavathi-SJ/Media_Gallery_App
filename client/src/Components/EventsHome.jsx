import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import EventsTopBar from './EventsTopBar';
import EventsSideBar from './EventsSideBar';
import CreateEvent from './CreateEvent'; // Import your CreateEvent modal component
import './style.css';

const EventsHome = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);

  // Fetch event home images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/get-event-home-images');
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const breakpointColumnsObj = {
    default: 7,
    1600: 6,
    1200: 5,
    800: 4,
    500: 3
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateEventClick = () => {
    setIsCreateEventOpen(true);
  };

  const handleCloseCreateEventModal = () => {
    setIsCreateEventOpen(false);
  };

  const handleCreateEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <EventsSideBar events={events} />

      <div className="flex-1">
        {/* Top Bar */}
        <EventsTopBar onCreateEventClick={handleCreateEventClick} />

        {/* Create Event Modal */}
        <CreateEvent
          isOpen={isCreateEventOpen}
          onClose={handleCloseCreateEventModal}
          onCreateEvent={handleCreateEvent}
        />

        {/* Masonry Layout */}
        <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
          {images.map((image, index) => (
            <div key={index} className="image-item relative group">
              <img
                src={`http://localhost:5000${image.image_url}`}
                alt={`Event image ${index}`}
                className="uploaded-image cursor-pointer transition-all group-hover:opacity-90 group-hover:shadow-xl group-hover:grayscale"
                onClick={() => openModal(image)}
              />
            </div>
          ))}
        </Masonry>

        {/* Modal for Image */}
        {isModalOpen && selectedImage && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content relative">
              <img
                src={`http://localhost:5000${selectedImage.image_url}`}
                alt="Selected"
                className="modal-image max-w-full max-h-[80vh] object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsHome;
