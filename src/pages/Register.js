import { useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"
import "./Login.css"

function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRegister = async () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill in all fields.")
      return
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    try {
      await API.post("/Auth/register", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      })
      setSuccess("Account created! Redirecting to login...")
      setTimeout(() => navigate("/login"), 1500)
    } catch (err) {
      setError("Registration failed. Please try again.")
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">📚 Create Account</h2>
        <p className="login-subtitle">Join Book Management today</p>

        {error && <p className="login-error">{error}</p>}
        {success && (
          <p
            style={{ color: "#4caf50", textAlign: "center", fontSize: "13px" }}
          >
            {success}
          </p>
        )}

        <input
          className="login-input"
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
        />
        <input
          className="login-input"
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
        />
        <input
          className="login-input"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="login-input"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <input
          className="login-input"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <button className="login-button" onClick={handleRegister}>
          Register
        </button>

        <p
          style={{
            color: "#888",
            textAlign: "center",
            fontSize: "13px",
            margin: 0,
          }}
        >
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#6c63ff", cursor: "pointer", fontWeight: "bold" }}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  )
}

export default Register
