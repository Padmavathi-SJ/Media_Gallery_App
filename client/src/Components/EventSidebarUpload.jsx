import React, { useState, useEffect } from 'react';

const EventSidebarUpload = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [imageFile, setImageFile] = useState(null);

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
    if (!selectedEvent || !imageFile) {
      alert('Please select an event and an image!');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('event_id', selectedEvent);

    try {
      const response = await fetch('http://localhost:5000/api/upload-event-sidebar-image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Image uploaded successfully!');
      } else {
        alert('Failed to upload image.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4">Upload Sidebar Image</h2>

      <label className="block mb-2">Select Event:</label>
      <select className="border p-2 w-full" onChange={(e) => setSelectedEvent(e.target.value)}>
        <option value="">-- Select Event --</option>
        {events.map((event) => (
          <option key={event.event_id} value={event.event_id}>{event.event_name}</option>
        ))}
      </select>

      <input type="file" className="border p-2 w-full mt-3" onChange={handleFileChange} />
      <button className="bg-blue-500 text-white px-4 py-2 mt-3" onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default EventSidebarUpload;
