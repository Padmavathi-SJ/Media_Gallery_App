import express from 'express';
import multer from 'multer';
import path from 'path';
import db from '../DB/db.js'; // Assuming db.js has your MySQL connection

const router = express.Router();

// Set up multer storage configuration for Akila images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/akila'); // Folder for Akila images (inside uploads)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Image upload route for Akila
router.post('/upload', upload.single('image'), (req, res) => {
  const imageUrl = `/uploads/akila/${req.file.filename}`;  // Path to the uploaded image

  // Insert image path into the akila_images table
  const query = 'INSERT INTO akila_images (image_url) VALUES (?)';
  db.query(query, [imageUrl], (err, results) => {
    if (err) {
      console.error('Error saving image data to the database:', err);
      return res.status(500).send('Error uploading image');
    }
    res.status(201).send({ imageUrl }); // Respond with the image URL
  });
});

// API route to fetch all Akila images
router.get('/get-images', (req, res) => {
  const query = 'SELECT * FROM akila_images'; // SQL query to get all images from the akila_images table

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching Akila images:', err);
      return res.status(500).json({ message: 'Error fetching images from the database' });
    }

    // Send the images as a JSON response
    res.json(results); // Send back image data, including the image URL
  });
});

export default router;
