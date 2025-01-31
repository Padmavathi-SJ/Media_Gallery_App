import React, { useState, useEffect } from 'react';
import { FiUpload, FiImage } from 'react-icons/fi';
import { FaUpload } from 'react-icons/fa';

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [imageName, setImageName] = useState('');
  const [uploadType, setUploadType] = useState('');
  const [cadets, setCadets] = useState([]);
  const [selectedCadet, setSelectedCadet] = useState('');

  // Fetch cadets on mount
  useEffect(() => {
    if (uploadType === 'cadet') {
      const fetchCadets = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/cadets');
          const data = await response.json();
          setCadets(data);
        } catch (error) {
          console.error('Error fetching cadets:', error);
        }
      };

      fetchCadets();
    }
  }, [uploadType]);

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

    if (uploadType === 'cadet' && !selectedCadet) {
      setMessage('Please select a cadet.');
      return;
    }

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('image', selectedImage);

    if (uploadType === 'cadet') {
      formData.append('cadet_id', selectedCadet);
    }

    const apiUrl = uploadType === 'cadet' 
      ? `http://localhost:5000/api/cadets/${selectedCadet}/upload`
      : 'http://localhost:5000/api/upload';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('Image uploaded successfully!');
      } else {
        setMessage('Failed to upload image.');
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
      {/* Upload Type Selection */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700">Select Upload Type:</label>
        <select
          className="border p-2 w-full mt-2 rounded-md"
          value={uploadType}
          onChange={(e) => setUploadType(e.target.value)}
        >
          <option value="">-- Choose Upload Type --</option>
          <option value="homePage">Upload Image for Home Page</option>
          <option value="cadet">Upload Image for Cadet</option>
        </select>
      </div>

      {/* Cadet Selection (only visible if cadet upload is selected) */}
      {uploadType === 'cadet' && (
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Select Cadet:</label>
          <select
            className="border p-2 w-full mt-2 rounded-md"
            value={selectedCadet}
            onChange={(e) => setSelectedCadet(e.target.value)}
          >
            <option value="">-- Select Cadet --</option>
            {cadets.map((cadet) => (
              <option key={cadet.cadet_id} value={cadet.cadet_id}>
                {cadet.cadet_name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Image Selection */}
      <div className="flex justify-start items-center space-x-4 mb-4">
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
      </div>

      {/* Upload Button */}
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

      {/* Image Name */}
      {imageName && <p className="text-gray-600 mt-2">{imageName}</p>}

      {/* Message */}
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
