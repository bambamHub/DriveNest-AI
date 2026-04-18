import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../App.css";

import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!data.name || !data.email || !data.password) {
      return toast.error("Fill all fields");
    }

    try {
      setLoading(true);

      await API.post("/auth/signup", data);

      toast.success("Account created 🎉");
      navigate("/");
    } catch {
      toast.error("Signup failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2>📁 DriveNest</h2>
        <p className="subtitle">Create your account</p>

        {/* Name */}
        <div className="floating-group">
          <FaUser />
          <input
            required
            placeholder=" "
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <label>Full Name</label>
        </div>

        {/* Email */}
        <div className="floating-group">
          <FaEnvelope />
          <input
            type="email"
            required
            placeholder=" "
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <label>Email</label>
        </div>

        {/* Password */}
        <div className="floating-group">
          <FaLock />
          <input
            type={showPassword ? "text" : "password"}
            required
            placeholder=" "
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <label>Password</label>

          <span className="eye" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button onClick={handleSignup}>
          {loading ? "Creating..." : "Signup"}
        </button>

        <p className="auth-link" onClick={() => navigate("/")}>
          Already have account? Login
        </p>

      </div>
    </div>
  );
}