import React, { useState } from 'react';
import TopBar from './TopBar';  // Import TopBar
import Grid from './Grid';      // Import the Grid component to display images

const Home = () => {
  const [images, setImages] = useState([]);

  // Handle image upload (pass the uploaded image to the grid)
  const handleUpload = (image) => {
    console.log('Uploaded image:', image);
    // You can add your logic here to handle the uploaded image (e.g., saving it to the state or uploading to the server)
    setImages(prevImages => [...prevImages, image]);  // Example: adding image to the state
  };

  // Handle image search (filtering images based on search query)
  const handleSearch = (query) => {
    console.log("Searching for images with query:", query);
    // Add image search/filter logic based on query
  };

  return (
    <div className="home-container">
      <TopBar onSearch={handleSearch} onUpload={handleUpload} />  {/* Pass onUpload prop to TopBar */}
      <Grid images={images} />            {/* Display the Grid of images below */}
    </div>
  );
};

export default Home;