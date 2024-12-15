


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [grade, setGrade] = useState(''); // Grade input for assignments

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token'); // Fetch token from localStorage
        const response = await axios.get('http://localhost:5000/api/teacher/assigned-courses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(response.data); // Set the fetched courses to state
      } catch (error) {
        console.error('Error fetching assigned courses:', error);
        setError('Failed to load courses.');
      }
    };

    fetchCourses();
  }, []);

  // Function to handle grade submission
  const handleGradeSubmit = async (assignmentId) => {
    try {
      console.log('Submitting grade for:', assignmentId);
      console.log('Grade value before conversion:', grade);
  
      // Ensure grade is a number
      const gradeValue = Number(grade);
  
      // Check for invalid input
      if (isNaN(gradeValue) || gradeValue < 0 || gradeValue > 100) {
        setError('Grade must be a number between 0 and 100.');
        return;
      }
  
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5000/api/teacher/assign-grade/${assignmentId}`,
        { grade: gradeValue }, // Send grade as a number
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log('Grade assigned response:', response.data);
      setSuccess('Grade assigned successfully!');
      setGrade('');
    } catch (error) {
      console.error('Error assigning grade:', error);
      setError('Failed to assign grade.');
    }
  };
  
  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="page-header">
          <div className="page-block">
            <ul className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item" aria-current="page">Teacher Dashboard</li>
            </ul>
            <div className="page-header-title">
              <h2 className="mb-0">Assigned Courses</h2>
            </div>
          </div>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {/* Display Assigned Courses */}
        {courses.map((course) => (
          <div key={course.course._id} className="card mb-4">
            <div className="card-header">
              <h5>{course.course.title}</h5>
              {/* <p>{course.course.description}</p> */}
            </div>
            <div className="card-body">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Assignment File</th>
                    <th>Grade</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {course.submissions.map((submission) => (
                    <tr key={submission._id}>
                      <td>{submission.student.name}</td>
                      <td>
                        <a href={`http://localhost:5000/${submission.filePath}`} target="_blank" rel="noopener noreferrer">View Assignment</a>
                      </td>
                      <td>{submission.grade ? submission.grade : 'Not graded yet'}</td>
                      <td>
                        <form onSubmit={(e) => {e.preventDefault(); handleGradeSubmit(submission._id); }}>
                          <input type="number" value={grade}onChange={(e) => setGrade(e.target.value)} placeholder="Enter grade" min="0"max="100"required/>
                          <button type="submit" className="btn btn-primary btn-sm">Assign Grade</button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherDashboard;
