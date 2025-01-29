import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import CadetsTopBar from './CadetsTopBar'; // Common TopBar component
import { FiUpload } from 'react-icons/fi';
import './style.css';

const Dad = () => {
  const [images, setImages] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  // Fetch Dad images from the backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dad/get-images');
        const data = await response.json();
        setImages(data); // Assuming response contains image URLs
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  // Handle modal open and close
  const handleOpenModal = () => setShowUploadModal(true);
  const handleCloseModal = () => {
    setShowUploadModal(false);
    setSelectedImage(null);
    setUploadStatus(null);
  };

  // Handle image upload
  const handleUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch('http://localhost:5000/api/dad/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload image.');

      const newImage = await response.json();
      setImages((prevImages) => [...prevImages, newImage]);
      setUploadStatus('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadStatus('Failed to upload image.');
    }
  };

  // Breakpoint settings for Masonry grid
  const breakpointColumnsObj = {
    default: 6,
    1600: 5,
    1200: 4,
    800: 3,
    500: 2,
  };

  return (
    <div className="dad-container relative mt-0">
      {/* CadetsTopBar Component */}
      <CadetsTopBar />

      {/* Upload Icon aligned at the top-right corner */}
      <div className="upload-icon-container absolute mr-40 mt-4 top-2 right-2">
        <button
          className="bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 transition-colors"
          onClick={handleOpenModal}
        >
          <FiUpload size={28} />
        </button>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-4 rounded-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-center text-xl font-semibold mb-3">Upload Image</h2>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files[0])}
              className="w-full mb-3"
            />
            {uploadStatus && (
              <p
                className={`text-center ${
                  uploadStatus === 'Image uploaded successfully!'
                    ? 'text-green-600'
                    : 'text-red-600'
                } mb-3`}
              >
                {uploadStatus}
              </p>
            )}
            <div className="flex justify-between gap-2">
              <button
                onClick={handleUpload}
                disabled={!selectedImage}
                className="w-1/2 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
              >
                Upload Image
              </button>
              <button
                onClick={handleCloseModal}
                className="w-1/2 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Masonry Grid to Display Images */}
      <div className="relative mt-0">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:5000${image.image_url}`}
              alt={`Dad Image ${index + 1}`}
              className="uploaded-image w-full rounded-lg object-cover"
            />
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default Dad;
