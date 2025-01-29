import React, { useState } from 'react';
import { FiUpload, FiImage } from 'react-icons/fi';

const Upload = ({ onUploadClick }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [imageName, setImageName] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImageName(file.name);
      setMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      setMessage('Please select an image.');
      return;
    }
    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('Image uploaded successfully!');
      } else {
        setMessage('Failed to upload image.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error uploading image.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container text-center mb-5">
      <div className="flex justify-start items-center space-x-4">
        <label
          htmlFor="image-upload"
          className="flex justify-center items-center bg-blue-600 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-700"
        >
          <FiImage className="mr-2" size={20} />
          Select Image
          <input
            type="file"
            id="image-upload"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </label>
        <button
          onClick={handleSubmit}
          disabled={uploading || !selectedImage}
          className={`flex items-center justify-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 ${
            uploading ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          <FiUpload className="mr-2" size={20} />
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      {imageName && <p className="text-gray-600 mt-2">{imageName}</p>}
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

export default Upload;
