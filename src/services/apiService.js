import axios from "axios";
import { ENDPOINTS } from "./endPoint";
import { MESSAGES } from "./message";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
const API_KEY = process.env.REACT_APP_API_KEY;
const userId = sessionStorage.getItem("clientId");
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
const getFormHeaders = (isProtected = false) => {
  const headers = {
    "Content-Type": "multipart/form-data",
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

      const { token, status, userId } = response.data;

      if (status === "success") {
        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("clientId", userId);
        console.log(MESSAGES.AUTH.LOGIN_SUCCESS);
        return response.data;
      } else {
        // Handle failed status
        console.error(MESSAGES.AUTH.LOGIN_FAILURE);
        toast.error(response.data.errorCode || "Unknown error.");
        return response.data;
      }
    } catch (error) {
      console.error(MESSAGES.AUTH.LOGIN_FAILURE);
      console.error("Error Response:", error.response?.data);
      toast.error(error.response?.data || MESSAGES.ERRORS.SOMETHING_WENT_WRONG);
    }
  }

  //LOGIN/REGISTER WITH GOOGLE
  async loginWithGoogle(authOToken, email) {
    try {
      const response = await axios.post(
        ENDPOINTS.LOGIN,
        { email: email, oAuthProvider: "GOOGLE", oAuthToken: authOToken },
        { headers: getHeaders() }
      );
      const { token, status, userId } = response.data;
      if (status === "success") {
        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("clientId", userId);
        const user = jwtDecode(token);
        sessionStorage.setItem("email", user.email);
        return response.data;
      } else {
        // If login is failed, it means it is a new user, and hence do a sign up
        await this.SignUpWithGoogle(authOToken, email);
        // toast.error(response.message || "Unknown error.");
        return response.data;
      }
    } catch (error) {
      console.error(MESSAGES.AUTH.LOGIN_FAILURE);
      toast.error(
        error.response?.data.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
      );
      throw error.response || MESSAGES.ERRORS.SOMETHING_WENT_WRONG;
    }
  }

  //SIGN UP WITH EMAIL
  async SignUpWithGoogle(authOToken, email) {
    try {
      const response = await axios.post(
        ENDPOINTS.REGISTER,
        { email: email, oAuthProvider: "GOOGLE", oAuthToken: authOToken },
        { headers: getHeaders() }
      );
      const { token, status, userId } = response.data;
      if (status === "success") {
        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("clientId", userId);
        const user = jwtDecode(token);
        sessionStorage.setItem("email", user.email);
        return response.data;
      } else {
        console.error(MESSAGES.AUTH.LOGIN_FAILURE);
        toast.error(response.message || "Unknown error.");
        return response.data;
      }
    } catch (error) {
      console.error(MESSAGES.AUTH.LOGIN_FAILURE);
      toast.error(
        error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
      );
      throw error.response || MESSAGES.ERRORS.SOMETHING_WENT_WRONG;
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
      const { token, status, userId } = response.data;

      if (status === "success") {
        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("clientId", userId);
        return response.data;
      } else {
        // Handle failed status
        console.error(MESSAGES.AUTH.LOGIN_FAILURE);
        toast.error(response.data.errorCode || "Unknown error.");
        return response.data;
      }
    } catch (error) {
      console.error("Error Response:", error);
      toast.error(
        error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
      );
      throw error.response?.data || MESSAGES.ERRORS.SOMETHING_WENT_WRONG;
    }
  }

  //CHECK USER EXIST
  async checkUserExist(email) {
    try {
      const requestBody = { email };
      console.log(email);
      const response = await axios.post(
        ENDPOINTS.CHECK_USER_EXIST,
        requestBody,
        {
          headers: getHeaders(),
        }
      );
      console.log(response.data.exists);
      return response.data.exists;
    } catch (error) {
      console.error("Error Response:", error);
      toast.error(
        error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
      );
      throw error.response?.data || MESSAGES.ERRORS.SOMETHING_WENT_WRONG;
    }
  }

  //Upload Document
  async uploadDocument(file, docId, clientId) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("clientId", clientId);
      formData.append("documentId", docId);
      const response = await axios.post(ENDPOINTS.UPLOAD_DOCUMENT, formData, {
        headers: getFormHeaders(true),
      });

      if (response.data.status) {
        return response.data;
      } else {
        throw new Error("Failed to upload document");
      }
    } catch (error) {
      console.error(
        "Error uploading document:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
      );
      throw error;
    }
  }

  //GET DOCUMENT
  async getDocument(docId) {
    try {
      const response = await axios.get(`${ENDPOINTS.GET_DOCUMENT}/${docId}`, {
        headers: getHeaders(true),
      });
      if (response.status === 200) {
        console.log("Document fetched successfully", response.data);
        return response.data;
      } else {
        throw new Error("Failed to fetch document");
      }
    } catch (error) {
      console.error(
        "Error fetching document:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
      );
      throw error;
    }
  }

  //RESOLVE BYTE
  async resolveByte(byteId) {
    try {
      const requestBody = {
        resolutionDetails:
          "The issue was resolved by updating the signal strength.",
      };
      const url = `${ENDPOINTS.RESOLVE_BYTE(byteId)}`;
      const response = await axios.post(url, requestBody, {
        headers: getHeaders(true),
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        return response.data;
      }
    } catch (error) {
      toast.error(
        error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
      );
    }
  }

  //Get Trash Bytes
  async GetTrashBytes(byteId) {
    try {
      const url = `${ENDPOINTS.GET_TRASH}`;
      const response = await axios.get(url, {
        headers: getHeaders(true),
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        return response.data;
      }
    } catch (error) {
      toast.error(
        error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
      );
    }
  }

  //Create Document
  async createDocument(documentName, folderId) {
    try {
      const emptyHtmlContent =
        "<!DOCTYPE html>\n<html>\n<head>\n<title>Empty Document</title>\n</head>\n<body>\n</body>\n</html>";
      const blob = new Blob([emptyHtmlContent], { type: "text/html" });
      const file = new File([blob], "document.html", { type: "text/html" });
      const formData = new FormData();
      formData.append("file", file, "document.html");
      formData.append("folderId", folderId);
      formData.append("documentName", documentName);
      const response = await axios.post(ENDPOINTS.CREATE_DOCUMENT, formData, {
        headers: getHeaders(true),
      });

      if (response.data.status) {
        console.log("Document uploaded successfully", response.data);
        return response.data;
      } else {
        throw new Error("Failed to upload document");
      }
    } catch (error) {
      console.error(
        "Error uploading document:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
      );
      // throw error;
    }
  }

  //Get Change Request (Open)
  async getOpenChangeRequest() {
    try {
      const response = await axios.get(ENDPOINTS.GET_OPEN_CHANGEREQUEST, {
        headers: getHeaders(true),
      });
      return response.data.data;
    } catch (error) {
      console.error("Error Response:", error);
      console.error("Error Status:", error.response?.status);
      toast.error(
        error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
      );
      throw error.response || MESSAGES.ERRORS.SOMETHING_WENT_WRONG;
    }
  }

  //TODO CHECK ERROR MESSAGE KEY FOR ALL API response.data.message
  //GET CHANGE REQUEST (CLOSED)

  async getClosedRequest() {
    try {
      const response = await axios.get(ENDPOINTS.GET_CLOSED_CHANGEREQUEST, {
        headers: getHeaders(true),
      });
      console.log("Response:", response.data);
      return response.data.data;
    } catch (error) {
      console.error("Error Response:", error);
      toast.error(
        error.response?.data.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
      );
      throw (
        error.response?.data.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
      );
    }
  }

  //CREATE CHANGE REQUEST
  async createChangeRequest(recommendation) {
    try {
      const requestBody = { userId, recommendation };
      console.log("Request Body:", requestBody);
      const response = await axios.post(
        ENDPOINTS.CREATE_CHANGE_REQUEST,
        requestBody,
        {
          headers: getHeaders(true),
        }
      );
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error Response:", error);
      toast.error(
        error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
      );
      throw error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG;
    }
  }

  //DELETE CHANGE REQUEST
  async deleteChangeRequest(byteId) {
    try {
      const requestBody = { byteId };
      console.log("Request Body:", requestBody);
      const response = await axios.post(
        ENDPOINTS.DELETE_CHANGE_REQUEST,
        requestBody,
        {
          headers: getHeaders(true),
        }
      );

      if (response.data.status === "success") {
        toast.success(
          response?.data.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
        );
      } else {
        toast.error(
          response?.data.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
        );
      }
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error Response:", error);
      toast.error(
        error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
      );
      throw error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG;
    }
  }

  //GET USER TEAMSPACE
  async getUserTeamSpace() {
    try {
      const response = await axios.get(ENDPOINTS.GET_USER_TEAMSPACE, {
        headers: getHeaders(true),
      });
      console.log("Response:", response.data);
      return response.data.client.teamspaces;
    } catch (error) {
      console.error("Error Response:", error);
      toast.error(
        error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
      );
      throw error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG;
    }
  }

  //GET RECOMMENDATION FOR SINGLE DOCUMENT
  async getRecommendationSingleDoc(docId) {
    try {
      const response = await axios.get(
        ENDPOINTS.GET_RECOMMENDATION_FOR_DOC(docId),
        {
          headers: getHeaders(true),
        }
      );
      console.log("Response: for fetch single doc", response);
      return response.data;
    } catch (error) {
      console.error("Error Response:", error);
      toast.error(
        error.response?.data.message || MESSAGES.ERRORS.UNABLE_TO_LOAD
      );
      return error.response?.data.message || MESSAGES.ERRORS.UNABLE_TO_LOAD;
    }
  }

  //ADD FEEDBACK FOR BYTE
  async addByteFeedback(byteId) {
    try {
      const requestBody = { feedback: "AI is wrong" };
      const response = await axios.post(
        ENDPOINTS.FEEDBACK_BYTE(byteId),
        requestBody,
        {
          headers: getHeaders(true),
        }
      );
      return response.data.isUnique;
    } catch (error) {
      toast.error(
        error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
      );
      throw error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG;
    }
  }

  //CHECK PENDING RECOMMENDATION FOR BYTE
  async pendingRecommendation(byteId) {
    try {
      const response = await axios.get(
        ENDPOINTS.CHECK_BYTE_PENDING_RECOM(byteId),
        {
          headers: getHeaders(true),
        }
      );
      return response.data.pending;
    } catch (error) {
      toast.error(
        error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
      );
      throw error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG;
    }
  }

  //GET RECOMMENDATION FOR SINGLE BYTE
  async getRecommendationForByte(byteId) {
    try {
      const response = await axios.get(
        ENDPOINTS.GET_RECOMMENDATION_SINGLE_BYTE(byteId),
        {
          headers: getHeaders(true),
        }
      );
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error Response:", error);
      toast.error(
        error.response?.data.message || MESSAGES.ERRORS.UNABLE_TO_LOAD
      );
      return error.response?.data.message || MESSAGES.ERRORS.UNABLE_TO_LOAD;
    }
  }
  //CREATE Teamspace
  async createTeamspace(teamspaceName) {
    try {
      const requestBody = { teamspaceName };
      const response = await axios.post(ENDPOINTS.CREATE_TEAMSPACE, requestBody, {
        headers: getHeaders(true),
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error(
        error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
      );
      throw error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG;
    }
  }

  //CREATE TEAMSPACE
  async createFolder(folderName, teamspaceId) {
    try {
      const requestBody = { folderName, teamspaceId };
      const response = await axios.post(
        ENDPOINTS.CREATE_FOLDER,
        requestBody,
        {
          headers: getHeaders(true),
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error(
        error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
      );
      throw error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG;
    }
  }
  //CHECK TEAMSPACE EXIST
  async isTeamspaceExist(teamspaceName) {
    try {
      const requestBody = { teamspaceName };
      const response = await axios.post(
        ENDPOINTS.CHECK_TEAMSPACE_EXIST,
        requestBody,
        {
          headers: getHeaders(true),
        }
      );
      return response.data.isUnique;
    } catch (error) {
      toast.error(
        error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
      );
      throw error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG;
    }
  }

  //CHECK FOLDER EXIST
  async isFolderExist(folderName, teamspaceId) {
    try {
      const requestBody = { folderName };
      const response = await axios.post(
        ENDPOINTS.CHECK_FOLDER_EXIST(teamspaceId),
        requestBody,
        {
          headers: getHeaders(true),
        }
      );
      console.log(response);
      return response.data.isUnique;
    } catch (error) {
      toast.error(
        error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
      );
      throw error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG;
    }
  }
 //INVITE TEAMMEMBERS
 async inviteMembers(email, teamspaceId) {
  try {

    const requestBody = {userId, email };
    const response = await axios.post(
      ENDPOINTS.INVITE_MEMBERS(teamspaceId),
      requestBody,
      {
        headers: getHeaders(true),
      }
    );
    console.log(response);
    toast.success(response.data.message);
    return response.data.isUnique;
  } catch (error) {
    toast.error(
      error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
    );
    throw error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG;
  }
}
  //CHECK DOCUMENT EXIST
  async isDocumentExist(documentName, folderId) {
    try {
      const requestBody = { documentName };
      const response = await axios.post(
        ENDPOINTS.CHECK_DOCUMENT_EXIST(folderId),
        requestBody,
        {
          headers: getHeaders(true),
        }
      );
      console.log(response);
      return response.data.isUnique;
    } catch (error) {
      toast.error(
        error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
      );
      throw error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG;
    }
  }

  //RENAME TEAMSPACE
  async renameTeamspace(teamspaceName, teamspaceId) {
    try {
      const requestBody = { teamspaceName };
      const response = await axios.put(
        ENDPOINTS.RENAME_OR_DELETE_TEAMSPACE(teamspaceId),
        requestBody,
        {
          headers: getHeaders(true),
        }
      );
      return response.data;
    } catch (error) {
      toast.error(
        error.response?.error || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
      );
      throw error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG;
    }
  }

  //Delete Teamspace
  async deleteTeamspace(teamspaceId) {
    try {
      const response = await axios.delete(
        ENDPOINTS.RENAME_OR_DELETE_TEAMSPACE(teamspaceId),
        {
          headers: getHeaders(true),
        }
      );
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(
        error.response?.error || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
      );
      throw error.response?.data.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG;
    }
  }

  //RENAME FOLDER
  async renameFolder(folderName, folderId) {
    try {
      const requestBody = { folderName };
      const response = await axios.put(
        ENDPOINTS.RENAME_OR_DELETE_FOLDER(folderId),
        requestBody,
        {
          headers: getHeaders(true),
        }
      );
      return response.data;
    } catch (error) {
      toast.error(
        error.response?.error || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
      );
      throw error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG;
    }
  }

  //Delete FOLDER
  async deleteFolder(folderId) {
    try {
      const response = await axios.delete(
        ENDPOINTS.RENAME_OR_DELETE_FOLDER(folderId),
        {
          headers: getHeaders(true),
        }
      );
      return response.data;
    } catch (error) {
      toast.error(
        error.response?.error || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
      );
      throw error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG;
    }
  }

  //Delete Document
  async deleteDocument(docId) {
    try {
      const response = await axios.delete(
        ENDPOINTS.RENAME_OR_DELETE_DOCUMENT(docId),
        {
          headers: getHeaders(true),
        }
      );
      return response.data;
    } catch (error) {
      toast.error(
        error.response?.error || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
      );
      throw error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG;
    }
  }
  //RENAME DOCUMENT
  async renameDocument(documentName, docId) {
    try {
      const requestBody = { documentName };
      const response = await axios.put(
        ENDPOINTS.RENAME_OR_DELETE_DOCUMENT(docId),
        requestBody,
        {
          headers: getHeaders(true),
        }
      );
      return response.data;
    } catch (error) {
      toast.error(
        error.response?.error || MESSAGES.ERRORS.SOMETHING_WENT_WRONG
      );
      throw error.response?.message || MESSAGES.ERRORS.SOMETHING_WENT_WRONG;
    }
  }

  //LOG OUT
  logout() {
    sessionStorage.removeItem("authToken");
  }
}

export const apiService = new ApiService();
