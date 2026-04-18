import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../App.css";

import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!data.email || !data.password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", data);

      if (remember) {
        localStorage.setItem("token", res.data.token);
      } else {
        sessionStorage.setItem("token", res.data.token);
      }

      toast.success("Login successful 🚀");
      navigate("/dashboard");
    } catch {
      toast.error("Invalid credentials ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2>📁 DriveNest</h2>
        <p className="subtitle">Sign in to continue</p>

        {/* Email */}
        <div className="floating-group">
          <FaEnvelope />
          <input
            type="email"
            required
            placeholder=" "
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <label>Email Address</label>
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

        {/* Remember */}
        <div className="remember">
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          <span>Remember me</span>
        </div>

        <button onClick={handleLogin}>
          {loading ? "Logging..." : "Login"}
        </button>

        <p className="auth-link" onClick={() => navigate("/signup")}>
          Don’t have an account? Signup
        </p>

      </div>
    </div>
  );
}