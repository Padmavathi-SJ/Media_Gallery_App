import express from 'express';
import multer from 'multer';
import path from 'path';
import db from '../DB/db.js'; // Assuming db.js has your MySQL connection

const router = express.Router();

// Set up multer storage configuration for event images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/events'); // Folder for event images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Image upload route for events
router.post('/events/:eventId/upload', upload.single('image'), (req, res) => {
  const { eventId } = req.params;
  const imageUrl = `/uploads/events/${req.file.filename}`;  // Path to the uploaded image

  // Insert image path into the events_images table
  const query = 'INSERT INTO events_images (event_id, image_url, uploaded_date) VALUES (?, ?, NOW())';
  db.query(query, [eventId, imageUrl], (err, results) => {
    if (err) {
      console.error('Error saving image data to the database:', err);
      return res.status(500).send('Error uploading image');
    }
    res.status(201).json({
        message: 'Image uploaded successfully',
        imageId: results.insertId,
        imageUrl,
        eventId
      });// Respond with the image URL and event ID
  });
});

router.get('/get-event-images/:event_id', (req, res) => {
    const { event_id } = req.params;
    const query = 'SELECT * FROM events_images WHERE event_id = ?';
  
    db.query(query, [event_id], (err, results) => {
      if (err) {
        console.error('Error fetching event images:', err);
        return res.status(500).json({ message: 'Error fetching event images from the database' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'No images found for this event' });
      }
  
      res.json(results);
    });
  });
  
  
  // API route to delete an event image
  router.delete('/delete-event-image/:image_id', (req, res) => {
    const { image_id } = req.params;
    const query = 'DELETE FROM events_images WHERE image_id = ?'; // SQL query to delete an event image
    
    db.query(query, [image_id], (err, results) => {
      if (err) {
        console.error('Error deleting event image:', err);
        return res.status(500).json({ message: 'Error deleting event image from the database' });
      }
      res.status(200).send('Image deleted successfully');
    });
  });

  
export default router;
