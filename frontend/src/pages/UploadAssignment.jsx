import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UploadAssignment = () => {
  const { courseId } = useParams(); // Get the course ID from the URL
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Store the selected file in state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('assignmentFile', file); // This must match 'assignmentFile' in the backend

    try {
      const token = localStorage.getItem('token'); // Get the JWT token from localStorage

      // Make the request to upload the file
      const response = await axios.post(`http://localhost:5000/api/assignments/upload/${courseId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Include the token in the request
        },
      });

      if (response.data) {
        setSuccess('Assignment uploaded successfully');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to upload assignment. Please try again.');
      }
    }
  };

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="page-header">
          <div className="page-block">
            <ul className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item" aria-current="page">Upload Assignment</li>
            </ul>
            <div className="page-header-title">
              <h2 className="mb-0">Upload Assignment</h2>
            </div>
          </div>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Assignment File</label>
            <input type="file" className="form-control" onChange={handleFileChange} />
          </div>
          <button type="submit" className="btn btn-primary">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default UploadAssignment;
