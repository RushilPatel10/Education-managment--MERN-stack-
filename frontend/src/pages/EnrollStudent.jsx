import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EnrollStudent = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found, please log in again');
        }
        // Fetch courses
        const response = await axios.get('http://localhost:5000/api/courses/view', {
          headers: { Authorization: `Bearer ${token}` } // Attach the token here
        });
        setCourses(response.data.courses);
        // console.log(response.data.courses)
      } catch (error) {
        setError('Failed to load courses. Please try again.');
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found, please log in again.');
      }

      const response = await axios.post(
        'http://localhost:5000/api/enrollcourses/enroll', // Updated URL
        {
          studentEmail,
          courseId: selectedCourse,
        },
        {
          headers: { Authorization: `Bearer ${token}` } // Include token
        }
      );
      setMessage(response.data.message);
      setStudentEmail('');
      setSelectedCourse('');
    } catch (error) {
      console.error('Error enrolling student:', error);
      setError(error.response?.data?.message || 'Enrollment failed');
    }
  };

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="page-header">
          <div className="page-block">
            <ul className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item"><a >Forms</a></li>
              <li className="breadcrumb-item" aria-current="page">Entroll Students</li>
            </ul>
            <div className="page-header-title">
              <h2 className="mb-0">Entroll Students</h2>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <div className="card">
              <div className="card-header">
                <h5>Enroll Student</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleEnroll}>
                  <div className="form-group ">
                      <label htmlFor="studentEmail">Student Email:</label>
                      <input type="email" className='form-control' id="studentEmail" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} placeholder="Enter student email" required/>
                  </div>

                  <div className="form-group mt-3">
                      <label htmlFor="course">Select Course:</label>
                      <select id="course" className='form-control' value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} required >
                        <option value="" >-- Select a Course --</option>
                        {courses.map((course) => (
                          <option  key={course._id} value={course._id}>{course.title}</option>
                        ))}
                      </select>
                  </div>
                  <button type="submit" className='btn btn-primary mt-3'>Enroll Student</button>
                </form>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
              </div>
            </div>
          </div>
        </div>
        {/* Main Content end */}
      </div>
    </div>
  );
};

export default EnrollStudent;
