const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const ENDPOINTS = {
  LOGIN: `${API_BASE_URL}auth/login`,
  REGISTER: `${API_BASE_URL}auth/register`,
  UPLOAD_DOCUMENT:`${API_BASE_URL}clients/load-document`
};
