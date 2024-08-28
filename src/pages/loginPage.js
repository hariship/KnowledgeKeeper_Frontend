import React, { useState } from 'react';
import '../components/login/login-style.css';
import FeatureItem from '../components/login/featureItem';
import LoginButton from '../components/login/loginButton';
import icons from '../assets/icons';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('loginForm');
  const [transitioning, setTransitioning] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [showEmailWarning, setShowEmailWarning] = useState(false);
  const [showPasswordLengthWarning, setPasswordLengthWarning] = useState(false);
  const [showConfirmPasswordWarning, setConfirmPasswordWarning] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [createPasswordVisible, setCreatePasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleCreatePasswordVisibility = () => {
    setCreatePasswordVisible(!createPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (value) => {
    const passwordRegex = /^.{6,}$/;
    return passwordRegex.test(value);
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  }
  const handleCreatePasswordChange = (e) => {
    const value = e.target.value;
    setCreatePassword(value);
    const isValid = validatePassword(value);
    console.log(isValid);
    setPasswordLengthWarning(!isValid);
  }

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordWarning(value !== createPassword);
  }

  const handleEmailChange = (e) => {
    //TODO
    setNewUser(true);
    const value = e.target.value;
    setEmail(value);
    const isValid = validateEmail(value);
    setIsEmailValid(isValid);
    setShowEmailWarning(!isValid && value.length > 4);
  };
  const handleGoogleSuccess = (credentialResponse) => {
    console.log(credentialResponse);
  };

  const handleGoogleFailure = (error) => {
    console.log('Login Failed', error);
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleFailure,
  });


  const featureItems = [
    {
      icon: icons.loginOrganise,
      title: "Organize Your Knowledge Base",
      description: "Effortlessly build and manage comprehensive documentation for your products.",
    },
    {
      icon: icons.loginRequest,
      title: "Centralised Change Requests",
      description: "Streamline all documentation change requests from clients and stakeholders into a single, easy-to-manage platform.",
    },
    {
      icon: icons.loginAI,
      title: "AI-Powered Editing Assistance",
      description: "Receive smart recommendations on edits and updates with our integrated AI assistant.",
    },
  ];

  const loginButtonItems = [
    {
      activeIcon: icons.googleIcon,
      icon: icons.googleIcon,
      text: "Continue with Google",
      onClick: loginWithGoogle,
    },
    {
      activeIcon: icons.microsoftIcon,
      icon: icons.microsoftIcon,
      text: "Continue with Microsoft ID",
      onClick: () => {
        navigate('/home/all-requests');
      },
    },
    {
      activeIcon: icons.wMailIcon,
      icon: icons.mailIcon,
      text: "Continue with Email",
      onClick: () => {
        setTransitioning(true);
        setTimeout(() => {
          setActiveView('emailForm');
          setTransitioning(false);
        }, 500);
      },
    },
  ];

  const renderForm = () => {
    switch (activeView) {
      case 'googleForm':
        return (
          <div className={`form-transition ${transitioning ? 'form-leave' : 'form-enter'}`}>
            <div className="google-login-form">
              <h2>Welcome Back</h2>
              <p>Sign in to get free access to all features</p>
              <div className='google-old-user'>
                <div className='google-old-user-row'>
                  <div className='image-frame'><img src={icons.defaultImage} alt='img' /> </div>
                  <div className='google-old-user-column'>
                    <h2>User name</h2>
                    <p>user_email@gmail.com</p>
                  </div>
                </div>
                <button className='dynamic-button'>Continue</button>
              </div>
              <div className="separator-row">
                  <div className="vertical-line"></div>
                  <span className="or-text">OR</span>
                  <div className="vertical-line"></div>
                </div>
              <button onClick={loginWithGoogle}>Continue another account</button>
            </div>
          </div>
        );
      case 'emailForm':
        return (
          <div className={`form-transition ${transitioning ? 'form-transition-exit' : '.form-transition-enter'}`}>
            <div className="email-login-form">
              <div className='email-login-header'><img src={icons.backArrow} alt='back' onClick={() => {
                setTransitioning(true);
                setTimeout(() => {
                  setActiveView('loginForm');
                  setTransitioning(false);
                }, 500);
              }} /><h2>Continue with Email</h2></div>
              <p>Get free access to all features</p>
              <form>
                <label>Email Id
                  <input
                    type="email"
                    placeholder="Enter your email id"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </label>
                {showEmailWarning && <span className="email-warning">*Please enter a valid email address.</span>}
                {isEmailValid && (
                  <div>
                    {newUser ? (
                      <>
                        <label>Create Password
                          <div className="password-input-wrapper">
                            <input
                              type={createPasswordVisible ? "text" : "password"}
                              placeholder="Enter password"
                              value={createPassword}
                              onChange={handleCreatePasswordChange}
                            />
                            <img
                              style={{ height: '20px', width: '20px' }}
                              src={createPasswordVisible ? icons.eyeOn : icons.eyeOff}
                              alt="Toggle visibility"
                              className="password-toggle-icon"
                              onClick={toggleCreatePasswordVisibility}
                            />
                          </div>
                        </label>
                        <label>Re-enter Password
                          <div className="password-input-wrapper">
                            <input
                              type={confirmPasswordVisible ? "text" : "password"}
                              placeholder="Enter password"
                              value={confirmPassword}
                              onChange={handleConfirmPasswordChange}
                            />
                            <img
                              style={{ height: '20px', width: '20px' }}
                              src={confirmPasswordVisible ? icons.eyeOn : icons.eyeOff}
                              alt="Toggle visibility"
                              className="password-toggle-icon"
                              onClick={toggleConfirmPasswordVisibility}
                            />
                          </div>
                        </label>
                      </>
                    ) : (
                      <label>Password
                        <div className="password-input-wrapper">
                          <input
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Enter password"
                            value={password}
                            onChange={handlePasswordChange}
                          />
                          <img
                            style={{ height: '20px', width: '20px' }}
                            src={passwordVisible ? icons.eyeOn : icons.eyeOff}
                            alt="Toggle visibility"
                            className="password-toggle-icon"
                            onClick={togglePasswordVisibility}
                          />
                        </div>
                      </label>
                    )} </div>)}
                {showConfirmPasswordWarning && <span className="email-warning">*Password does not match the confirm password.</span>}
                {showPasswordLengthWarning && <span className="email-warning">*Password must be at least 6 characters long and include one uppercase letter, one number, and one special character.</span>}
                <button className='dynamic-button' type="submit" disabled={!isEmailValid}>Log In</button>
              </form>
            </div>
          </div>
        );
      default:
        return (
          <div className={`form-transition ${transitioning ? 'form-transition-exit' : '.form-transition-enter'}`}>
            <>
              <h2>Log In</h2>
              <p>Sign in to get free access to all features</p>
              {loginButtonItems.map((e, index) => (
                <LoginButton
                  key={index}
                  activeIcon={e.activeIcon}
                  icon={e.icon}
                  text={e.text}
                  onClick={e.onClick}
                />
              ))}

            </>
          </div>
        );
    }
  };
  return (
    <div className="login-page-container">
      <div className="login-content-wrapper">
        {/* Left side: Features */}
        <div className="features-container">
          <h1 className='login-header'>Knowledge Keeper</h1>
          {featureItems.map((item, index) => (
            <FeatureItem
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>

        {/* Right side: Login */}
        <div className="login-container">{renderForm()}</div>
      </div>
      <div className='below-text'>
        <span className='privacy-policy'>Privacy Policy</span>
        <span className='terms-conditions'>Terms & Conditions</span>
      </div>
    </div>
  );
};

export default LoginPage;
