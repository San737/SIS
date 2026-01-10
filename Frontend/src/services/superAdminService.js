import apiClient from "./apiClient";
import { TOKEN_STORAGE_KEY } from "../config/constants";

/** Helper: Authorization header */
const getAuthHeader = () => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/** GET all REQUESTS */
export const fetchCollegeRequests = async () => {
  const response = await apiClient.get("/api/v1/superadmin/requests", {
    headers: getAuthHeader(),
  });
  return response.data;
};

/** APPROVE */
export const approveCollegeRequest = async (requestId) => {
  const response = await apiClient.put(
    `/api/v1/superadmin/requests/${requestId}/approve`,
    null,
    { headers: getAuthHeader() }
  );
  return response.data;
};

/** REJECT */
export const rejectCollegeRequest = async (requestId) => {
  const response = await apiClient.put(
    `/api/v1/superadmin/requests/${requestId}/reject`,
    null,
    { headers: getAuthHeader() }
  );
  return response.data;
};

/** DELETE APPROVED COLLEGE */
export const deleteCollege = async (collegeId) => {
  const response = await apiClient.delete(
    `/api/v1/superadmin/college/${collegeId}`
  );
  return response.data;
};

/**  GET ALL APPROVED COLLEGES (needed for delete mapping) */
export const fetchAllColleges = async () => {
  const response = await apiClient.get("/api/v1/superadmin/colleges", {
    headers: getAuthHeader(),
  });
  return response.data;
};

export default {
  fetchCollegeRequests,
  approveCollegeRequest,
  rejectCollegeRequest,
  deleteCollege,
  fetchAllColleges,
};
