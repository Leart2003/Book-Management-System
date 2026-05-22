import { useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"
import "./Login.css"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await API.post("/Auth/login", { email, password })
      localStorage.setItem("token", response.data.token)
      navigate("/books")
    } catch (err) {
      setError("Invalid email or password.")
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">📚 Book Management</h2>
        <p className="login-subtitle">Sign in to your account</p>

        {error && <p className="login-error">{error}</p>}

        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        <p
          style={{
            color: "#888",
            textAlign: "center",
            fontSize: "13px",
            margin: 0,
          }}
        >
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ color: "#6c63ff", cursor: "pointer", fontWeight: "bold" }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login
