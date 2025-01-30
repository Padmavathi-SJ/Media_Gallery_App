import express from 'express';
import multer from 'multer';
import path from 'path';
import db from '../DB/db.js'; // Import database connection

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/eventSideBar'); // Save files in this directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// API to upload event sidebar images
router.post('/upload-event-sidebar-image', upload.single('image'), (req, res) => {
  const { event_id } = req.body;
  if (!event_id || !req.file) {
    return res.status(400).json({ message: 'Event ID and image are required.' });
  }

  const imageUrl = `/uploads/eventSideBar/${req.file.filename}`;

  const query = 'INSERT INTO event_sidebar_images (event_id, image_url) VALUES (?, ?)';
  db.query(query, [event_id, imageUrl], (err, results) => {
    if (err) {
      console.error('Error inserting image data:', err);
      return res.status(500).json({ message: 'Error uploading image.' });
    }
    res.status(201).json({ message: 'Image uploaded successfully.', imageUrl });
  });
});

// API to fetch sidebar images
router.get('/get-event-sidebar-images', (req, res) => {
  const query = `
    SELECT esi.image_id, e.event_id, e.event_name, esi.image_url, esi.uploaded_date
    FROM event_sidebar_images esi
    JOIN events e ON esi.event_id = e.event_id
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching images:', err);
      return res.status(500).json({ message: 'Error fetching images.' });
    }
    res.json(results);
  });
});

export default router;
