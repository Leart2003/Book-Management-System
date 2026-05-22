import { useEffect, useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"

function Favorites() {
  const [favorites, setFavorites] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    API.get("/Favorite").then((res) => setFavorites(res.data))
  }, [])

  const handleRemove = async (bookId) => {
    await API.delete(`/Favorite?bookId=${bookId}`)
    setFavorites(favorites.filter((f) => f.book?.id !== bookId))
  }

  return (
    <div className="container-fluid bg-dark text-white p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>❤️ My Favorites</h4>
      </div>

      {favorites.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 0",
            color: "#555",
          }}
        >
          <p style={{ fontSize: "48px" }}>📭</p>
          <p style={{ fontSize: "16px" }}>
            No favorites yet. Go add some books!
          </p>
          <button
            onClick={() => navigate("/books")}
            style={{
              backgroundColor: "#6c63ff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Browse Books
          </button>
        </div>
      ) : (
        <div className="row">
          {favorites.map((f) => (
            <div className="col-md-4 mb-4" key={f.id}>
              <div
                className="card h-100"
                style={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #2a2a2a",
                  borderRadius: "12px",
                }}
              >
                {f.book?.imageUrl && (
                  <img
                    src={`https://localhost:7012${f.book.imageUrl}`}
                    className="card-img-top"
                    alt={f.book?.title}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "12px 12px 0 0",
                    }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title text-white">{f.book?.title}</h5>
                  <p
                    className="card-text"
                    style={{ color: "#aaa", fontSize: "13px" }}
                  >
                    {f.book?.description}
                  </p>
                  <p style={{ color: "#aaa", fontSize: "13px" }}>
                    ✍️ {f.book?.author?.name}
                  </p>
                </div>
                <div
                  className="card-footer d-flex gap-2"
                  style={{ backgroundColor: "#1a1a1a", border: "none" }}
                >
                  <button
                    className="btn btn-sm btn-primary w-100"
                    onClick={() => navigate(`/books/${f.book?.id}`)}
                  >
                    View Details
                  </button>
                  <button
                    className="btn btn-sm w-100"
                    style={{
                      backgroundColor: "#2a2a2a",
                      color: "#ff4d4d",
                      border: "none",
                    }}
                    onClick={() => handleRemove(f.book?.id)}
                  >
                    ❤️ Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
