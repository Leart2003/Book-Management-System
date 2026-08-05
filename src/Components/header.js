import { useNavigate } from "react-router-dom"
import { isAdmin } from "../services/Auth"

function Header() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <nav
      style={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #e0e0e0",
        padding: "0 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "64px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      {/* Logo */}
      <div onClick={() => navigate("/books")} style={{ cursor: "pointer" }}>
        <span style={{ fontWeight: "800", fontSize: "20px", color: "#222" }}>
          LIBRARIA <span style={{ color: "#e63946" }}>BOOKSTORE</span>
        </span>
      </div>

      {/* Nav Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        <span
          onClick={() => navigate("/books")}
          style={{
            cursor: "pointer",
            fontSize: "14px",
            color: "#444",
            fontWeight: "500",
          }}
        >
          Books
        </span>
        <span
          onClick={() => navigate("/favorites")}
          style={{
            cursor: "pointer",
            fontSize: "14px",
            color: "#444",
            fontWeight: "500",
          }}
        >
          Favorites
        </span>
        <span
          onClick={() => navigate("/orders")}
          style={{
            cursor: "pointer",
            fontSize: "14px",
            color: "#444",
            fontWeight: "500",
          }}
        >
          Orders
        </span>
        {isAdmin() && (
          <span
            onClick={() => navigate("/books/add")}
            style={{
              cursor: "pointer",
              fontSize: "14px",
              color: "#e63946",
              fontWeight: "600",
            }}
          >
            + Add Book
          </span>
        )}
      </div>

      {/* Account */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <span
          onClick={() => navigate("/favorites")}
          style={{ cursor: "pointer", fontSize: "20px" }}
        >
          ♡
        </span>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#e63946",
            border: "none",
            borderRadius: "6px",
            padding: "8px 18px",
            color: "#fff",
            fontWeight: "600",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Header
