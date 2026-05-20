import { useEffect, useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"

function Books() {
  const [books, setBooks] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    API.get("/Book").then((res) => setBooks(res.data))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div className="container-fluid bg-dark text-white p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📚 Book Management</h2>
        <button className="btn btn-outline-light" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="row">
        {books.map((book) => (
          <div className="col-md-4 mb-4" key={book.id}>
            <div className="card bg-secondary text-white h-100">
              {book.imageUrl && (
                <img
                  src={`https://localhost:7012${book.imageUrl}`}
                  className="card-img-top"
                  alt={book.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text text-light">{book.description}</p>
                <p className="card-text">
                  <small>Author: {book.author?.name}</small>
                </p>
                <p className="card-text">
                  <small>Category: {book.category?.name}</small>
                </p>
              </div>
              <div className="card-footer d-flex gap-2">
                <button
                  className="btn btn-sm btn-primary w-100"
                  onClick={() => navigate(`/books/${book.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Books
