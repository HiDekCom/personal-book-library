import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!username.trim() || !password) {
      setError("กรุณากรอก Username และ Password");
      return;
    }

    try {
      setLoading(true);

      // auth.api.js รับ username และ password แยกกัน
      const data = await loginApi(
        username.trim(),
        password
      );

      console.log("Login response:", data);

      // Backend ควรส่งกลับ:
      // {
      //   token: "...",
      //   user: {...}
      // }

      if (!data?.token) {
        throw new Error("ไม่พบ Token จากระบบ");
      }

      if (!data?.user) {
        throw new Error("ไม่พบข้อมูล User จากระบบ");
      }

      // AuthContext ต้องการ object { token, user }
      login({
        token: data.token,
        user: data.user,
      });

      // ไปหน้า Books
      navigate("/books");
    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "เข้าสู่ระบบไม่สำเร็จ"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="login-card">

          {/* Logo */}
          <div className="login-logo">
            <div className="login-logo-icon">
              📚
            </div>

            <h1>
              Personal Book Library
            </h1>

            <p>
              Manage your personal book collection
            </p>
          </div>

          {/* Form */}
          <form
            className="login-form"
            onSubmit={handleSubmit}
          >
            {/* Username */}
            <div className="form-group">
              <label htmlFor="username">
                Username
              </label>

              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                placeholder="Enter your username"
                autoComplete="username"
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={loading}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <div className="login-footer">
            <span>
              Personal Book Library
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;