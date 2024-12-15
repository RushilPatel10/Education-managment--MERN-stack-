import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const loginData = { email, password };

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', loginData);
      
      if (response.data) {
        localStorage.setItem('token', response.data.token); 
        localStorage.setItem('role', response.data.role);   
        console.log(response.data.role)
        // navigate('/'); 

        // Redirect based on the user's role
        if (response.data.role === 'Admin') {
          navigate('/'); 
        } else if (response.data.role === 'Teacher') {
          navigate('/view-courses');  
        } else if (response.data.role === 'Student') {
          navigate('/view-courses');  
        }
      }
    } catch (error) {
      // Handle error from server
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };


  return (
    <div className="auth-main relative">
      <div className="auth-wrapper v2 flex items-center w-full h-full min-h-screen">
        <div className="auth-form flex items-center justify-center grow flex-col min-h-screen bg-cover relative p-6 bg-theme-cardbg dark:bg-themedark-cardbg">
          <div className="card sm:my-12 w-full max-w-[480px] border-none shadow-none">
            <div className="card-body sm:!p-10">
              <div className="text-center mb-5">
              
              </div>
              <h4 className="text-center font-medium mb-4">Login with your email</h4>

              {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="floatingInput"
                    placeholder="Email Address"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="floatingInput1"
                    placeholder="Password"
                  />
                </div>
                <div className="flex mt-1 justify-between items-center flex-wrap">
                  <div className="form-check">
                    <input className="form-check-input input-primary" type="checkbox" id="customCheckc1" defaultChecked />
                    <label className="form-check-label text-muted" htmlFor="customCheckc1">
                      Remember me?
                    </label>
                  </div>
                  <h6 className="font-normal text-primary-500 mb-0">
                    <a href="/register">Forgot Password?</a>
                  </h6>
                </div>
                <div className="mt-4">
                  <button type="submit" className="btn btn-primary w-full">
                    Login
                  </button>
                </div>
              </form>

              <div className="flex justify-between items-end flex-wrap mt-4">
                <h6 className="f-w-500 mb-0">Don't have an Account?</h6>
                <a href="/register" className="text-primary-500">
                  Create Account
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
