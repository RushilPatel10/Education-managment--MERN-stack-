import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // For getting courseId from URL and navigating

const AddCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [assignedTeacher, setAssignedTeacher] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { courseId } = useParams(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    if (courseId) {
      console.log('Fetching course with ID:', courseId); // Debugging line
  
      const fetchCourseDetails = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:5000/api/courses/${courseId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
  
          const course = response.data;
          setTitle(course.title);
          setDescription(course.description);
          setStartDate(course.startDate);
          setEndDate(course.endDate);
          setAssignedTeacher(course.assignedTeacher.email); // Assuming assignedTeacher is an object
        } catch (error) {
          setError('Failed to load course details.');
        }
      };
  
      fetchCourseDetails();
    }
  }, [courseId])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const courseData = {
      title,
      description,
      startDate,
      endDate,
      assignedTeacher,
    };

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      let response;
      if (courseId) {
        response = await axios.put(`http://localhost:5000/api/courses/edit/${courseId}`, courseData, config);
      } else {
        response = await axios.post('http://localhost:5000/api/courses/create', courseData, config);
      }
      if (response.data) {
        setSuccess(`Course ${courseId ? 'updated' : 'added'} successfully!`);
        navigate('/view-courses');
      }
    } catch (error) {
      setError('Failed to submit the course. Please try again.');
    }
  };

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="page-header">
          <div className="page-block">
            <ul className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item"><a href="javascript: void(0)">Forms</a></li>
              <li className="breadcrumb-item" aria-current="page">{courseId ? 'Edit Course' : 'Add Course'}</li>
            </ul>
            <div className="page-header-title">
              <h2 className="mb-0">{courseId ? 'Edit Course' : 'Add Course'}</h2>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <div className="card">
              <div className="card-header">
                <h5>{courseId ? 'Edit Course' : 'Course Form'}</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-6">
                      <div className="mb-3">
                        <label className="form-label">Course Title:</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter course title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <small className="form-text text-muted">Please enter the course title</small>
                      </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <div className="mb-3">
                        <label className="form-label">Assigned Teacher (Email):</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter teacher's email"
                          value={assignedTeacher}
                          onChange={(e) => setAssignedTeacher(e.target.value)}
                        />
                        <small className="form-text text-muted">Please enter the teacher's email</small>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-6">
                      <div className="mb-3">
                        <label className="form-label">Start Date:</label>
                        <input
                          type="date"
                          className="form-control"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                        <small className="form-text text-muted">Please select the start date</small>
                      </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <div className="mb-3">
                        <label className="form-label">End Date:</label>
                        <input
                          type="date"
                          className="form-control"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                        <small className="form-text text-muted">Please select the end date</small>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12">
                      <div className="mb-3">
                        <label className="form-label">Description:</label>
                        <textarea
                          className="form-control"
                          placeholder="Enter course description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <small className="form-text text-muted">Please provide a brief description of the course</small>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button type="submit" className="btn btn-primary w-full">{courseId ? 'Update Course' : 'Add Course'}</button>
                  </div>
                </form>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                {success && <div className="alert alert-success mt-3">{success}</div>}
              </div>
            </div>
          </div>
        </div>
        {/* Main Content end */}
      </div>
    </div>
  );
};

export default AddCourse;
