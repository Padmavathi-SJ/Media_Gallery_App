import React, { useState } from 'react';
import { FiUpload, FiImage } from 'react-icons/fi';

const AkilaUpload = ({ onUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImageName(file.name);
      setMessage('');
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      setMessage('Please select an image to upload.');
      return;
    }

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch('http://localhost:5000/api/akila/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload the image.');
      }

      const data = await response.json();
      setMessage('Image uploaded successfully!');
      if (onUpload) onUpload(data); // Callback for parent component if needed
    } catch (error) {
      console.error(error);
      setMessage('Error uploading image.');
    } finally {
      setUploading(false);
      setSelectedImage(null);
      setImageName('');
    }
  };

  return (
    <div className="akila-upload text-center mb-5">
      {/* Select Image Button */}
      <div className="flex items-center space-x-4">
        <label
          htmlFor="akila-image-upload"
          className="flex justify-center items-center bg-blue-600 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-700"
        >
          <FiImage className="mr-2" size={20} />
          Select Image
          <input
            type="file"
            id="akila-image-upload"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />
        </label>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={uploading || !selectedImage}
          className={`flex items-center justify-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 ${
            uploading ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          <FiUpload className="mr-2" size={20} />
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      {/* Display Selected Image Name */}
      {imageName && <p className="text-gray-600 mt-2">{imageName}</p>}

      {/* Success/Error Message */}
      {message && (
        <p
          className={`mt-2 ${
            message.includes('success') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default AkilaUpload;
