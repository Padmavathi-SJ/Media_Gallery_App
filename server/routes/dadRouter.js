import express from 'express';
import multer from 'multer';
import path from 'path';
import db from '../DB/db.js'; // Assuming db.js has your MySQL connection

const router = express.Router();

// Set up multer storage configuration for Dad images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/dad'); // Folder for Dad images (inside uploads)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Image upload route for Dad
router.post('/upload', upload.single('image'), (req, res) => {
  const imageUrl = `/uploads/dad/${req.file.filename}`;  // Path to the uploaded image

  // Insert image path into the dad_images table
  const query = 'INSERT INTO dad_images (image_url) VALUES (?)';
  db.query(query, [imageUrl], (err, results) => {
    if (err) {
      console.error('Error saving image data to the database:', err);
      return res.status(500).send('Error uploading image');
    }
    res.status(201).send({ imageUrl }); // Respond with the image URL
  });
});

// API route to fetch all Dad images
router.get('/get-images', (req, res) => {
  const query = 'SELECT * FROM dad_images'; // SQL query to get all images from the dad_images table

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching Dad images:', err);
      return res.status(500).json({ message: 'Error fetching images from the database' });
    }

    // Send the images as a JSON response
    res.json(results); // Send back image data, including the image URL
  });
});

export default router;
