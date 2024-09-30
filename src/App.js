import React from "react";
import "./style.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import { AuthProvider } from "./components/ProtectedRoute/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const isAuthenticated = () => {
    return !!sessionStorage.getItem("authToken");
  };

  return (
    <AuthProvider>
      <ToastContainer />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated() ? (
                <Navigate to="/home/all-requests" />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route path="/home/*" element={<HomePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
