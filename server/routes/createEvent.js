import express from 'express';
import db from '../DB/db.js'; // Assuming DB connection is set up

const router = express.Router();

// Create event
router.post('/create-event', (req, res) => {
  const { event_name, description } = req.body;

  // Check if event_name is provided
  if (!event_name || !description) {
    return res.status(400).json({ message: 'Event name and description are required' });
  }

  const query = 'INSERT INTO events (event_name, description) VALUES (?, ?)';
  db.query(query, [event_name, description], (err, results) => {
    if (err) {
      console.error('Error creating event:', err);
      return res.status(500).json({ message: 'Error creating event' });
    }
    res.status(201).json({ message: 'Event created successfully', eventId: results.insertId });
  });
});

// Fetch all events
router.get('/events', (req, res) => {
    const query = 'SELECT * FROM events ORDER BY created_date DESC';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching events:', err);
        return res.status(500).json({ message: 'Error fetching events' });
      }
      res.status(200).json(results);  // Return all events
    });
  });
  
export default router;
