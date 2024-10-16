const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const CLIENT_ID = "5"; //TODO : change it

export const ENDPOINTS = {
  LOGIN: `${API_BASE_URL}auth/login`,
  REGISTER: `${API_BASE_URL}auth/register`,
  UPLOAD_DOCUMENT: `${API_BASE_URL}clients/load-document`,
  GET_OPEN_CHANGEREQUEST: `${API_BASE_URL}clients/${CLIENT_ID}/bytes/open`,
  GET_CLOSED_CHANGEREQUEST: `${API_BASE_URL}clients/${CLIENT_ID}/bytes/closed`,
  DELETE_CHANGE_REQUEST: `${API_BASE_URL}clients/${CLIENT_ID}/bytes/delete`,
  CREATE_CHANGE_REQUEST: `${API_BASE_URL}clients/${CLIENT_ID}/bytes/create`,
  GET_USER_TEAMSPACE: `${API_BASE_URL}clients/clientDetails?clientId=${CLIENT_ID}`,
  CREATE_TEAMSPACE: `${API_BASE_URL}clients/${CLIENT_ID}/teamspaces`,
  CREATE_FOLDER: `${API_BASE_URL}clients/${CLIENT_ID}/folders`,
  CREATE_DOCUMENT: `${API_BASE_URL}clients/${CLIENT_ID}/documents`,
  GET_DOCUMENT: `${API_BASE_URL}clients/${CLIENT_ID}/documents`,
  CHECK_TEAMSPACE_EXIST: `${API_BASE_URL}clients/${CLIENT_ID}/teamspaces/unique`,
  CHECK_FOLDER_EXIST: (teamspaceId) =>
    `${API_BASE_URL}clients/${CLIENT_ID}/teamspaces/${teamspaceId}/folders/unique`,
  GET_TRASH: `${API_BASE_URL}clients/${CLIENT_ID}/bytes/trash`,
  GET_RECOMMENDATION_SINGLE_BYTE: (byteId) =>
    `${API_BASE_URL}clients/${CLIENT_ID}/bytes/${byteId}/recommendations`,
  GET_RECOMMENDATION_FOR_DOC: (docId) =>
    `${API_BASE_URL}clients/${CLIENT_ID}/documents/${docId}/recommendations`,
  // https://api-core.knowledgekeeper.ai/api/v1/clients/5/documents/42/recommendations
  RENAME_OR_DELETE_FOLDER: (folderId) =>
    `${API_BASE_URL}clients/${CLIENT_ID}/folders/${folderId}`,
  RENAME_OR_DELETE_TEAMSPACE: (teamspaceId) =>
    `${API_BASE_URL}clients/${CLIENT_ID}/teamspaces/${teamspaceId}`,
  CHECK_USER_EXIST: `${API_BASE_URL}clients/users/exists`,
  RENAME_OR_DELETE_DOCUMENT: (docId) =>
    `${API_BASE_URL}clients/${CLIENT_ID}/documents/${docId}`,
  RESOLVE_BYTE: (byteId) =>
    `${API_BASE_URL}clients/${CLIENT_ID}/bytes/${byteId}/resolve-or-closed`,
  FEEDBACK_BYTE: (byteId) =>
    `${API_BASE_URL}clients/${CLIENT_ID}/byte/${byteId}/feedback`,
  CHECK_BYTE_PENDING_RECOM: (byteId) =>
    `${API_BASE_URL}clients/${CLIENT_ID}/byte/${byteId}/is-pending`,
  CHECK_DOCUMENT_EXIST: (folderId) =>
    `${API_BASE_URL}clients/${CLIENT_ID}/folders/${folderId}/documents/unique`,
  INVITE_MEMBERS: (teamspaceId) =>
    `${API_BASE_URL}clients/${CLIENT_ID}/teamspaces/${teamspaceId}/invite`,
};
