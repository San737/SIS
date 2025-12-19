import { useEffect, useState, useCallback } from "react";
import CollegeAdminLayout from "../../components/CollegeAdminLayout";
import { fetchDepartments } from "../../services/publicService";

export default function SeatManagementPage() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSeatData();
  }, []);

  const loadSeatData = async () => {
    try {
      setLoading(true);
      setError(null);

      // 🔴 Replace with backend API later
      const seatData = [
        {
          courseId: "CSE101",
          courseName: "Data Structures",
          departmentName: "Computer Science",
          totalSeats: 60,
          filledSeats: 45,
        },
        {
          courseId: "CSE102",
          courseName: "Operating Systems",
          departmentName: "Computer Science",
          totalSeats: 50,
          filledSeats: 50,
        },
        {
          courseId: "ECE201",
          courseName: "Digital Electronics",
          departmentName: "Electronics",
          totalSeats: 40,
          filledSeats: 28,
        },
      ];

      const deptData = await fetchDepartments();

      setCourses(seatData);
      setDepartments(Array.isArray(deptData) ? deptData : []);
      setFilteredCourses(seatData);
    } catch (err) {
      console.error(err);
      setError("Failed to load seat details");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Filter Logic ---------------- */
  const filterCourses = useCallback(() => {
    let filtered = [...courses];

    if (selectedDepartment !== "all") {
      const dept = departments.find(
        (d) => d.deptId === Number(selectedDepartment)
      );
      if (dept) {
        filtered = filtered.filter(
          (c) => c.departmentName === dept.deptName
        );
      }
    }

    setFilteredCourses(filtered);
  }, [courses, selectedDepartment, departments]);

  useEffect(() => {
    filterCourses();
  }, [filterCourses]);

  /* ---------------- Helpers ---------------- */
  const availableSeats = (c) => c.totalSeats - c.filledSeats;
  const isFull = (c) => availableSeats(c) === 0;

  /* ---------------- Loading ---------------- */
  if (loading) {
    return (
      <CollegeAdminLayout activePage="seats">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading seat details...</p>
          </div>
        </div>
      </CollegeAdminLayout>
    );
  }

  /* ---------------- Error ---------------- */
  if (error) {
    return (
      <CollegeAdminLayout activePage="seats">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <p className="text-red-600 font-semibold mb-3">{error}</p>
            <button
              onClick={loadSeatData}
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
    <CollegeAdminLayout activePage="seats">
      {/* Top Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Seat Management
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          View seat availability department-wise
        </p>
      </div>

      <div className="p-8">
        {/* Filter Section (same style as ManageCourses) */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
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
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {filteredCourses.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Course ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Course Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Department
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">
                      Total Seats
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">
                      Filled
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">
                      Available
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCourses.map((course) => (
                    <tr
                      key={course.courseId}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-medium">
                        {course.courseId}
                      </td>
                      <td className="px-6 py-4">
                        {course.courseName}
                      </td>
                      <td className="px-6 py-4">
                        {course.departmentName}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {course.totalSeats}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {course.filledSeats}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {availableSeats(course)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            isFull(course)
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {isFull(course) ? "Full" : "Open"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-gray-500">
              No courses found for selected department
            </div>
          )}
        </div>
      </div>
    </CollegeAdminLayout>
  );
}
