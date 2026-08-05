import { useEffect, useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"
import { isAdmin } from "../services/Auth"

function Books() {
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    API.get("/Book").then((res) => setBooks(res.data))
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return
    await API.delete(`/Book/${id}`)
    setBooks(books.filter((b) => b.id !== id))
  }

  const filtered = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Search Bar */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px 40px",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "600px",
            display: "block",
            margin: "0 auto",
            padding: "12px 20px",
            borderRadius: "30px",
            border: "1px solid #ddd",
            fontSize: "14px",
            outline: "none",
            backgroundColor: "#f9f9f9",
          }}
        />
      </div>

      <div style={{ padding: "32px 40px" }}>
        <div className="row g-4">
          {filtered.map((book) => (
            <div className="col-6 col-md-3" key={book.id}>
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  border: "1px solid #e8e8e8",
                  overflow: "hidden",
                  transition: "box-shadow 0.2s",
                  cursor: "pointer",
                  height: "100%",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(0,0,0,0.1)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                {/* Image */}
                <div style={{ position: "relative" }}>
                  {book.imageUrl ? (
                    <img
                      src={`https://localhost:7012${book.imageUrl}`}
                      alt={book.title}
                      style={{
                        width: "100%",
                        height: "220px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "220px",
                        backgroundColor: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "48px",
                      }}
                    >
                      📖
                    </div>
                  )}
                  <span
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      backgroundColor: "#fff",
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      cursor: "pointer",
                    }}
                  >
                    ♡
                  </span>
                </div>

                {/* Info */}
                <div style={{ padding: "12px" }}>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#e63946",
                      fontWeight: "600",
                      margin: "0 0 4px",
                    }}
                  >
                    {book.author?.name?.toUpperCase()}
                  </p>
                  <h6
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      margin: "0 0 8px",
                      color: "#222",
                    }}
                  >
                    {book.title}
                  </h6>
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: "800",
                      color: "#222",
                      margin: "0 0 10px",
                    }}
                  >
                    {book.price} €
                  </p>

                  <button
                    onClick={() => navigate(`/books/${book.id}`)}
                    style={{
                      width: "100%",
                      backgroundColor: "#e63946",
                      border: "none",
                      borderRadius: "6px",
                      padding: "10px",
                      color: "#fff",
                      fontWeight: "600",
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    View Details
                  </button>

                  {isAdmin() && (
                    <div className="d-flex gap-2 mt-2">
                      <button
                        onClick={() => navigate(`/books/edit/${book.id}`)}
                        style={{
                          flex: 1,
                          backgroundColor: "#fff",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          padding: "6px",
                          color: "#444",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(book.id)}
                        style={{
                          flex: 1,
                          backgroundColor: "#fff",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          padding: "6px",
                          color: "#e63946",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Books
