import { NavLink, useNavigate } from "react-router-dom";
import { TOKEN_STORAGE_KEY } from "../config/constants";

export default function CollegeAdminLayout({
  children,
  activePage = "dashboard",
}) {
  const navigate = useNavigate();

  // 🔹 Extract user info from JWT token
  const getUserInfo = () => {
    try {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (!token) return { email: "admin@demo.com", name: "College Admin" };

      const parts = token.split(".");
      if (parts.length !== 3)
        return { email: "admin@demo.com", name: "College Admin" };

      const payload = JSON.parse(
        atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))
      );

      return {
        email: payload.sub || "admin@demo.com",
        name: payload.name || payload.sub?.split("@")[0] || "College Admin",
      };
    } catch (error) {
      return { email: "admin@demo.com", name: "College Admin" };
    }
  };

  const currentUser = getUserInfo();

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    navigate("/");
  };

  // 🔹 Sidebar navigation items
  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon:
        "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      link: "/CollegeAdmin/CollegeAdminDashboard",
    },
    {
      id: "courses",
      label: "Manage Courses",
      icon:
        "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      link: "/CollegeAdmin/ManageCourses",
    },
    {
      id: "enrollments",
      label: "View Enrollments",
      icon:
        "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
      link: "/CollegeAdmin/ViewEnrollments",
    },
    {
      id: "students",
      label: "Student Management",
      icon:  "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      link: "/CollegeAdmin/StudentManagement",
    },
    ,
    {
      id: "seats",
      label: "Seat Management",
      icon:
        "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      link: "/CollegeAdmin/SeatManagement",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-indigo-800 to-indigo-900 text-white flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-indigo-700">
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-lg p-2">
              <svg
                className="w-6 h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-lg">College Portal</h1>
              <p className="text-xs text-indigo-300">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.link}
              className={({ isActive }) => {
                const isCurrent = activePage
                  ? activePage === item.id
                  : isActive;
                const base =
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200";
                return isCurrent
                  ? `${base} bg-white text-indigo-600 shadow-lg`
                  : `${base} text-indigo-100 hover:bg-indigo-700`;
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={item.icon}
                />
              </svg>
              <span className="font-medium text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-indigo-700">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {currentUser.name}
              </p>
              <p className="text-xs text-indigo-300 truncate">
                {currentUser.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-indigo-700 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
