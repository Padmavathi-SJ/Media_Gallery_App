import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Masonry from 'react-masonry-css'; // For masonry grid layout
import { HiTrash } from 'react-icons/hi';

const CadetGrid = () => {
  const { cadetId } = useParams(); // Get cadetId from URL params
  const [images, setImages] = useState([]); // Store cadet images
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCadetImages = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/get-cadet-images/${cadetId}`);
        if (!response.ok) throw new Error('Failed to fetch cadet images');
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching cadet images:', error);
        alert('Failed to load cadet images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCadetImages();
  }, [cadetId]);

  const breakpointColumnsObj = {
    default: 7,
    1600: 6,
    1200: 5,
    800: 4,
    500: 3,
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/delete-cadet-image/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete image');
      setImages((prevImages) => prevImages.filter((image) => image.image_id !== id));
      alert('Image deleted successfully.');
    } catch (error) {
      console.error('Error deleting cadet image:', error);
      alert('Failed to delete image. Please try again.');
    }
  };

  return (
    <div className="flex">
      <div className="flex-1">
        {/* Image Grid */}
        {loading ? (
          <p>Loading cadet images...</p>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {images.map((image) => (
              <div key={image.image_id} className="image-item relative group">
                <img
                  src={`http://localhost:5000${image.image_url}`}
                  alt={`Cadet image`}
                  className="uploaded-image cursor-pointer transition-all group-hover:opacity-90 group-hover:shadow-xl group-hover:grayscale"
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
      </div>
    </div>
  );
};

export default CadetGrid;
