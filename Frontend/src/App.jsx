import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Page components
import Home from "./Pages/Home.jsx";

import StudentRegister from "./Pages/Student/StudentRegister.jsx";
import StudentLogin from "./Pages/Student/StudentLogin.jsx";
import StudentDashboard from "./Pages/Student/StudentDashboard";
import StudentProfile from "./Pages/Student/StudentProfile";
import BrowseCourses from "./Pages/Student/BrowseCourses";
import StudentEnrollments from "./Pages/Student/StudentEnrollments";

//College Admin imports
import CollegeAdminLogin from "./Pages/CollegeAdmin/CollegeAdminLogin.jsx";
import CollegeAdminDashboard from "./Pages/CollegeAdmin/CollegeAdminDashboard.jsx";
import CollegeAdminRequest from "./Pages/CollegeAdmin/CollegeAdminRequest.jsx";
import ManageCourses from "./Pages/CollegeAdmin/ManageCourses.jsx";
import AddCourse from "./Pages/CollegeAdmin/AddCourse.jsx";
import ViewEnrollments from "./Pages/CollegeAdmin/ViewEnrollments.jsx";
import SeatManagementPage from "./Pages/CollegeAdmin/SeatManagement.jsx";
import StudentManagement from "./Pages/CollegeAdmin/StudentManagement.jsx";


// Super Admin imports
import SuperAdminDashboard from "./Pages/SuperAdmin/SuperAdminDashboard.jsx";
import ManageColleges from "./Pages/SuperAdmin/ManageColleges.jsx";
import SuperAdminLogin from "./Pages/SuperAdmin/SuperAdminLogin.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      {/* App routes */}
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Super Admin Routes */}
        <Route path="/superadmin/login" element={<SuperAdminLogin />} />
        <Route
          path="/superadmin/dashboard"
          element={
            <ProtectedRoute
              roles={["SUPERADMIN"]}
              element={<SuperAdminDashboard />}
            />
          }
        />
        <Route
          path="/superadmin/colleges"
          element={
            <ProtectedRoute
              roles={["SUPERADMIN"]}
              element={<ManageColleges />}
            />
          }
        />

        {/* Student pages */}
        <Route path="/student/Studentlogin" element={<StudentLogin />} />
        <Route path="/student/register" element={<StudentRegister />} />
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute
              roles={["STUDENT"]}
              element={<StudentDashboard />}
            />
          }
        />
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute
              roles={["STUDENT"]}
              element={<StudentProfile />}
            />
          }
        />
        <Route
          path="/student/courses"
          element={
            <ProtectedRoute
              roles={["STUDENT"]}
              element={<BrowseCourses />}
            />
          }
        />
        <Route
          path="/student/enrollments"
          element={
            <ProtectedRoute
              roles={["STUDENT"]}
              element={<StudentEnrollments />}
            />
          }
        />

        {/* College Admin pages */}
        <Route
          path="/Collegeadmin/CollegeAdminlogin"
          element={<CollegeAdminLogin />}
        />
        <Route
          path="/CollegeAdmin/CollegeAdminDashboard"
          element={
            <ProtectedRoute
              roles={["ADMIN"]}
              element={<CollegeAdminDashboard />}
            />
          }
        />
        <Route
          path="/CollegeAdmin/CollegeAdminRequest"
          element={<CollegeAdminRequest />}
        />
        <Route
          path="/CollegeAdmin/ManageCourses"
          element={
            <ProtectedRoute roles={["ADMIN"]} element={<ManageCourses />} />
          }
        />
        <Route
          path="/CollegeAdmin/AddCourse"
          element={
            <ProtectedRoute roles={["ADMIN"]} element={<AddCourse />} />
          }
        />
        <Route
          path="/CollegeAdmin/ViewEnrollments"
          element={
            <ProtectedRoute roles={["ADMIN"]} element={<ViewEnrollments />} />
          }
        />
        <Route
          path="/CollegeAdmin/SeatManagement"
          element={
            <ProtectedRoute
              roles={["ADMIN"]}
              element={<SeatManagementPage />}
            />
          }
        />
         <Route
          path="/CollegeAdmin/StudentManagement"
          element={
            <ProtectedRoute
              roles={["ADMIN"]}
              element={<StudentManagement />}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
