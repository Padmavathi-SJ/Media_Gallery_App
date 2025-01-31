import React, { useState, useEffect } from 'react';
import { FaUpload } from 'react-icons/fa';

const EventImageUploader = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [uploadType, setUploadType] = useState('');

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

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!uploadType || !selectedEvent || !imageFile) {
      alert('Please select an upload type, an event, and an image!');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('event_id', selectedEvent);

    let apiUrl =
      uploadType === 'sidebar'
        ? 'http://localhost:5000/api/upload-event-sidebar-image'
        : `http://localhost:5000/api/events/${selectedEvent}/upload`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Image uploaded successfully!');
      } else {
        const errorMessage = await response.text();
        alert(`Failed to upload image: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <FaUpload className="text-blue-500" /> Upload Event Image
      </h2>

      {/* Upload Type Selection */}
      <label className="block font-medium text-gray-700">Select Upload Type:</label>
      <select
        className="border p-2 w-full mt-2 rounded-md"
        value={uploadType}
        onChange={(e) => setUploadType(e.target.value)}
      >
        <option value="">-- Choose Upload Type --</option>
        <option value="sidebar">Upload Profile Image for Sidebar</option>
        <option value="event">Upload Image for Specific Event</option>
      </select>

      {/* Event Selection */}
      <label className="block mt-4 font-medium text-gray-700">Select Event:</label>
      <select
        className="border p-2 w-full mt-2 rounded-md"
        value={selectedEvent}
        onChange={(e) => setSelectedEvent(e.target.value)}
      >
        <option value="">-- Select Event --</option>
        {events.map((event) => (
          <option key={event.event_id} value={event.event_id}>
            {event.event_name}
          </option>
        ))}
      </select>

      {/* File Upload */}
      <input
        type="file"
        className="border p-2 w-full mt-4 rounded-md"
        onChange={handleFileChange}
      />

      {/* Upload Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4 w-full rounded-md hover:bg-blue-600 transition duration-200"
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
};

export default EventImageUploader;
