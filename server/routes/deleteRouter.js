import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import fs from 'fs';
import path from 'path';
import db from '../DB/db.js';
import express from 'express'; // Import DB connection

const router = express.Router();

// Route to delete an image by ID
router.delete('/delete-image/:id', (req, res) => {
  const imageId = req.params.id;

  // Get the image data from the database
  const query = 'SELECT * FROM images WHERE id = ?';
  db.query(query, [imageId], (err, results) => {
    if (err || results.length === 0) {
      console.error('Error fetching image:', err);
      return res.status(404).send('Image not found');
    }

    const image = results[0];
    const imagePath = path.join(__dirname, '../uploads', image.image_url.replace('/uploads/', ''));

    // Delete the image from the filesystem
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Error deleting image file:', err);
        return res.status(500).send('Error deleting image file');
      }

      // Delete the image from the database
      const deleteQuery = 'DELETE FROM images WHERE id = ?';
      db.query(deleteQuery, [imageId], (err, results) => {
        if (err) {
          console.error('Error deleting image data from database:', err);
          return res.status(500).send('Error deleting image data from database');
        }

        res.status(200).send('Image deleted successfully');
      });
    });
  });
});

export default router;
