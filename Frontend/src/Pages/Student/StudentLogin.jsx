import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { fetchApprovedColleges } from "../../services/publicService";

export default function StudentLogin() {
  const nav = useNavigate();
  const location = useLocation();
  const { login, logout } = useAuth();

  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingColleges, setLoadingColleges] = useState(true);

  useEffect(() => {
    loadColleges();
  }, []);

  const loadColleges = async () => {
    try {
      setLoadingColleges(true);
      const data = await fetchApprovedColleges();
      setColleges(data || []);
    } catch (error) {
      setError("Failed to load colleges. Please refresh.");
    } finally {
      setLoadingColleges(false);
    }
  };

  const handleCollegeSelect = (e) => {
    const collegeId = e.target.value;
    setSelectedCollege(collegeId);

    if (collegeId === "NotListed") {
      setError("❌ College not registered. Please contact your admin.");
    } else {
      setError("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!selectedCollege)
      return setError("Please select your college first.");
    if (selectedCollege === "NotListed")
      return setError("College not registered.");
    if (!email || !password)
      return setError("Please fill all fields.");

    setIsSubmitting(true);
    setError("");

    try {
      const user = await login({ email, password });

      if (!user.roles.includes("STUDENT")) {
        setError("This account is not registered as a student.");
        logout();
        return;
      }

      const target = location.state?.from?.pathname || "/student/dashboard";
      nav(target, { replace: true });
    } catch (err) {
      if (
        err?.response?.status === 401 ||
        err?.response?.status === 403
      ) {
        setError(
          "⏳ Your account is pending college admin approval."
        );
      } else {
        setError("Invalid email or password.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1920')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center mb-8">
          🎓 Student Login
        </h1>

        <label className="block font-medium mb-2">
          Select Your College
        </label>
        <select
          value={selectedCollege}
          onChange={handleCollegeSelect}
          disabled={loadingColleges}
          className="w-full border rounded-lg px-4 py-3 mb-4"
        >
          <option value="">
            {loadingColleges
              ? "Loading colleges..."
              : "-- Choose College --"}
          </option>
          {colleges.map((college) => (
            <option
              key={college.collegeId}
              value={college.collegeId}
            >
              {college.collegeName}
            </option>
          ))}
          <option value="NotListed">
            My College is not listed
          </option>
        </select>

        {error && (
          <p className="text-red-500 text-sm mb-4">
            {error}
          </p>
        )}

        {!error && selectedCollege && (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 mb-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 mb-6"
            />

            <button
              onClick={handleLogin}
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 disabled:opacity-60"
            >
              {isSubmitting ? "Signing in..." : "Login"}
            </button>

            <p className="text-sm text-center mt-5">
              Not registered yet?{" "}
              <span
                onClick={() =>
                  nav("/student/register", {
                    state: { college: selectedCollege },
                  })
                }
                className="text-indigo-600 font-semibold cursor-pointer"
              >
                Register here
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
