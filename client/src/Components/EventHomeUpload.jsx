import React, { useState } from 'react';
import { FiUpload, FiImage } from 'react-icons/fi';

const EventHomeUpload = ({ onImageUpload }) => {
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setMessage(''); // Clear any previous message
    }
  };

  const handleUpload = async () => {
    if (!imageFile) {
      setMessage('Please select an image.');
      return;
    }
  
    setUploading(true);
    const formData = new FormData();
    formData.append('image', imageFile);
  
    try {
      const response = await fetch('http://localhost:5000/api/upload-event-home', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message || 'Image uploaded successfully!');
        onImageUpload(result.imageUrl); // Notify parent component with the image URL
      } else {
        setMessage(result.message || 'Failed to upload image.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage('Error uploading image.');
    } finally {
      setUploading(false);
    }
  };
  

  return (
    <div className="upload-container text-center mb-5">
      <div className="flex justify-start items-center space-x-4">
        <label
          htmlFor="file-upload"
          className="flex justify-center items-center bg-blue-600 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-700"
        >
          <FiImage className="mr-2" size={20} />
          Select Image
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
        </label>
        <button
          onClick={handleUpload}
          disabled={uploading || !imageFile}
          className={`flex items-center justify-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 ${
            uploading ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          <FiUpload className="mr-2" size={20} />
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      {message && (
        <p className={`mt-2 ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default EventHomeUpload;
