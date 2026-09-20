import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import API from "../services/api"
import "./BookDetails.css"

function BookDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [rating, setRating] = useState(0)
  const [averageRating, setAverageRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [actionMessage, setActionMessage] = useState("")

  useEffect(() => {
    const loadBookDetails = async () => {
      setLoading(true)
      setError("")

      try {
        const [bookResponse, commentsResponse, ratingResponse] =
          await Promise.all([
            API.get(`/Book/${id}`),
            API.get(`/Comment/${id}`),
            API.get(`/Rating/${id}`),
          ])

        setBook(bookResponse.data)
        setComments(commentsResponse.data)
        setAverageRating(ratingResponse.data.averageRating || 0)
      } catch (requestError) {
        setError("Book details could not be loaded. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    loadBookDetails()
  }, [id])

  const refreshComments = async () => {
    const response = await API.get(`/Comment/${id}`)
    setComments(response.data)
  }

  const refreshRating = async () => {
    const response = await API.get(`/Rating/${id}`)
    setAverageRating(response.data.averageRating || 0)
  }

  const handleComment = async () => {
    if (!newComment.trim()) return

    try {
      await API.post(`/Comment/${id}`, JSON.stringify(newComment.trim()), {
        headers: { "Content-Type": "application/json" },
      })
      setNewComment("")
      await refreshComments()
    } catch (requestError) {
      setActionMessage("Your comment could not be posted. Please try again.")
    }
  }

  const handleRating = async (stars) => {
    setRating(stars)

    try {
      await API.post(`/Rating/${id}`, stars, {
        headers: { "Content-Type": "application/json" },
      })
      await refreshRating()
    } catch (requestError) {
      setActionMessage("Your rating could not be saved. Please try again.")
    }
  }

  const handleFavorite = async () => {
    try {
      await API.post(`/Favorite?bookId=${id}`)
      setActionMessage("Added to favorites.")
    } catch (requestError) {
      setActionMessage("This book could not be added to favorites.")
    }
  }

  const handleOrder = () => {
    navigate("/payment", {
      state: {
        bookId: id,
        bookTitle: book.title,
        bookPrice: book.price,
      },
    })
  }

  if (loading) {
    return (
      <div className="book-details-loading">
        <div className="spinner-border text-purple" role="status" />
      </div>
    )
  }

  if (error || !book) {
    return (
      <main className="book-details-page">
        <div className="container py-5">
          <button className="book-details-back-btn" onClick={() => navigate("/books")}>
            Back to catalog
          </button>
          <p className="comment-empty mt-4">{error || "This book was not found."}</p>
        </div>
      </main>
    )
  }

  return (
    <main className="book-details-page">
      <nav className="book-details-navbar px-4 py-3 gap-3">
        <button className="book-details-back-btn" onClick={() => navigate("/books")}>
          Back
        </button>
        <button className="book-comment-btn" onClick={handleFavorite}>
          Add to favorites
        </button>
        <button className="book-comment-btn" onClick={handleOrder}>
          Order
        </button>
      </nav>

      <div className="container py-5">
        {actionMessage && <p className="comment-empty mb-4">{actionMessage}</p>}

        <div className="book-details-shell">
          <aside className="book-details-media">
            <div className="book-details-image">
              {book.imageUrl ? (
                <img src={`https://localhost:7012${book.imageUrl}`} alt={book.title} />
              ) : (
                <div className="book-placeholder">No cover</div>
              )}
            </div>
          </aside>

          <section className="book-details-card">
            <div className="book-details-header">
              <div>
                <p className="book-details-kicker">
                  {book.category?.name || "Featured title"}
                </p>
                <h1 className="book-details-title">{book.title}</h1>
              </div>
              <div className="book-details-score">
                <span>{Number(averageRating).toFixed(1)}</span>
                <small>/ 5</small>
              </div>
            </div>

            <div className="book-details-meta">
              <span className="book-details-pill">
                <strong>Author</strong> {book.author?.name || "Unknown"}
              </span>
              <span className="book-details-pill">
                <strong>Year</strong> {book.publishedYear || "Not listed"}
              </span>
              <span className="book-details-pill">
                <strong>Price</strong> ${Number(book.price || 0).toFixed(2)}
              </span>
            </div>

            <p className="book-details-description">
              {book.description || "No description is available for this book yet."}
            </p>

            <section className="book-details-section">
              <div className="book-section-heading">
                <h2>Rate this book</h2>
                <p>Choose from 1 to 5 stars.</p>
              </div>
              <div className="book-rating-row">
                <div className="book-rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      aria-label={`Rate ${star} stars`}
                      className={`book-rating-star ${
                        star <= (hovered || rating) ? "active" : ""
                      }`}
                      key={star}
                      onClick={() => handleRating(star)}
                      onMouseEnter={() => setHovered(star)}
                      onMouseLeave={() => setHovered(0)}
                      type="button"
                    >
                      *
                    </button>
                  ))}
                </div>
                <p className="book-rating-note">
                  Average rating: <strong>{Number(averageRating).toFixed(1)}</strong>
                </p>
              </div>
            </section>

            <section className="book-details-section">
              <div className="book-section-heading">
                <h2>Comments</h2>
                <p>{comments.length} total</p>
              </div>

              <div className="book-comments-list">
                {comments.length === 0 ? (
                  <p className="comment-empty">No comments yet. Be the first.</p>
                ) : (
                  comments.map((comment) => (
                    <article className="comment-item" key={comment.id}>
                      <p>{comment.content}</p>
                      {comment.createdAt && (
                        <small>{new Date(comment.createdAt).toLocaleDateString()}</small>
                      )}
                    </article>
                  ))
                )}
              </div>

              <div className="book-comment-input-row">
                <input
                  className="book-comment-input"
                  type="text"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(event) => setNewComment(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && handleComment()}
                />
                <button
                  className="book-comment-btn"
                  disabled={!newComment.trim()}
                  onClick={handleComment}
                  type="button"
                >
                  Post
                </button>
              </div>
            </section>
          </section>
        </div>
      </div>
    </main>
  )
}

export default BookDetails
