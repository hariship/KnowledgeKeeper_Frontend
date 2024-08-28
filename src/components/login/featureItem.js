import React from 'react';
import './login-style.css';

const FeatureItem = ({ icon, title, description }) => {
  return (
    <div className="feature-item">
      <img src={icon} alt="Feature icon"
      />
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default FeatureItem;
