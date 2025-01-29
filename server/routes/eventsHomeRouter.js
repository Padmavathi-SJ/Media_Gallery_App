import express from 'express';
import multer from 'multer';
import path from 'path';
import db from '../DB/db.js'; // Import DB connection

const router = express.Router();

// Set up multer storage configuration for eventHome images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/eventHome'); // Folder for eventHome images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Image upload route for eventHome images
router.post('/upload-event-home', upload.single('image'), (req, res) => {
  const imageUrl = `/uploads/eventHome/${req.file.filename}`; // Path to the uploaded image

  // Insert image path into the event_home_pictures table
  const query = 'INSERT INTO event_home_pictures (image_url) VALUES (?)';
  db.query(query, [imageUrl], (err, results) => {
    if (err) {
      console.error('Error saving image data to the database:', err);
      return res.status(500).json({ message: 'Error uploading image' });
    }

    // Respond with a JSON object
    res.status(201).json({
      message: 'Image uploaded and data saved',
      imageUrl: imageUrl,
    });
  });
});


// API route to fetch all eventHome images
router.get('/get-event-home-images', (req, res) => {
  const query = 'SELECT * FROM event_home_pictures'; // SQL query to get all eventHome images
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching images:', err);
      return res.status(500).json({ message: 'Error fetching images from the database' });
    }

    // Send the images as a JSON response
    res.json(results);
  });
});

export default router;
