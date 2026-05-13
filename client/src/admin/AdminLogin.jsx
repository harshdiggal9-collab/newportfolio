import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../api/authApi";

function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginAdmin(form);
      localStorage.setItem("adminToken", data.token);
      navigate("/admin");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <main className="page">
      <h1>Admin Login</h1>
      <form className="glass contact-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
        />
        <button className="btn btn-glow" type="submit">
          Login
        </button>
        {error && <p>{error}</p>}
      </form>
    </main>
  );
}

export default AdminLogin;
