import React, { useEffect } from "react";
import "../style.css";


const HubspotForm = () => {
  useEffect(() => {
    const loadHubspotForm = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: "eu1",
          portalId: "145450957",
          formId: "8d4e63db-ef5b-4936-9e97-7296aaf95ce4",
          target: "#hubspotForm",
        });
      }
    };

    const addHubspotScript = () => {
      const script = document.createElement("script");
      script.src = "//js-eu1.hsforms.net/forms/embed/v2.js";
      script.charset = "utf-8";
      script.async = true;
      script.onload = () => {
        loadHubspotForm();
      };
      document.body.appendChild(script);
    };

    if (!document.querySelector('script[src="//js-eu1.hsforms.net/forms/embed/v2.js"]')) {
      addHubspotScript();
    } else {
      loadHubspotForm();
    }
  }, []);

  return (
    <div className="hubspot-form-container">
      <h2 className="hubspot-form-title">Contact Us</h2>
      <div id="hubspotForm" className="hubspot-form"></div>
    </div>
  );
};

export default HubspotForm;
