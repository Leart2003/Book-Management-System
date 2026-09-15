import { useNavigate } from "react-router-dom"
import { isAdmin } from "../services/Auth"
import "./header.css"

function Header() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <button className="brand" onClick={() => navigate("/books")}>
          Libraria <span>Bookstore</span>
        </button>
        <div className="nav-links">
          <button onClick={() => navigate("/books")}>Books</button>
          <button onClick={() => navigate("/favorites")}>Favorites</button>
          <button onClick={() => navigate("/orders")}>Orders</button>
          {isAdmin() && (
            <button className="add-link" onClick={() => navigate("/books/add")}>
              Add book
            </button>
          )}
        </div>
        <div className="account-actions">
          <button
            className="favorite-link"
            aria-label="Open favorites"
            onClick={() => navigate("/favorites")}
          >
            &#9825;
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header
