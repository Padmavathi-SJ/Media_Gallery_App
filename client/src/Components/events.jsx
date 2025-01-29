import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { HiTrash } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import './style.css';

const Events = () => {
  const { eventId } = useParams(); // Get eventId from URL
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch images for the specific event
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/events/${eventId}/images`);
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [eventId]);

  const breakpointColumnsObj = {
    default: 7,
    1600: 6,
    1200: 5,
    800: 4,
    500: 3
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/delete-image/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setImages(prevImages => prevImages.filter(image => image.id !== id));
      } else {
        console.error('Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
        {images.map((image, index) => (
          <div key={index} className="image-item relative group">
            <img
              src={`http://localhost:5000${image.image_url}`}
              alt={`Event image ${index}`}
              className="uploaded-image cursor-pointer transition-all group-hover:opacity-90 group-hover:shadow-xl group-hover:grayscale"
              onClick={() => openModal(image)}
            />
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(image.id);
                }}
                className="text-transparent group-hover:text-white p-3 shadow-lg transition-all"
              >
                <HiTrash className="text-2xl" />
              </button>
            </div>
          </div>
        ))}
      </Masonry>

      {isModalOpen && selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content relative">
            <img
              src={`http://localhost:5000${selectedImage.image_url}`}
              alt="Selected"
              className="modal-image max-w-full max-h-[80vh] object-contain"
            />
            <button onClick={() => handleDelete(selectedImage.id)} className="absolute top-4 right-4 text-white p-3 shadow-lg transition-all">
              <HiTrash className="text-3xl" />
            </button>
            <button onClick={closeModal} className="absolute top-4 left-4 text-white hover:text-gray-300 transition-all text-3xl">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;