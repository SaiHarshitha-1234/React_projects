import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";
import {  FaHome, FaInfoCircle, FaComments, FaImages, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';

function Login() {
  const [isActive, setIsActive] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [language, setLanguage] = useState('en'); // 'en' for English, 'te' for Telugu
  const [isTranslating, setIsTranslating] = useState(false);

  // Demo OTP - fixed for testing
  const DEMO_OTP = '123456';

  // Translation dictionary
  const translations = {
    en: {
      "Create Account": "Create Account",
      "Name": "Name",
      "Email": "Email",
      "Password": "Password",
      "Register": "Register",
      "Sign In": "Sign In",
      "Login": "Login",
      "Forgot Password?": "Forgot Password?",
      "We are happy to see you back": "We are happy to see you back",
      "Hello, Again": "Hello, Again",
      "Join our platform, Explore a new experience": "Join our platform, Explore a new experience",
      "Welcome": "Welcome",
      "Forgot Password": "Forgot Password",
      "Enter your email": "Enter your email",
      "Send OTP": "Send OTP",
      "Enter OTP (use 123456)": "Enter OTP (use 123456)",
      "Verify OTP": "Verify OTP",
      "Success!": "Success!",
      "Your email has been successfully verified!": "Your email has been successfully verified!",
      "Back to Login": "Back to Login",
      "Demo: We'll show the OTP on screen instead of sending it": "Demo: We'll show the OTP on screen instead of sending it",
      "Demo OTP: 123456": "Demo OTP: 123456",
      "Password must contain:": "Password must contain:",
      "Password meets all requirements": "Password meets all requirements",
      "At least 8 characters": "At least 8 characters",
      "At least one uppercase letter": "At least one uppercase letter",
      "At least one lowercase letter": "At least one lowercase letter",
      "At least one number": "At least one number",
      "At least one special character": "At least one special character",
      "Homepage": "Homepage",
      "Information": "Information",
      "Chatbox": "Chatbox",
      "Gallery": "Gallery",
      "Contact": "Contact",
      "digitalVillage": "Digital Village"
    },
    te: {
      "Create Account": "ఖాతా సృష్టించండి",
      "Name": "పేరు",
      "Email": "ఇమెయిల్",
      "Password": "పాస్వర్డ్",
      "Register": "నమోదు చేసుకోండి",
      "Sign In": "సైన్ ఇన్",
      "Login": "లాగిన్",
      "Forgot Password?": "పాస్వర్డ్ మర్చిపోయారా?",
      "We are happy to see you back": "మిమ్మల్ని తిరిగి చూడటం మాకు సంతోషంగా ఉంది",
      "Hello, Again": "హలో, మళ్ళీ",
      "Join our platform, Explore a new experience": "మా ప్లాట్‌ఫారమ్‌లో చేరండి, కొత్త అనుభవాన్ని అన్వేషించండి",
      "Welcome": "స్వాగతం",
      "Forgot Password": "పాస్వర్డ్ మర్చిపోయారా",
      "Enter your email": "మీ ఇమెయిల్ ను నమోదు చేయండి",
      "Send OTP": "OTP పంపండి",
      "Enter OTP (use 123456)": "OTP ను నమోదు చేయండి (123456 ఉపయోగించండి)",
      "Verify OTP": "OTP ని ధృవీకరించండి",
      "Success!": "విజయం!",
      "Your email has been successfully verified!": "మీ ఇమెయిల్ విజయవంతంగా ధృవీకరించబడింది!",
      "Back to Login": "లాగిన్‌కు తిరిగి వెళ్లండి",
      "Demo: We'll show the OTP on screen instead of sending it": "డెమో: మేము దానిని పంపకుండా స్క్రీన్‌లో OTPని చూపుతాము",
      "Demo OTP: 123456": "డెమో OTP: 123456",
      "Password must contain:": "పాస్వర్డ్ కలిగి ఉండాలి:",
      "Password meets all requirements": "పాస్వర్డ్ అన్ని అవసరాలను పూర్తి చేస్తుంది",
      "At least 8 characters": "కనీసం 8 అక్షరాలు",
      "At least one uppercase letter": "కనీసం ఒక పెద్ద అక్షరం",
      "At least one lowercase letter": "కనీసం ఒక చిన్న అక్షరం",
      "At least one number": "కనీసం ఒక సంఖ్య",
      "At least one special character": "కనీసం ఒక ప్రత్యేక అక్షరం",
      "Homepage": "హోమ్ పేజీ",
      "Information": "సమాచారం",
      "Chatbox": "చాట్ బాక్స్",
      "Gallery": "గ్యాలరీ",
      "Contact": "సంప్రదించండి",
      "digitalVillage": "డిజిటల్ విలేజ్"
    }
  };

  // Helper function to translate text
  const t = (text) => {
    return translations[language][text] || text;
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push(t("At least 8 characters"));
    if (!/[A-Z]/.test(password)) errors.push(t("At least one uppercase letter"));
    if (!/[a-z]/.test(password)) errors.push(t("At least one lowercase letter"));
    if (!/[0-9]/.test(password)) errors.push(t("At least one number"));
    if (!/[^A-Za-z0-9]/.test(password)) errors.push(t("At least one special character"));
    return errors;
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });

    if (name === 'password') {
      setPasswordErrors(validatePassword(value));
    }
  };

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const errors = validatePassword(registerData.password);
    
    if (errors.length > 0) {
      setMessage('Please fix password requirements');
      return;
    }

    try {
      const response = await axios.post('http://localhost/api/register.php', registerData);
      setMessage(response.data.message);
      if (response.data.success) {
        setIsActive(false);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/api/login.php', loginData);
      setMessage(response.data.message);
      if (response.data.success) {
        localStorage.setItem('authToken', response.data.token);
        window.location.href = '/App';
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!forgotPasswordEmail) {
      setMessage(t('Please enter your email'));
      return;
    }
    
    // For demo purposes, we're not actually sending an email
    setMessage(`${t('Demo OTP sent to')} ${forgotPasswordEmail}. ${t('Use OTP:')} ${DEMO_OTP}`);
    setOtpSent(true);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setMessage(t('Please enter the OTP'));
      return;
    }
    
    if (otp === DEMO_OTP) {
      setMessage(t('OTP verified successfully!'));
      setOtpVerified(true);
      alert(t("login successful...redirecting to homepage"));
      window.location.href = '/App';
      
      // Reset after 3 seconds
      setTimeout(() => {
        setShowForgotPassword(false);
        setForgotPasswordEmail('');
        setOtp('');
        setOtpSent(false);
        setOtpVerified(false);
      }, 3000);
    } else {
      setMessage(t('Invalid OTP. Please try again.'));
    }
  };

  const toggleRegisterPasswordVisibility = () => {
    setShowRegisterPassword(!showRegisterPassword);
  };

  const toggleLoginPasswordVisibility = () => {
    setShowLoginPassword(!showLoginPassword);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark" style={{ backgroundColor: '#5d8233' }}>
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img 
              src="https://thumbs.dreamstime.com/z/dv-vd-abstract-outstanding-professional-business-awesome-artistic-branding-company-different-colors-illustration-logo-291485919.jpg" 
              alt="Logo" 
              className="navbar-logo" 
              style={{ height: '40px', marginRight: '10px' }}
            />
            
          </Link>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/App">
                  <FaHome style={{ marginRight: '5px' }} />
                  {t("Home")}
                </Link>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link" to="/information">
                  <FaInfoCircle style={{ marginRight: '5px' }} />
                  {t("Information")}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/chatbox">
                  <FaComments style={{ marginRight: '5px' }} />
                  {t("Community Chat")}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/gallery">
                  <FaImages style={{ marginRight: '5px' }} />
                  {t("Gallery")}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  <FaEnvelope style={{ marginRight: '5px' }} />
                  {t("Contact Us")}
                </Link>
              </li>
            </ul>
            
            <div className="d-flex align-items-center"> 
              
              <div className="btn-group mr-2" role="group"> {/* Added margin for spacing */}
                <button
                  type="button"
                  className={`btn btn-sm ${language === 'en' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleLanguageChange('en')}
                  disabled={isTranslating}
                >
                  English
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${language === 'te' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleLanguageChange('te')}
                  disabled={isTranslating}
                >
                  తెలుగు
                </button>
              </div>
            </div>

            
          </div>
        </div>
      </nav>

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 56px)", // Subtract navbar height
        width: "100vw",
      }}>
        {!showForgotPassword ? (
          <div className={`content justify-content-center align-items-center d-flex shadow-lg ${isActive ? 'active' : ''}`} id='content'>
            
            {/* Register Form */}
            <div className='col-md-6 d-flex justify-content-center'>
              <form onSubmit={handleRegisterSubmit}>
                <div className='header-text mb-4'>
                  <h1>{t("Create Account")}</h1>
                </div>
                {message && <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
                <div className='input-group mb-3'>
                  <input 
                    type='text' 
                    name='name'
                    placeholder={t("Name")}
                    className='form-control form-control-lg bg-light fs-6'
                    value={registerData.name}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div className='input-group mb-3'>
                  <input 
                    type='email' 
                    name='email'
                    placeholder={t("Email")}
                    className='form-control form-control-lg bg-light fs-6'
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div className='input-group mb-3 position-relative'>
                  <input 
                    type={showRegisterPassword ? 'text' : 'password'}
                    name='password'
                    placeholder={t("Password")}
                    className='form-control form-control-lg bg-light fs-6 pe-5'
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                  />
                  <button 
                    type="button" 
                    className="btn btn-link position-absolute end-0 top-50 translate-middle-y p-0 me-2"
                    onClick={toggleRegisterPasswordVisibility}
                    style={{ 
                      background: 'none', 
                      border: 'none',
                      zIndex: 5,
                      cursor: 'pointer'
                    }}
                  >
                    {showRegisterPassword ? 
                      <FaEyeSlash className="text-secondary" /> : 
                      <FaEye className="text-secondary" />
                    }
                  </button>
                </div>
                {registerData.password && (
                  <div className="mb-3">
                    <small className="text-muted">{t("Password must contain:")}</small>
                    <ul className="list-unstyled">
                      {passwordErrors.length === 0 ? (
                        <li className="text-success">{t("Password meets all requirements")}</li>
                      ) : (
                        passwordErrors.map((error, index) => (
                          <li key={index} className="text-danger">{error}</li>
                        ))
                      )}
                    </ul>
                  </div>
                )}
                <div className='input-group mb-3 justify-content-center'>
                  <button type='submit' className='btn border-white text-white w-50 fs-6'>{t("Register")}</button>
                </div>
              </form>
            </div>
            
            {/* Login Form */}
            <div className='col-md-6 d-flex justify-content-center'>
              <form onSubmit={handleLoginSubmit}>
                <div className='header-text mb-4'>
                  <h1>{t("Sign In")}</h1>
                </div>
                {message && <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
                <div className='input-group mb-3'>
                  <input 
                    type='email' 
                    name='email'
                    placeholder={t("Email")}
                    className='form-control form-control-lg bg-light fs-6'
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <div className='input-group mb-3 position-relative'>
                  <input 
                    type={showLoginPassword ? 'text' : 'password'}
                    name='password'
                    placeholder={t("Password")}
                    className='form-control form-control-lg bg-light fs-6 pe-5'
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />
                  <button 
                    type="button" 
                    className="btn btn-link position-absolute end-0 top-50 translate-middle-y p-0 me-2"
                    onClick={toggleLoginPasswordVisibility}
                    style={{ 
                      background: 'none', 
                      border: 'none',
                      zIndex: 5,
                      cursor: 'pointer'
                    }}
                  >
                    {showLoginPassword ? 
                      <FaEyeSlash className="text-secondary" /> : 
                      <FaEye className="text-secondary" />
                    }
                  </button>
                </div>   
                <div className='input-group mb-3 justify-content-center'>
                  <button type='submit' className='btn text-white w-50 fs-6'>{t("Login")}</button>
                </div>
                <div className='text-center mt-3'>
                  <button 
                    type="button" 
                    className="btn btn-link" 
                    onClick={() => setShowForgotPassword(true)}
                  >
                    {t("Forgot Password?")}
                  </button>
                </div>    
              </form>
            </div>

            <div className='switch-content'>
              <div className='switch'>
                <div className='switch-panel switch-left'>
                  <button 
                    className='hidden btn border-white text-white w-50 fs-6' 
                    onClick={() => setIsActive(false)}
                  >
                    {t("Login")}
                  </button>
                  <p>{t("We are happy to see you back")}</p>
                  <h1>{t("Hello, Again")}</h1>
                </div>
                <div className='switch-panel switch-right'>
                  <button 
                    className='hidden btn border-white text-white w-50 fs-6' 
                    onClick={() => setIsActive(true)}
                  >
                    {t("Register")}
                  </button>
                  <p>{t("Join our platform, Explore a new experience")}</p>
                  <h1>{t("Welcome")}</h1>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Forgot Password Form */
          <div className="content justify-content-center align-items-center d-flex shadow-lg p-5">
            <form onSubmit={otpVerified ? null : (otpSent ? handleVerifyOtp : handleSendOtp)}>
              <div className='header-text mb-4 text-center'>
                <h1>{otpVerified ? t("Success!") : (otpSent ? t("Verify OTP") : t("Forgot Password"))}</h1>
              </div>
              {message && <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
              
              {otpVerified ? (
                <div className="text-center">
                  <p className="text-success">{t("Your email has been successfully verified!")}</p>
                  <button 
                    type="button" 
                    className="btn btn-primary mt-3"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setForgotPasswordEmail('');
                      setOtp('');
                      setOtpSent(false);
                      setOtpVerified(false);
                    }}
                  >
                    {t("Back to Login")}
                  </button>
                </div>
              ) : (
                <>
                  {!otpSent ? (
                    <>
                      <div className='input-group mb-3'>
                        <input 
                          type='email' 
                          placeholder={t("Enter your email")}
                          className='form-control form-control-lg bg-light fs-6'
                          value={forgotPasswordEmail}
                          onChange={(e) => setForgotPasswordEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className='text-center mb-3'>
                        <small className="text-muted">{t("Demo: We'll show the OTP on screen instead of sending it")}</small>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='input-group mb-3'>
                        <input 
                          type='text' 
                          placeholder={t("Enter OTP (use 123456)")}
                          className='form-control form-control-lg bg-light fs-6'
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          required
                        />
                      </div>
                      <div className='text-center mb-3'>
                        <small className="text-muted">{t("Demo OTP: 123456")}</small>
                      </div>
                    </>
                  )}
                  <div className='input-group mb-3 justify-content-center'>
                    <button type='submit' className='btn text-white w-50 fs-6'>
                      {otpSent ? t("Verify OTP") : t("Send OTP")}
                    </button>
                  </div>
                  <div className='text-center mt-3'>
                    <button 
                      type="button" 
                      className="btn btn-link" 
                      onClick={() => {
                        setShowForgotPassword(false);
                        setForgotPasswordEmail('');
                        setOtp('');
                        setOtpSent(false);
                        setOtpVerified(false);
                      }}
                    >
                      {t("Back to Login")}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;