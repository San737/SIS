import apiClient from "./apiClient";

/** REGISTER COLLEGE ADMIN */
export const registerCollegeAdmin = async (registrationData) => {
  const response = await apiClient.post(
    "/api/v1/college/register",
    registrationData
  );
  return response.data;
};

/** GET DASHBOARD DATA */
export const fetchDashboard = async () => {
  const response = await apiClient.get("/api/v1/college/dashboard");
  return response.data;
};

/** GET ALL COURSES FOR THIS COLLEGE */
export const fetchCourses = async () => {
  const response = await apiClient.get("/api/v1/college/courses");
  return response.data;
};

/** ADD COURSE */
export const addCourse = async (courseData) => {
  const response = await apiClient.post(
    "/api/v1/college/addCourse",
    courseData
  );
  return response.data;
};

/** DELETE COURSE */
export const deleteCourse = async (courseId) => {
  const response = await apiClient.delete(
    `/api/v1/college/deleteCourse/${courseId}`
  );
  return response.data;
};

/* ========================= */
/* 🔹 STUDENT MANAGEMENT 🔹 */
/* ========================= */

/** GET PENDING STUDENTS */
export const fetchPendingStudents = async () => {
  const response = await apiClient.get(
    "/api/v1/college/students/pending"
  );
  return response.data;
};

/** APPROVE STUDENT */
export const approveStudent = async (studentId) => {
  const response = await apiClient.put(
    `/api/v1/college/approve-student/${studentId}`
  );
  return response.data;
};

/** REJECT STUDENT */
export const rejectStudent = async (studentId) => {
  const response = await apiClient.put(
    `/api/v1/college/reject-student/${studentId}`
  );
  return response.data;
};

export default {
  registerCollegeAdmin,
  fetchDashboard,
  fetchCourses,
  addCourse,
  deleteCourse,
  fetchPendingStudents,
  approveStudent,
  rejectStudent,
};
