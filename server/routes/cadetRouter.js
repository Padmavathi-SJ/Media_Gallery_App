import express from 'express';
import multer from 'multer';
import path from 'path';
import db from '../DB/db.js'; // Assuming db.js has your MySQL connection

const router = express.Router();

// Set up multer storage configuration for cadet images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/cadets'); // Folder for cadet images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

/// Assuming this is your Express router file

// API route to get cadet images
router.get('/get-cadet-images/:cadetId', (req, res) => {
  const { cadetId } = req.params; // Capture cadetId from the URL
  const query = 'SELECT * FROM cadet_images WHERE cadet_id = ?'; // Query to get cadet images

  db.query(query, [cadetId], (err, results) => {
    if (err) {
      console.error('Error fetching cadet images:', err);
      return res.status(500).json({ message: 'Error fetching cadet images from the database' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No images found for this cadet' });
    }

    res.json(results);
  });
});


// API route to delete a cadet image
router.delete('/delete-cadet-image/:image_id', (req, res) => {
  const { image_id } = req.params;
  const query = 'DELETE FROM cadet_images WHERE image_id = ?'; // Query to delete cadet image

  db.query(query, [image_id], (err, results) => {
    if (err) {
      console.error('Error deleting cadet image:', err);
      return res.status(500).json({ message: 'Error deleting cadet image from the database' });
    }
    res.status(200).send('Image deleted successfully');
  });
});


// API route to upload cadet image
router.post('/cadets/:cadetId/upload', upload.single('image'), (req, res) => {
  const { cadetId } = req.params;
  const imageUrl = `/uploads/cadets/${req.file.filename}`;  // Path to the uploaded image

  // Insert image path into the cadet_images table
  const query = 'INSERT INTO cadet_images (cadet_id, image_url, uploaded_date) VALUES (?, ?, NOW())';
  db.query(query, [cadetId, imageUrl], (err, results) => {
    if (err) {
      console.error('Error saving image data to the database:', err);
      return res.status(500).send('Error uploading image');
    }
    res.status(201).json({
      message: 'Image uploaded successfully',
      imageId: results.insertId,
      imageUrl,
      cadetId
    });
  });
});

export default router;
