// EmailForm.js
import React from 'react';

const EmailForm = ({
  email,
  setEmail,
  password,
  setPassword,
  createPassword,
  setCreatePassword,
  confirmPassword,
  setConfirmPassword,
  isEmailValid,
  showEmailWarning,
  showPasswordLengthWarning,
  showConfirmPasswordWarning,
  handleCreatePasswordChange,
  handleConfirmPasswordChange,
  handlePasswordChange,
  togglePasswordVisibility,
  toggleCreatePasswordVisibility,
  toggleConfirmPasswordVisibility,
  newUser,
  handleSubmit,
}) => (
  <div className="email-login-form">
    <h2>Continue with Email</h2>
    <form onSubmit={handleSubmit}>
      <label>
        Email Id
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      {showEmailWarning && <span>*Please enter a valid email address.</span>}
      {isEmailValid && (
        <div>
          {newUser ? (
            <>
              <label>
                Create Password
                <input
                  type="password"
                  value={createPassword}
                  onChange={handleCreatePasswordChange}
                />
                <button onClick={toggleCreatePasswordVisibility}>Toggle</button>
              </label>
              <label>
                Re-enter Password
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <button onClick={toggleConfirmPasswordVisibility}>Toggle</button>
              </label>
            </>
          ) : (
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <button onClick={togglePasswordVisibility}>Toggle</button>
            </label>
          )}
        </div>
      )}
      {showConfirmPasswordWarning && <span>*Passwords do not match.</span>}
      {showPasswordLengthWarning && <span>*Password must be at least 6 characters long.</span>}
      <button type="submit">Log In</button>
    </form>
  </div>
);

export default EmailForm;
