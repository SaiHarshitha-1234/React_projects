/*
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("authToken"); // Check for auth token instead
    
    if (!isLoggedIn) {
      alert("You are not logged in. Redirecting to login page...");
      navigate("/login");
      return;
    }

    // Clear all auth-related items
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData"); // Remove any other user data if stored
    
    alert("Logout successful!");
    navigate("/login"); // Redirect to login page after logout
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Logging out...</h1>
    </div>
  );
};

export default Logout;
*/




/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Logout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('http://localhost/api/check-auth.php', {
          withCredentials: true // Send cookies automatically
        });

        if (response.data.success) {
          setIsLoggedIn(true);
          setUser(response.data.user);
        } else {
          setIsLoggedIn(false);
          setMessage(response.data.message || 'You are not logged in.');
        }
      } catch (error) {
        setIsLoggedIn(false);
        setMessage('Error verifying your session. Please login again.');
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost/api/logout.php', {}, {
        withCredentials: true // Send cookies automatically
      });

      if (response.data.success) {
        setIsLoggedIn(false);
        setMessage('Logout successful! Redirecting...');
        setTimeout(() => navigate('/end'), 2000);
      } else {
        setMessage(response.data.message || 'Logout failed.');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Logout failed. Please try again.');
    }
  };

  
  
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark w-100" style={{ backgroundColor: "navy", height: "60px", padding: "5px 10px" }}>
                            <a className="navbar-brand" href="#">
                                <img src="https://thumbs.dreamstime.com/z/dv-vd-abstract-outstanding-professional-business-awesome-artistic-branding-company-different-colors-illustration-logo-291485919.jpg" alt="Logo" style={{ width: "50px", height: "auto", paddingLeft: "5px" }} />
                            </a>
                            <div className="collapse navbar-collapse" id="nav">
                                <ul className="navbar-nav w-100 d-flex justify-content-around">
                                    <li className="nav-item"><Link className="nav-link text-white" to="/App">Home</Link></li>
                                    <li className="nav-item"><Link className="nav-link text-white" to="/information">Information</Link></li>
                                    <li className="nav-item"><Link className="nav-link text-white" to="/chatbox">Chatbox</Link></li>
                                    <li className="nav-item"><Link className="nav-link text-white" to="/gallery">Gallery</Link></li>
                                    <li className="nav-item"><Link className="nav-link text-white" to="/contact">Contact</Link></li>
                                    <li className="nav-item"><Link className="nav-link text-white" to="/login">
                                        <button className="btn btn-danger" >Login</button></Link>
                                    </li>
                                    
                                </ul>
                            </div>
                        </nav>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg">
              <div className="card-body text-center">
                <h2 className="card-title mb-4">Logout</h2>
                
                {message && (
                  <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>
                    {message}
                  </div>
                )}

                {isLoggedIn ? (
                  <>
                    <p className="mb-4">Hello, {user?.name}! Are you sure you want to logout?</p>
                    <button 
                      onClick={handleLogout}
                      className="btn btn-danger btn-lg"
                    >
                      Confirm Logout
                    </button>
                  </>
                ) : (
                  <>
                    <p className="mb-4">You need to login first to access this page.</p>
                    <Link to="/" className="btn btn-primary btn-lg">
                      Go to Login Page
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;
*/


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Logout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const checkAuthStatus = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost/api/check-auth.php', {
          withCredentials: true,
        });
  
        console.log('Full Auth Response:', response); // Log full response for debugging
  
        if (response.data?.success) {
          setIsLoggedIn(true);
          setUser(response.data.user || {}); // Ensure user is always an object
        } else {
          setIsLoggedIn(false);
          setMessage(response.data?.message || 'Please login to continue.');
        }
      } catch (error) {
        console.error('Auth Check Error:', error.response || error);
        setIsLoggedIn(false);
        setMessage('Error verifying your session. Please try again.');
      } finally {
        setLoading(false);
      }
    };
  
    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        'http://localhost/api/logout.php', 
        {}, 
        { withCredentials: true }
      );
  
      console.log('Logout Response:', response); // Debugging
  
      if (response.data?.success) {
        setIsLoggedIn(false);
        setUser(null);
        setMessage('Logout successful! Redirecting...');
        setTimeout(() => navigate('/end'), 2000);
      } else {
        setMessage(response.data?.message || 'Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout Error:', error.response || error);
      setMessage(error.response?.data?.message || 'Logout failed. Please try again.');
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark w-100" style={{ backgroundColor: 'navy', height: '60px', padding: '5px 10px' }}>
        <a className="navbar-brand" href="#">
          <img
            src="https://thumbs.dreamstime.com/z/dv-vd-abstract-outstanding-professional-business-awesome-artistic-branding-company-different-colors-illustration-logo-291485919.jpg"
            alt="Logo"
            style={{ width: '50px', height: 'auto', paddingLeft: '5px' }}
          />
        </a>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav w-100 d-flex justify-content-around">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/App">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/information">
                Information
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/chatbox">
                Chatbox
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/gallery">
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/login">
                <button className="btn btn-danger">Login</button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg">
              <div className="card-body text-center">
                <h2 className="card-title mb-4">Logout</h2>

                {loading ? (
                  <p>Loading...</p> // Display loading message
                ) : (
                  <>
                    {message && (
                      <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>
                        {message}
                      </div>
                    )}

                    {isLoggedIn ? (
                      <>
                        <p className="mb-4">Hello, {user?.name}! Are you sure you want to logout?</p>
                        <button onClick={handleLogout} className="btn btn-danger btn-lg">
                          Confirm Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="mb-4">You need to login first to access this page.</p>
                        <Link to="/" className="btn btn-primary btn-lg">
                          Go to Login Page
                        </Link>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;
