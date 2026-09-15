import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"
import { isAdmin } from "../services/Auth"
import "./Books.css"

function Books() {
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const response = await API.get("/Book")
        setBooks(response.data)
      } catch (requestError) {
        setError("We could not load the catalog. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    loadBooks()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return
    try {
      await API.delete(`/Book/${id}`)
      setBooks((currentBooks) => currentBooks.filter((book) => book.id !== id))
    } catch (requestError) {
      setError("The book could not be deleted. Please try again.")
    }
  }

  const visibleBooks = books.filter((book) => {
    const searchText = search.toLowerCase().trim()
    return [book.title, book.author?.name, book.category?.name]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(searchText))
  })

  return (
    <main className="catalog-page">
      <section className="catalog-heading">
        <div>
          <p className="eyebrow">The collection</p>
          <h1>Find your next great read</h1>
          <p className="catalog-intro">Browse thoughtful stories, trusted references, and new favourites.</p>
        </div>
        <button
          onClick={() => navigate("/books/add")}
          className="add-book-button"
        >
          Add book
        </button>
      </section>

      <label className="catalog-search">
        <span>Search the catalog</span>
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Title, author, or category"
        />
      </label>

      {error && <p className="catalog-message error-message">{error}</p>}
      {loading && <p className="catalog-message">Loading the catalog...</p>}
      {!loading && !error && visibleBooks.length === 0 && (
        <p className="catalog-message">No books match that search.</p>
      )}

      <div className="book-grid">
        {visibleBooks.map((book) => (
          <article className="book-card" key={book.id}>
              {book.imageUrl && (
                <img
                  src={`https://localhost:7012${book.imageUrl}`}
                  className="book-cover"
                  alt={book.title}
                />
              )}
              <div className="book-card-body">
                <p className="book-category">{book.category?.name || "Featured title"}</p>
                <h2>{book.title}</h2>
                <p className="book-author">{book.author?.name || "Unknown author"}</p>
                <p className="book-description">{book.description}</p>
              </div>
              <div className="book-card-actions">
                <button
                  className="view-button"
                  onClick={() => navigate(`/books/${book.id}`)}
                >
                  View details
                </button>
                {isAdmin() && (
                  <>
                    <button
                      className="text-button"
                      onClick={() => navigate(`/books/edit/${book.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-button danger-button"
                      onClick={() => handleDelete(book.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
          </article>
        ))}
      </div>
    </main>
  )
}

export default Books
