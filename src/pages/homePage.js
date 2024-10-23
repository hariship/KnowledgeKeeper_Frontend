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
import { apiService } from "../services/apiService";
import DeletePopUp from "../components/PopUps/DeletePopUp";

const HomePage = () => {
  const { setIsLoggedIn } = useAuth();
  const [isLogoutPopupVisible, setisLogoutPopVisible] = useState(false);
  const [activeItem, setActiveItem] = useState("All Requests");
  const [isTeamspaceOpen, setIsTeamspaceOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
   //TODO : REMOVE
    const token = sessionStorage.getItem("authToken");
    // if (token) {
      console.log(token);
    //   setIsLoggedIn(true);
    // } else {
    //   console.log("here in else");
    //   navigate("/");
    // }
    if (apiService.isTokenExpired()) {
      setisLogoutPopVisible(true);
      apiService.logout();
      setIsLoggedIn(false);
      // navigate("/");
    }
    const path = location.pathname;
    if (path.includes("all-requests")) {
      setActiveItem("All Requests");
    } else if (path.includes("trash")) {
      setActiveItem("Trash");
    } else if (path.includes("integration")) {
      setActiveItem("Integration");
    } else if (path.includes("document-edit") || path.includes("document")) {
      setIsTeamspaceOpen(true);
      const id = path.split("/").pop();
      setActiveItem(id);
    } else if (path.includes("feedback")) {
      setActiveItem("Feedback");
    } else {
      setActiveItem("");
    }
  }, [location, setIsLoggedIn, navigate]);

  return (
    <div className="home">
      <Sidebar
        activeItem={activeItem}
        isTeamspaceOpen={isTeamspaceOpen}
        setIsTeamspaceOpen={setIsTeamspaceOpen}
      />
      <div className="content">
        <Routes>
          <Route path="all-requests" element={<AllRequests />} />
          <Route path="trash" element={<TrashPage />} />
          <Route path="integration" element={<IntegrationPage />} />
          <Route
            path=":byteId/document-edit/:id/"
            element={<FunctionalEditor activeItem={activeItem} />}
          />
          <Route
            path="document/:id"
            element={<FunctionalEditor activeItem={activeItem} />}
          />
        </Routes>
        <DeletePopUp
          isVisible={isLogoutPopupVisible}
          title="Session expired"
          buttonText="Login again"
          subtitle="session expired! You have to relogin."
          desc=""
          onClick={() => {
            navigate("/");
          }}
          onClose={() => {}}
        />
      </div>
    </div>
  );
};

export default HomePage;
