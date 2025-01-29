import React, { useState } from 'react';
import { HiPlus } from 'react-icons/hi';
import { FiUpload, FiImage } from 'react-icons/fi'; 
import { AiOutlineHome } from 'react-icons/ai'; // Import home icon
import { useNavigate } from 'react-router-dom'; // For navigation
import CreateEvent from './CreateEvent';
import EventUpload from './EventUpload';
import EventHomeUpload from './EventHomeUpload';

const EventsTopBar = () => {
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showEventUpload, setShowEventUpload] = useState(false);
  const [showEventHomeUpload, setShowEventHomeUpload] = useState(false);
  const navigate = useNavigate(); // Initialize navigation

  const handleCreateEventClick = () => setShowCreateEvent(true);
  const handleCloseCreateEvent = () => setShowCreateEvent(false);

  const handleUploadEventImagesClick = () => setShowEventUpload(true);
  const handleCloseEventUpload = () => setShowEventUpload(false);

  const handleEventHomeUploadClick = () => setShowEventHomeUpload(true);
  const handleCloseEventHomeUpload = () => setShowEventHomeUpload(false);

  const handleCreateEvent = (newEvent) => {
    console.log('New Event Created:', newEvent);
  };

  const handleImageUpload = (imageUrl) => {
    console.log('Image uploaded to:', imageUrl);
  };

  return (
    <div>
      <div className="relative p-4 bg-white" style={{ minWidth: '400px' }}>
        {/* Home Button */}
        <div className="absolute top-4 left-4">
          <button
            onClick={() => navigate('/')} // Navigate to Home
            className="bg-gray-500 text-white p-3 rounded-full hover:bg-gray-600 transition-colors"
          >
            <AiOutlineHome size={24} />
          </button>
        </div>

        {/* Buttons at top-right corner */}
        <div className="absolute top-4 right-4 flex space-x-4">
          <button
            onClick={handleCreateEventClick}
            className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors"
          >
            <HiPlus size={24} />
          </button>
          <button
            onClick={handleUploadEventImagesClick}
            className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors"
          >
            <FiUpload size={24} />
          </button>
          <button
            onClick={handleEventHomeUploadClick}
            className="bg-purple-500 text-white p-3 rounded-full hover:bg-purple-600 transition-colors"
          >
            <FiImage size={24} />
          </button>
        </div>
      </div>

      {/* Render CreateEvent component as a modal card */}
      {showCreateEvent && (
        <CreateEvent
          isOpen={showCreateEvent}
          onClose={handleCloseCreateEvent}
          onCreateEvent={handleCreateEvent}
        />
      )}

      {/* Render EventUpload component as a modal card */}
      {showEventUpload && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50"
          onClick={handleCloseEventUpload}
        >
          <div
            className="bg-white p-8 rounded-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <EventUpload />
            <button
              onClick={handleCloseEventUpload}
              className="mt-4 w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Render EventHomeUpload component as a modal card */}
      {showEventHomeUpload && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50"
          onClick={handleCloseEventHomeUpload}
        >
          <div
            className="bg-white p-8 rounded-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <EventHomeUpload onImageUpload={handleImageUpload} />
            <button
              onClick={handleCloseEventHomeUpload}
              className="mt-4 w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsTopBar;
