import React, { useState } from 'react';

const CreateEvent = ({ isOpen, onClose, onCreateEvent }) => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = { event_name: eventName, description: eventDescription };

    try {
      const response = await fetch('http://localhost:5000/api/create-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      });

      const data = await response.json();
      if (response.ok) {
        onCreateEvent(data);  // Add new event to state
        onClose();  // Close modal after event is created
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50" onClick={onClose}>
      <div className="bg-white p-8 rounded-lg w-96" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-semibold text-center mb-4">Create Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Event Name</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Event Description</label>
            <textarea
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
