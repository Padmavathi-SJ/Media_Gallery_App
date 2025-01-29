import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { HiTrash } from 'react-icons/hi';
import EventsSideBar from './EventsSideBar'; // Import EventsSideBar
import EventsTopBar from './EventsTopBar'; // Import EventsTopBar
import './style.css';

const EventsGrid = () => {
  const { eventId } = useParams();
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eventId) {
      console.error('No eventId provided');
      setLoading(false);
      return;
    }

    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/get-event-images/${eventId}`);
        if (!response.ok) throw new Error('Failed to fetch images');
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
        alert('Failed to load images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [eventId]);

  const breakpointColumnsObj = {
    default: 7,
    1600: 6,
    1200: 5,
    800: 4,
    500: 3,
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/delete-event-image/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete image');
      setImages((prevImages) => prevImages.filter((image) => image.image_id !== id));
      alert('Image deleted successfully.');
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image. Please try again.');
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <EventsSideBar />

      <div className="flex-1">
        {/* Top Bar */}
        <EventsTopBar />

        {/* Image Grid */}
        {loading ? (
          <p>Loading images...</p>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {images.map((image, index) => (
              <div key={image.image_id} className="image-item relative group">
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
                      handleDelete(image.image_id);
                    }}
                    className="text-transparent group-hover:text-white p-3 shadow-lg transition-all"
                  >
                    <HiTrash className="text-2xl" />
                  </button>
                </div>
              </div>
            ))}
          </Masonry>
        )}

        {/* Modal for Image */}
        {isModalOpen && selectedImage && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content relative">
              <img
                src={`http://localhost:5000${selectedImage.image_url}`}
                alt="Selected"
                className="modal-image max-w-full max-h-[80vh] object-contain"
              />
              <button
                onClick={() => handleDelete(selectedImage.image_id)}
                className="absolute top-4 right-4 text-white p-3 shadow-lg transition-all"
              >
                <HiTrash className="text-3xl" />
              </button>
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
    </div>
  );
};

export default EventsGrid;
