import React, { useState, useEffect } from "react";
import "../components/login/login-style.css";
import FeatureItem from "../components/login/featureItem";
import LoginButton from "../components/login/loginButton";
import icons from "../assets/icons";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import SvgBackArrow from "../icons/BackArrow";
import { apiService } from "../services/apiService";
import axios from "axios";
import LoadingScreen from "../components/loading-screen/LoginSkelton";

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
  loading,
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
        {loading && <div className="spinner"></div>}
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
  const [userExist, setUserExist] = useState("");
  const [isCheckingUser, setIsCheckingUser] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);


  useEffect(() => {
    // Validate login form for existing users
    if (userExist) {
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
  }, [isEmailValid, password, createPassword, confirmPassword, userExist]);

  const handleEmailButton = async () => {
    setLoading(true);
    if (!userExist) {
      await handleRegister();
    } else {
      await handleLogin();
    }
    setLoading(false);
  };
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const checkUserExists = async (email) => {
    try {
      const response = await apiService.checkUserExist(email);
      setUserExist(response);
    } catch (error) {
      console.error("Error checking if user exists:", error);
      setIsCheckingUser(false);
    }
  };

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
    setPassword("");
    setCreatePassword("");
    setConfirmPassword("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
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

  const handleEmailChange = async (e) => {
    const value = e.target.value;
    setEmail(value);
    const isValid = validateEmail(value);
    setIsEmailValid(isValid);
    setShowEmailWarning(!isValid && value.length > 4);

    if (isValid) {
      setIsCheckingUser(true);
      await checkUserExists(value);
      await delay(500);
      setIsCheckingUser(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setPageLoading(true);
    try {
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${credentialResponse.access_token}`,
          },
        })
        .then((res) => res.data);
      const response = await apiService.checkUserExist(userInfo.email);
      if (response) {
        const data = await apiService.loginWithGoogle(
          credentialResponse.access_token,
          userInfo.email
        );
        if (data.status === "success") {
          navigate("/home/all-requests");
        }
      } else {
        const data = await apiService.loginWithGoogle(
          credentialResponse.access_token,
          userInfo.email
        );
        if (data.status === "success") {
          navigate("/home/all-requests");
        }
      }
    } catch (e) {
      console.error("Login failed:", e);
    } finally {
      setPageLoading(true);
    }
  };

  const handleGoogleFailure = (error) => {
    console.log("Login Failed", error);
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleFailure,
  });

  const handleLogin = async () => {
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
  const renderPasswordFields = () => {
    if (isCheckingUser === "" || userExist === undefined) {
      return null;
    }
    if (!isCheckingUser) {
      return (
        <div>
          {userExist === false ? (
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
          ) : userExist === true ? (
            <InputField
              label="Password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
              toggleVisibility={togglePasswordVisibility}
              isPasswordVisible={passwordVisible}
            />
          ) : null}
        </div>
      );
    }
    return null;
  };

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
                  loading={isCheckingUser}
                />
                {renderPasswordFields()}
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
                  onClick={handleEmailButton}
                  className={`dynamic-button ${isFormValid ? "" : "disabled"} ${
                    loading ? "loading" : ""
                  }`}
                  type="submit"
                  disabled={
                    loading ||
                    !isFormValid ||
                    (!userExist && showConfirmPasswordWarning)
                  }
                >
                  {" "}
                  <span style={{ display: "flex", alignItems: "center" }}>
                    {!userExist ? "Register" : "Log In"}{" "}
                    {loading && (
                      <span
                        className="button-loader"
                      ></span>
                    )}
                  </span>
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

  const handleContactUs = () => {
    navigate("/contact-us");
  };

  return (
    <div className="login-page-container">
      {pageLoading ? (
        // Display loader while processing the login
        <LoadingScreen/> 
      ) : (
        <div className="login-content-wrapper">
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
          <div className="login-container">{renderForm()}</div>
        </div>
      )} 
      {pageLoading ? (
        <span onClick={handleContactUs} className="contact-us">
          </span>      ) : (
        <div className="below-text">
          <span onClick={handleContactUs} className="contact-us">
            Contact Us
          </span>
          {/* <span className="terms-conditions">Terms & Conditions</span> */}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
