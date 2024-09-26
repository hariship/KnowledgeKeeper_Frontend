import React, { useState, useEffect } from "react";
import "../components/login/login-style.css";
import FeatureItem from "../components/login/featureItem";
import LoginButton from "../components/login/loginButton";
import icons from "../assets/icons";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import SvgBackArrow from "../icons/BackArrow";
import { apiService } from "../services/apiService";
const featureItems = [
  {
    icon: icons.loginOrganise,
    title: "Organize Your Knowledge Base",
    description:
      "Effortlessly build and manage comprehensive documentation for your products.",
  },
  {
    icon: icons.loginRequest,
    title: "Centralised Change Requests",
    description:
      "Streamline all documentation change requests from clients and stakeholders into a single, easy-to-manage platform.",
  },
  {
    icon: icons.loginAI,
    title: "AI-Powered Editing Assistance",
    description:
      "Receive smart recommendations on edits and updates with our integrated AI assistant.",
  },
];

const InputField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  showWarning,
  warningMessage,
  toggleVisibility,
  isPasswordVisible,
}) => {
  return (
    <label className="input-label">
      {label}
      <div className="password-input-wrapper">
        <input
          className="input-style"
          type={type === "password" && !isPasswordVisible ? "password" : "text"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <img
            style={{ height: "20px", width: "20px" }}
            src={isPasswordVisible ? icons.eyeOn : icons.eyeOff}
            alt="Toggle visibility"
            className="password-toggle-icon"
            onClick={toggleVisibility}
          />
        )}
      </div>
      {showWarning && <span className="email-warning">{warningMessage}</span>}
    </label>
  );
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("loginForm");
  const [transitioning, setTransitioning] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [showEmailWarning, setShowEmailWarning] = useState(false);
  const [showPasswordLengthWarning, setPasswordLengthWarning] = useState(false);
  const [showConfirmPasswordWarning, setConfirmPasswordWarning] =
    useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [createPasswordVisible, setCreatePasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Validate login form for existing users
    if (!newUser) {
      setIsFormValid(isEmailValid && password.length >= 6);
    }
    // Validate registration form for new users
    else {
      setIsFormValid(
        isEmailValid &&
          createPassword.length >= 6 &&
          confirmPassword === createPassword
      );
    }
  }, [isEmailValid, password, createPassword, confirmPassword, newUser]);
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
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };
  const handleCreatePasswordChange = (e) => {
    const value = e.target.value;
    setCreatePassword(value);
    const isValid = validatePassword(value);
    console.log(isValid);
    setPasswordLengthWarning(!isValid);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordWarning(value !== createPassword);
  };

  const handleEmailChange = (e) => {
    //TODO
    setNewUser(false);
    const value = e.target.value;
    setEmail(value);
    const isValid = validateEmail(value);
    setIsEmailValid(isValid);
    setShowEmailWarning(!isValid && value.length > 4);
  };
  const handleGoogleSuccess = async (credentialResponse) => {
    console.log("here is cred", credentialResponse);
    try {
      const data = await apiService.loginWithGoogle(
        credentialResponse.access_token
      );
      console.log("Login successful:", data);
      navigate("/home/all-requests");
    } catch (e) {
      console.error("Login failed:", e);
    }
  };

  const handleGoogleFailure = (error) => {
    console.log("Login Failed", error);
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleFailure,
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await apiService.login(email, password);
      console.log("Login successful:", data);
      if (data.status === "success") {
        navigate("/home/all-requests");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("working", email, createPassword);
    if (!email || !createPassword) {
      console.error("Email and password are required.");
      return;
    }

    try {
      console.log("here workinhg");
      const data = await apiService.register(email, createPassword);
      console.log(data);
      navigate("/home/all-requests");
      console.log("Registration successful:", data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const loginButtonItems = [
    {
      activeIcon: icons.googleIcon,
      icon: icons.googleIcon,
      text: "Continue with Google",
      onClick: loginWithGoogle,
    },
    {
      activeIcon: icons.wMailIcon,
      icon: icons.mailIcon,
      text: "Continue with Email",
      onClick: () => {
        setTransitioning(true);
        setTimeout(() => {
          setActiveView("emailForm");
          setTransitioning(false);
        }, 500);
      },
    },
  ];

  const renderForm = () => {
    switch (activeView) {
      case "googleForm":
        return (
          <div
            className={`form-transition ${
              transitioning ? "form-leave" : "form-enter"
            }`}
          >
            <div className="google-login-form">
              <h2>Welcome Back</h2>
              <p>Sign in to get free access to all features</p>
              <div className="google-old-user">
                <div className="google-old-user-row">
                  <div className="image-frame">
                    <img src={icons.defaultImage} alt="img" />
                  </div>
                  <div className="google-old-user-column">
                    <h2>User name</h2>
                    <p>user_email@gmail.com</p>
                  </div>
                </div>
                <button className="dynamic-button">Continue</button>
              </div>
              <div className="separator-row">
                <div className="vertical-line"></div>
                <span className="or-text">OR</span>
                <div className="vertical-line"></div>
              </div>
              <button onClick={loginWithGoogle}>
                Continue another account
              </button>
            </div>
          </div>
        );
      case "emailForm":
        return (
          <div
            className={`form-transition ${
              transitioning ? "form-transition-exit" : ".form-transition-enter"
            }`}
          >
            <div className="email-login-form">
              <div className="email-login-header">
                <SvgBackArrow
                  onClick={() => {
                    setTransitioning(true);
                    setTimeout(() => {
                      setActiveView("loginForm");
                      setTransitioning(false);
                    }, 500);
                  }}
                />
                <h2 className="continue-email">Continue with Email</h2>
              </div>
              <p>Get free access to all features</p>
              <form>
                <InputField
                  label="Email Id"
                  type="email"
                  placeholder="Enter your email id"
                  value={email}
                  onChange={handleEmailChange}
                  showWarning={showEmailWarning}
                  warningMessage="*Please enter a valid email address."
                />
                {isEmailValid && (
                  <div>
                    {newUser ? (
                      <>
                        <InputField
                          label="Create Password"
                          type="password"
                          placeholder="Enter password"
                          value={createPassword}
                          onChange={handleCreatePasswordChange}
                          toggleVisibility={toggleCreatePasswordVisibility}
                          isPasswordVisible={createPasswordVisible}
                        />
                        <InputField
                          label="Re-enter Password"
                          type="password"
                          placeholder="Enter password"
                          value={confirmPassword}
                          onChange={handleConfirmPasswordChange}
                          toggleVisibility={toggleConfirmPasswordVisibility}
                          isPasswordVisible={confirmPasswordVisible}
                        />
                      </>
                    ) : (
                      <InputField
                        label="Password"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={handlePasswordChange}
                        toggleVisibility={togglePasswordVisibility}
                        isPasswordVisible={passwordVisible}
                      />
                    )}
                  </div>
                )}
                {showConfirmPasswordWarning && (
                  <span className="email-warning">
                    *Password does not match the confirm password.
                  </span>
                )}
                {showPasswordLengthWarning && (
                  <span className="email-warning">
                    *Password must be at least 6 characters long.
                  </span>
                )}
                <button
                  onClick={newUser ? handleRegister : handleLogin}
                  className={`dynamic-button ${isFormValid ? "" : "disabled"}`}
                  type="submit"
                  disabled={
                    !isFormValid || (newUser && showConfirmPasswordWarning)
                  }
                >
                  {newUser ? "Register" : "Log In"}
                </button>
              </form>
            </div>
          </div>
        );
      default:
        return (
          <div
            className={`form-transition ${
              transitioning ? "form-transition-exit" : ".form-transition-enter"
            }`}
          >
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
          <h1 className="login-header">Knowledge Keeper</h1>
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
      <div className="below-text">
        <span className="privacy-policy">Privacy Policy</span>
        <span className="terms-conditions">Terms & Conditions</span>
      </div>
    </div>
  );
};

export default LoginPage;
