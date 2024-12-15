import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewGrades = () => {
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch grades for the logged-in student
    const fetchGrades = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/grades/my-grades', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGrades(response.data);
      } catch (error) {
        setError('Failed to load grades.');
      }
    };

    fetchGrades();
  }, []);

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="page-header">
          <div className="page-block">
            <ul className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item" aria-current="page">View Grades</li>
            </ul>
            <div className="page-header-title">
              <h2 className="mb-0">My Grades</h2>
            </div>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card">
          <div className="card-header">
            <h5>Grades</h5>
          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Course Title</th>
                  <th>Assignment File</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((grade) => (
                  <tr key={grade._id}>
                    <td>{grade.course.title}</td>
                    <td><a href={`http://localhost:5000/${grade.filePath}`} target="_blank" rel="noopener noreferrer">View Assignment</a></td>
                    <td>{grade.grade ? grade.grade : 'Not graded yet'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewGrades;
