import { useEffect, useState, useCallback } from "react";
import CollegeAdminLayout from "../../components/CollegeAdminLayout";
import { fetchDepartments } from "../../services/publicService";
import {
  fetchPendingStudents,
  approveStudent,
  rejectStudent,
} from "../../services/collegeAdminService";

export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ---------------- Load Data ---------------- */
  useEffect(() => {
    loadStudentRequests();
  }, []);

  const loadStudentRequests = async () => {
    try {
      setLoading(true);
      setError(null);

      const studentsData = await fetchPendingStudents();
      const deptData = await fetchDepartments();

      setStudents(studentsData);
      setFilteredStudents(studentsData);
      setDepartments(Array.isArray(deptData) ? deptData : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load student requests");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Filter Logic ---------------- */
  const filterStudents = useCallback(() => {
    let filtered = [...students];

    if (selectedDepartment !== "all") {
      const dept = departments.find(
        (d) => d.deptId === Number(selectedDepartment)
      );

      if (dept) {
        filtered = filtered.filter(
          (s) => s.departmentName === dept.deptName
        );
      }
    }

    setFilteredStudents(filtered);
  }, [students, selectedDepartment, departments]);

  useEffect(() => {
    filterStudents();
  }, [filterStudents]);

  /* ---------------- Approve / Reject ---------------- */
  const handleAction = async (studentId, action) => {
    try {
      if (action === "approve") {
        await approveStudent(studentId);
      } else {
        await rejectStudent(studentId);
      }

      // Remove student from UI after success
      setStudents((prev) =>
        prev.filter((s) => s.studentId !== studentId)
      );
    } catch (err) {
      console.error(err);
      alert("Action failed. Please try again.");
    }
  };

  /* ---------------- Loading State ---------------- */
  if (loading) {
    return (
      <CollegeAdminLayout activePage="students">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              Loading student requests...
            </p>
          </div>
        </div>
      </CollegeAdminLayout>
    );
  }

  /* ---------------- Error State ---------------- */
  if (error) {
    return (
      <CollegeAdminLayout activePage="students">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <p className="text-red-600 font-semibold mb-3">{error}</p>
            <button
              onClick={loadStudentRequests}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Retry
            </button>
          </div>
        </div>
      </CollegeAdminLayout>
    );
  }

  /* ---------------- Main UI ---------------- */
  return (
    <CollegeAdminLayout activePage="students">
      {/* Top Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Student Management
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Approve or reject student registration requests
        </p>
      </div>

      <div className="p-8">
        {/* Filter */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Departments</option>
            {departments.map((dept) => (
              <option key={dept.deptId} value={dept.deptId}>
                {dept.deptName}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {filteredStudents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Student ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Department
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr
                      key={student.studentId}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium">
                        {student.studentId}
                      </td>
                      <td className="px-6 py-4">
                        {student.fullName}
                      </td>
                      <td className="px-6 py-4">
                        {student.email}
                      </td>
                      <td className="px-6 py-4">
                        {student.departmentName}
                      </td>
                      <td className="px-6 py-4 text-center space-x-2">
                        <button
                          onClick={() =>
                            handleAction(student.studentId, "approve")
                          }
                          className="px-4 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleAction(student.studentId, "reject")
                          }
                          className="px-4 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-gray-500">
              No pending student requests
            </div>
          )}
        </div>
      </div>
    </CollegeAdminLayout>
  );
}
