import React, { useState, useEffect } from 'react';

const EventUpload = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Fetch events from the backend
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
  
    try {
      const response = await fetch(`http://localhost:5000/api/events/${selectedEvent}/upload`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const result = await response.json();
        alert('Image uploaded successfully!');
      } else {
        // If the response is not ok, try to parse the response as text first
        const errorMessage = await response.text();
        console.error('Error uploading image:', errorMessage);
        alert(`Failed to upload image: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    }
  };
  

  return (
    <div>
      <h2>Upload Image for Event</h2>

      <label htmlFor="event-select">Select Event:</label>
      <select
        id="event-select"
        value={selectedEvent || ''}
        onChange={(e) => setSelectedEvent(e.target.value)}
      >
        <option value="">--Select Event--</option>
        {events.map((event) => (
          <option key={event.event_id} value={event.event_id}>
            {event.event_name}
          </option>
        ))}
      </select>

      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default EventUpload;
