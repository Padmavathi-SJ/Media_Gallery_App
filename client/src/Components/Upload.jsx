import React, { useState, useEffect } from 'react';
import { FiUpload, FiImage, FiX } from 'react-icons/fi';

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [imageName, setImageName] = useState('');
  const [uploadType, setUploadType] = useState('');
  const [cadets, setCadets] = useState([]);
  const [selectedCadet, setSelectedCadet] = useState('');

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
      const response = await fetch(apiUrl, { method: 'POST', body: formData });
      setMessage(response.ok ? 'Image uploaded successfully!' : 'Failed to upload image.');
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage('Error uploading image.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container text-center mb-5 bg-gray-700 p-6 rounded-lg border border-gray-500 shadow-lg text-white">
      <div className="mb-4">
        <label className="block font-medium text-gray-200">Select Upload Type:</label>
        <select
          className="border p-2 w-full mt-2 rounded-md bg-gray-600 text-white shadow-sm focus:ring focus:ring-blue-300"
          value={uploadType}
          onChange={(e) => setUploadType(e.target.value)}
        >
          <option value="">-- Choose Upload Type --</option>
          <option value="homePage">Upload Image for Home Page</option>
          <option value="cadet">Upload Image for Cadet</option>
        </select>
      </div>

      {uploadType === 'cadet' && (
        <div className="mb-4">
          <label className="block font-medium text-gray-200">Select Cadet:</label>
          <select
            className="border p-2 w-full mt-2 rounded-md bg-gray-600 text-white shadow-sm focus:ring focus:ring-blue-300"
            value={selectedCadet}
            onChange={(e) => setSelectedCadet(e.target.value)}
          >
            <option value="">-- Select Cadet --</option>
            {cadets.map((cadet) => (
              <option key={cadet.cadet_id} value={cadet.cadet_id}>{cadet.cadet_name}</option>
            ))}
          </select>
        </div>
      )}

      <div className="flex justify-center items-center space-x-4 mb-4">
        <label htmlFor="image-upload" className="flex justify-center items-center bg-blue-600 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-700">
          <FiImage className="mr-2" size={20} />
          Select Image
          <input type="file" id="image-upload" className="hidden" onChange={handleImageChange} accept="image/*" />
        </label>
      </div>

      <div className="flex justify-center items-center space-x-4">
        <button onClick={handleSubmit} disabled={uploading || !selectedImage} className={`flex items-center justify-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 ${uploading ? 'cursor-not-allowed opacity-50' : ''}`}>
          <FiUpload className="mr-2" size={20} />
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        <button onClick={() => setSelectedImage(null)} className="flex items-center justify-center bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">
          <FiX className="mr-2" size={20} />
          Close
        </button>
      </div>

      {imageName && <p className="text-gray-300 mt-2">{imageName}</p>}
      {message && <p className={`mt-2 ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}>{message}</p>}
    </div>
  );
};

export default Upload;