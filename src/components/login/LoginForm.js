import React from 'react';

const LoginForm = ({ loginButtonItems }) => (
  <div>
    <h2>Log In</h2>
    {loginButtonItems.map((item, index) => (
      <button key={index} onClick={item.onClick}>
        {item.text}
      </button>
    ))}
  </div>
);

export default LoginForm;
