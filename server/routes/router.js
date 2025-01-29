import express from 'express';
import multer from 'multer';
import path from 'path';
import db from '../DB/db.js'; // Import DB connection

const router = express.Router();

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Folder where images will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Image upload route
router.post('/upload', upload.single('image'), (req, res) => {
  const imageUrl = `/uploads/${req.file.filename}`;  // Path to the uploaded image

  // Insert image path into the database
  const query = 'INSERT INTO images (image_url) VALUES (?)';
  db.query(query, [imageUrl], (err, results) => {
    if (err) {
      console.error('Error saving image data to the database:', err);
      return res.status(500).send('Error uploading image');
    }
    res.status(201).send('Image uploaded and data saved');
  });
});


// API route to fetch all images
router.get('/get-images', (req, res) => {
    const query = 'SELECT * FROM images'; // SQL query to get all images
  
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
