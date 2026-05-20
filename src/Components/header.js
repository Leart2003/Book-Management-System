import { useNavigate } from "react-router-dom"

function Header() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <nav
      style={{
        backgroundColor: "#1a1a1a",
        borderBottom: "1px solid #2a2a2a",
        padding: "14px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <div
        onClick={() => navigate("/books")}
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span style={{ fontSize: "24px" }}>📚</span>
        <span style={{ color: "#fff", fontWeight: "700", fontSize: "18px" }}>
          Book <span style={{ color: "#6c63ff" }}>Management</span>
        </span>
      </div>

      {/* Nav Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <span
          onClick={() => navigate("/books")}
          style={{ color: "#aaa", cursor: "pointer", fontSize: "14px" }}
        >
          Books
        </span>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#6c63ff",
            border: "none",
            borderRadius: "8px",
            padding: "8px 18px",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Logout
        </button>
        <button
          className="btn btn-sm"
          style={{
            backgroundColor: "#6c63ff",
            border: "none",
            color: "#fff",
            borderRadius: "8px",
            padding: "8px 16px",
          }}
          onClick={() => navigate("/books/add")}
        >
          ➕ Add Book
        </button>
      </div>
    </nav>
  )
}

export default Header
