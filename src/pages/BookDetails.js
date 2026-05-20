import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import API from "../services/api"

function BookDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [rating, setRating] = useState(0)
  const [averageRating, setAverageRating] = useState(0)
  const [hovered, setHovered] = useState(0)

  useEffect(() => {
    API.get(`/Book/${id}`).then((res) => setBook(res.data))
    API.get(`/Comment/${id}`).then((res) => setComments(res.data))
    API.get(`/Rating/${id}`).then((res) =>
      setAverageRating(res.data.averageRating),
    )
  }, [id])

  const handleComment = async () => {
    if (!newComment.trim()) return
    await API.post(`/Comment/${id}`, JSON.stringify(newComment), {
      headers: { "Content-Type": "application/json" },
    })
    setNewComment("")
    API.get(`/Comment/${id}`).then((res) => setComments(res.data))
  }

  const handleRating = async (stars) => {
    setRating(stars)
    await API.post(`/Rating/${id}`, stars, {
      headers: { "Content-Type": "application/json" },
    })
    API.get(`/Rating/${id}`).then((res) =>
      setAverageRating(res.data.averageRating),
    )
  }

  if (!book)
    return (
      <div
        style={{ backgroundColor: "#0f0f0f", minHeight: "100vh" }}
        className="d-flex justify-content-center align-items-center text-white"
      >
        <div className="spinner-border text-purple" role="status" />
      </div>
    )

  return (
    <div
      style={{ backgroundColor: "#0f0f0f", minHeight: "100vh", color: "#fff" }}
    >
      {/* Navbar */}
      <nav
        style={{
          backgroundColor: "#1a1a1a",
          borderBottom: "1px solid #2a2a2a",
        }}
        className="px-4 py-3 d-flex align-items-center gap-3"
      >
        <button
          className="btn btn-sm"
          style={{ backgroundColor: "#2a2a2a", color: "#fff", border: "none" }}
          onClick={() => navigate("/books")}
        >
          ← Back
        </button>
        <h5 className="mb-0">📚 Book Details</h5>
      </nav>

      <div className="container py-5">
        <div className="row g-5">
          {/* Book Image */}
          <div className="col-md-4">
            <div
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 0 40px rgba(108,99,255,0.2)",
              }}
            >
              {book.imageUrl ? (
                <img
                  src={`https://localhost:7012${book.imageUrl}`}
                  alt={book.title}
                  style={{ width: "100%", height: "450px", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "450px",
                    backgroundColor: "#1a1a1a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "80px",
                  }}
                >
                  📖
                </div>
              )}
            </div>
          </div>

          {/* Book Info */}
          <div className="col-md-8">
            <h1 style={{ fontWeight: "700", fontSize: "2rem" }}>
              {book.title}
            </h1>

            <div className="d-flex gap-3 mb-3">
              <span
                style={{
                  backgroundColor: "#2a2a2a",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "13px",
                }}
              >
                ✍️ {book.author?.name}
              </span>
              <span
                style={{
                  backgroundColor: "#2a2a2a",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "13px",
                }}
              >
                📂 {book.category?.name}
              </span>
            </div>

            <p style={{ color: "#aaa", lineHeight: "1.8", fontSize: "15px" }}>
              {book.description}
            </p>

            {/* Rating Section */}
            <div
              style={{
                backgroundColor: "#1a1a1a",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "24px",
              }}
            >
              <h6 style={{ color: "#aaa", marginBottom: "12px" }}>
                RATE THIS BOOK
              </h6>
              <div className="d-flex align-items-center gap-3">
                <div>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => handleRating(star)}
                      onMouseEnter={() => setHovered(star)}
                      onMouseLeave={() => setHovered(0)}
                      style={{
                        fontSize: "36px",
                        cursor: "pointer",
                        color: star <= (hovered || rating) ? "#ffc107" : "#333",
                        transition: "color 0.15s",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span style={{ color: "#aaa", fontSize: "14px" }}>
                  Average:{" "}
                  <strong style={{ color: "#ffc107" }}>
                    ⭐ {averageRating} / 5
                  </strong>
                </span>
              </div>
            </div>

            {/* Comments Section */}
            <div
              style={{
                backgroundColor: "#1a1a1a",
                borderRadius: "12px",
                padding: "20px",
              }}
            >
              <h6 style={{ color: "#aaa", marginBottom: "16px" }}>
                COMMENTS ({comments.length})
              </h6>

              <div
                style={{
                  maxHeight: "250px",
                  overflowY: "auto",
                  marginBottom: "16px",
                }}
              >
                {comments.length === 0 ? (
                  <p
                    style={{
                      color: "#555",
                      textAlign: "center",
                      padding: "20px 0",
                    }}
                  >
                    No comments yet. Be the first!
                  </p>
                ) : (
                  comments.map((c) => (
                    <div
                      key={c.id}
                      style={{
                        backgroundColor: "#252525",
                        borderRadius: "8px",
                        padding: "12px 16px",
                        marginBottom: "10px",
                      }}
                    >
                      <p style={{ margin: 0, fontSize: "14px" }}>{c.content}</p>
                      <small style={{ color: "#666" }}>
                        {new Date(c.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                  ))
                )}
              </div>

              <div className="d-flex gap-2">
                <input
                  type="text"
                  style={{
                    flex: 1,
                    backgroundColor: "#252525",
                    border: "1px solid #333",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    color: "#fff",
                    outline: "none",
                  }}
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleComment()}
                />
                <button
                  onClick={handleComment}
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
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetails
