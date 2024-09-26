import React, { useState, useEffect } from "react";
import Sidebar from "../components/SideBar/SideBar";
import { Route, Routes, useLocation } from "react-router-dom";
import "../style.css";
import AllRequests from "./allRequest";
import TrashPage from "./TrashPage";
import IntegrationPage from "./IntegrationPage";
import FunctionalEditor from "../components/froalaEdito/CustomFroalaEditor";
import { useAuth } from "../components/ProtectedRoute/AuthContext";
import { useNavigate } from "react-router-dom";
import HubspotForm from "./ContactUs";

const HomePage = () => {
  const { setIsLoggedIn } = useAuth();
  const [activeItem, setActiveItem] = useState("All Requests");
  const [isTeamspaceOpen, setIsTeamspaceOpen] = useState(false);
  const location = useLocation();
const navigate=useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      console.log(token);
      setIsLoggedIn(true); // Set login state on mount
    } else {
      console.log("here in else");
      navigate("/")
    }
    const path = location.pathname;
    if (path.includes("all-requests")) {
      setActiveItem("All Requests");
    } else if (path.includes("trash")) {
      setActiveItem("Trash");
    } else if (path.includes("integration")) {
      setActiveItem("Integration");
    } else if (path.includes("document-edit")) {
      setIsTeamspaceOpen(true)
      const id = path.split("/").pop(); 
      setActiveItem(id); 
    } else if (path.includes("contact-us")) {
      setActiveItem("Contact Us");
    } else {
      setActiveItem("");
    }
  }, [location]);

  return (
    <div className="home">
      <Sidebar activeItem={activeItem} isTeamspaceOpen={isTeamspaceOpen} setIsTeamspaceOpen={setIsTeamspaceOpen}/>
      <div className="content">
        <Routes>
          <Route path="all-requests" element={<AllRequests />} />
          <Route path="trash" element={<TrashPage />} />
          <Route path="integration" element={<IntegrationPage />} />
          <Route path="document-edit/:id" element={<FunctionalEditor />} />
          <Route path="contact-us" element={<HubspotForm />} />


        </Routes>
      </div>
    </div>
  );
};

export default HomePage;
