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

// API route to fetch cadets
router.get('/cadets', (req, res) => {
  const query = 'SELECT * FROM cadets';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching cadets:', err);
      return res.status(500).json({ message: 'Error fetching cadets from the database' });
    }

    res.json(results);
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
