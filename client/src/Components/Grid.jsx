import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { HiTrash } from 'react-icons/hi'; // Import Heroicons
import './style.css';

const Grid = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all uploaded images from the backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/get-images');
        const data = await response.json();
        setImages(data); // Assuming response contains image paths
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  // Breakpoint settings for masonry grid
  const breakpointColumnsObj = {
    default: 7, // 6 columns for default screen size
    1600: 6,    // 5 columns for large screens
    1200: 5,    // 4 columns for medium screens
    800: 4,     // 3 columns for small screens
    500: 3      // 2 columns for extra small screens
  };

  // Handle the deletion of an image
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/delete-image/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setImages((prevImages) => prevImages.filter((image) => image.id !== id));
      } else {
        console.error('Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  // Handle opening and closing the modal for displaying image
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Masonry grid to display images */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((image, index) => (
          <div key={index} className="image-item relative group">
            <img
              src={`http://localhost:5000${image.image_url}`}
              alt={`Uploaded image ${index}`}
              className="uploaded-image cursor-pointer transition-all group-hover:opacity-90 group-hover:shadow-xl group-hover:grayscale"
              onClick={() => openModal(image)}
            />
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {/* Attractive Delete Icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent modal from closing when clicking delete
                  handleDelete(image.id);
                }}
                className="text-transparent group-hover:text-white p-3  shadow-lg transition-all"
              >
                <HiTrash className="text-2xl" />
              </button>
            </div>
          </div>
        ))}
      </Masonry>

      {/* Modal for viewing image */}
      {isModalOpen && selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content relative">
            <img
              src={`http://localhost:5000${selectedImage.image_url}`}
              alt="Selected"
              className="modal-image max-w-full max-h-[80vh] object-contain"
            />
            {/* Attractive Delete Icon inside modal */}
            <button
              onClick={() => handleDelete(selectedImage.id)}
              className="absolute top-4 right-4 text-white   p-3  shadow-lg transition-all"
            >
              <HiTrash className="text-3xl" />
            </button>
            {/* Close Icon inside modal */}
            <button
              onClick={closeModal}
              className="absolute top-4 left-4 text-white hover:text-gray-300 transition-all text-3xl"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Grid;
