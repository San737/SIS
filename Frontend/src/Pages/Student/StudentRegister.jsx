import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  fetchDepartments,
  fetchApprovedColleges,
} from "../../services/publicService";
import { registerStudent } from "../../services/studentService";

export default function StudentRegister() {
  const nav = useNavigate();
  const location = useLocation();

  const collegeFromLogin = location.state?.college || "";
  const [college, setCollege] = useState(collegeFromLogin);
  const [collegeOptions, setCollegeOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOptions();
  }, []);

  const loadOptions = async () => {
    const [depts, colleges] = await Promise.all([
      fetchDepartments(),
      fetchApprovedColleges(),
    ]);
    setDepartmentOptions(depts || []);
    setCollegeOptions(colleges || []);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !phone ||
      !address ||
      !department ||
      (!college && !collegeIdFromLogin)
    ) {
      return setError("Please fill in all fields.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      setLoading(true);
      setError("");

      await registerStudent({
        fullName: name,
        email,
        password,
        collegeId: parseInt(college || collegeFromLogin),
        deptId: parseInt(department),
        phone,
        address,
      });

      setSuccess(true);

      setTimeout(() => {
        nav("/student/Studentlogin");
      }, 3500);
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1920')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 bg-white/90 p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <h1 className="text-2xl font-extrabold text-center mb-6">
          📝 Student Registration
        </h1>

        {success ? (
          <div className="text-center">
            <p className="text-green-600 font-medium mb-2">
              Registration successful!
            </p>
            <p className="text-sm text-gray-700">
              Your request has been sent to the college admin. You can log in
              once it is approved.
            </p>
          </div>
        ) : (
          <form onSubmit={handleRegister}>
            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mb-3"
            />
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mb-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mb-3"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mb-3"
            />
            <input
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mb-3"
            />
            <textarea
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mb-3"
            />

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mb-3"
            >
              <option value="">Select Department</option>
              {departmentOptions.map((d) => (
                <option key={d.deptId} value={d.deptId}>
                  {d.deptName}
                </option>
              ))}
            </select>

            {!collegeFromLogin && (
              <select
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 mb-4"
              >
                <option value="">Select College</option>
                {collegeOptions.map((c) => (
                  <option key={c.collegeId} value={c.collegeId}>
                    {c.collegeName}
                  </option>
                ))}
              </select>
            )}

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2.5 rounded-lg"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
