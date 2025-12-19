import { useEffect, useState, useCallback } from "react";
import CollegeAdminLayout from "../../components/CollegeAdminLayout";
import { fetchDepartments } from "../../services/publicService";

export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStudentRequests();
  }, []);

  const loadStudentRequests = async () => {
    try {
      setLoading(true);
      setError(null);

      // 🔴 Replace with real API calls
      const response = {
        data: [
          {
            id: 1001,
            name: "Rahul Sharma",
            email: "rahul@gmail.com",
            department: "Computer Science",
            status: "PENDING",
          },
          {
            id: 1002,
            name: "Ananya Rao",
            email: "ananya@gmail.com",
            department: "Electronics",
            status: "PENDING",
          },
        ],
      };

      const deptData = await fetchDepartments();

      setStudents(response.data);
      setDepartments(Array.isArray(deptData) ? deptData : []);
      setFilteredStudents(response.data);
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
          (s) => s.department === dept.deptName
        );
      }
    }

    setFilteredStudents(filtered);
  }, [students, selectedDepartment, departments]);

  useEffect(() => {
    filterStudents();
  }, [filterStudents]);

  /* ---------------- Actions ---------------- */
  const handleAction = async (studentId, action) => {
    try {
      // 🔴 Replace with backend call
      // await axios.post(`/college-admin/students/${studentId}/${action}`);

      setStudents((prev) =>
        prev.filter((s) => s.id !== studentId)
      );
    } catch (err) {
      alert("Action failed. Please try again.");
    }
  };

  /* ---------------- Loading ---------------- */
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

  /* ---------------- Error ---------------- */
  if (error) {
    return (
      <CollegeAdminLayout activePage="students">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <svg
              className="w-16 h-16 text-red-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-800 font-semibold mb-2">
              {error}
            </p>
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
        {/* Filter Section */}
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
                      key={student.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium">
                        {student.id}
                      </td>
                      <td className="px-6 py-4">
                        {student.name}
                      </td>
                      <td className="px-6 py-4">
                        {student.email}
                      </td>
                      <td className="px-6 py-4">
                        {student.department}
                      </td>
                      <td className="px-6 py-4 text-center space-x-2">
                        <button
                          onClick={() =>
                            handleAction(student.id, "approve")
                          }
                          className="px-4 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleAction(student.id, "reject")
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
