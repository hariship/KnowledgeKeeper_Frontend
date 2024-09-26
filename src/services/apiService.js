import axios from "axios";
import { ENDPOINTS } from "./endPoint";
import { MESSAGES } from "./message";
import { toast } from 'react-toastify';

const API_KEY = process.env.REACT_APP_API_KEY;

const getHeaders = (isProtected = false) => {
  const headers = {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  };
  if (isProtected) {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  return headers;
};

class ApiService {
  //LOGIN WITH EMAIL
  async login(email, password) {
    try {
      const response = await axios.post(
        ENDPOINTS.LOGIN,
        { email, password },
        { headers: getHeaders() }
      );
  
      const { token, status } = response.data;
  
      if (status === 'success') {
        sessionStorage.setItem("authToken", token);
        console.log(MESSAGES.AUTH.LOGIN_SUCCESS);
        return response.data;
      } else {
        // Handle failed status
        console.error(MESSAGES.AUTH.LOGIN_FAILURE);
        toast.error( response.data.errorCode || "Unknown error.");
        return response.data;
      }
  
    } catch (error) {
      console.error(MESSAGES.AUTH.LOGIN_FAILURE);
      console.error("Error Response:", error.response?.data);
      throw error.response?.data || MESSAGES.ERRORS.SOMETHING_WENT_WRONG;
    }
  }
  

  //LOGIN/REGISTER WITH GOOGLE
  async loginWithGoogle(authOToken) {
    try {
      const response = await axios.post(
        ENDPOINTS.LOGIN,
        { oAuthProvider: "GOOGLE", oAuthToken: authOToken },
        { headers: getHeaders() }
      );

      const token = response.data.token;
      sessionStorage.setItem("authToken", token);
      console.log(MESSAGES.AUTH.LOGIN_SUCCESS);
      return response.data;
    } catch (error) {
      console.error(MESSAGES.AUTH.LOGIN_FAILURE);
      console.error("Error Response:", error.response?.data);
      throw error.response?.data || MESSAGES.ERRORS.SOMETHING_WENT_WRONG;
    }
  }

  //REGISTER WITH EMAIL
  async register(email, password) {
    try {
      const requestBody = { email, password };
      console.log("Request Body:", requestBody);

      const response = await axios.post(ENDPOINTS.REGISTER, requestBody, {
        headers: getHeaders(),
      });

      const token = response.data.token;
      sessionStorage.setItem("authToken", token);
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error Response:", error);
      console.error("Error Status:", error.response?.status);
      throw error.response?.data || MESSAGES.ERRORS.SOMETHING_WENT_WRONG;
    }
  }


  //Upload Document
   async uploadDocument(file, clientId, clientName) {
    try {
      const formData = new FormData();
      formData.append("file", file, "document.html");
      formData.append("clientId", clientId);
      formData.append("clientName", clientName);

      // for (let pair of formData.entries()) {
      //   console.log(`${pair[0]}:`, pair[1]);
      // }  
          const response = await axios.post(
        ENDPOINTS.UPLOAD_DOCUMENT,
        formData,
        { headers: getHeaders(true) } 
      );

      if (response.data.status) {
        console.log("Document uploaded successfully", response.data);
        return response.data;
      } else {
        throw new Error("Failed to upload document");
      }
    } catch (error) {
      console.error("Error uploading document:", error.response?.data || error.message);
      toast.error("Failed to upload document.");
      throw error;
    }
  }


  //LOG OUT
  logout() {
    sessionStorage.removeItem("authToken");
  }
}

export const apiService = new ApiService();
