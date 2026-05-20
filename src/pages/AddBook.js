import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

function AddBook() {
  const navigate = useNavigate()
  const [authors, setAuthors] = useState([])
  const [categories, setCategories] = useState([])
  const [image, setImage] = useState(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [form, setForm] = useState({
    title: "",
    description: "",
    authorId: "",
    categoryId: "",
  })

  useEffect(() => {
    API.get("/Author").then((res) => setAuthors(res.data))
    API.get("/Category").then((res) => setCategories(res.data))
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.title || !form.authorId || !form.categoryId) {
      setError("Please fill in all required fields.")
      return
    }

    try {
      const formData = new FormData()
      formData.append("title", form.title)
      formData.append("description", form.description)
      formData.append("authorId", form.authorId)
      formData.append("categoryId", form.categoryId)
      if (image) formData.append("image", image)

      await API.post("/Book", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      setSuccess("Book added successfully!")
      setTimeout(() => navigate("/books"), 1500)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    }
  }

  return (
    <div
      style={{
        backgroundColor: "#0f0f0f",
        minHeight: "100vh",
        color: "#fff",
        padding: "40px 0",
      }}
    >
      <div className="container" style={{ maxWidth: "600px" }}>
        <h3 style={{ fontWeight: "700", marginBottom: "8px" }}>
          ➕ Add New Book
        </h3>
        <p style={{ color: "#666", marginBottom: "32px" }}>
          Fill in the details below to add a new book.
        </p>

        {error && (
          <div
            style={{
              backgroundColor: "#2a1a1a",
              border: "1px solid #ff4d4d",
              borderRadius: "8px",
              padding: "12px 16px",
              marginBottom: "16px",
              color: "#ff4d4d",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              backgroundColor: "#1a2a1a",
              border: "1px solid #4caf50",
              borderRadius: "8px",
              padding: "12px 16px",
              marginBottom: "16px",
              color: "#4caf50",
              fontSize: "14px",
            }}
          >
            {success}
          </div>
        )}

        {/* Title */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              fontSize: "13px",
              color: "#aaa",
              marginBottom: "8px",
              display: "block",
            }}
          >
            TITLE *
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter book title"
            style={{
              width: "100%",
              backgroundColor: "#1a1a1a",
              border: "1px solid #2a2a2a",
              borderRadius: "8px",
              padding: "12px 16px",
              color: "#fff",
              outline: "none",
              fontSize: "14px",
            }}
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              fontSize: "13px",
              color: "#aaa",
              marginBottom: "8px",
              display: "block",
            }}
          >
            DESCRIPTION
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter book description"
            rows={4}
            style={{
              width: "100%",
              backgroundColor: "#1a1a1a",
              border: "1px solid #2a2a2a",
              borderRadius: "8px",
              padding: "12px 16px",
              color: "#fff",
              outline: "none",
              fontSize: "14px",
              resize: "vertical",
            }}
          />
        </div>

        {/* Author */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              fontSize: "13px",
              color: "#aaa",
              marginBottom: "8px",
              display: "block",
            }}
          >
            AUTHOR *
          </label>
          <select
            name="authorId"
            value={form.authorId}
            onChange={handleChange}
            style={{
              width: "100%",
              backgroundColor: "#1a1a1a",
              border: "1px solid #2a2a2a",
              borderRadius: "8px",
              padding: "12px 16px",
              color: "#fff",
              outline: "none",
              fontSize: "14px",
            }}
          >
            <option value="">Select an author</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              fontSize: "13px",
              color: "#aaa",
              marginBottom: "8px",
              display: "block",
            }}
          >
            CATEGORY *
          </label>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            style={{
              width: "100%",
              backgroundColor: "#1a1a1a",
              border: "1px solid #2a2a2a",
              borderRadius: "8px",
              padding: "12px 16px",
              color: "#fff",
              outline: "none",
              fontSize: "14px",
            }}
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image */}
        <div style={{ marginBottom: "32px" }}>
          <label
            style={{
              fontSize: "13px",
              color: "#aaa",
              marginBottom: "8px",
              display: "block",
            }}
          >
            COVER IMAGE
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            style={{
              width: "100%",
              backgroundColor: "#1a1a1a",
              border: "1px solid #2a2a2a",
              borderRadius: "8px",
              padding: "12px 16px",
              color: "#aaa",
              fontSize: "14px",
            }}
          />
        </div>

        {/* Buttons */}
        <div className="d-flex gap-3">
          <button
            onClick={handleSubmit}
            style={{
              flex: 1,
              backgroundColor: "#6c63ff",
              border: "none",
              borderRadius: "8px",
              padding: "14px",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            Add Book
          </button>
          <button
            onClick={() => navigate("/books")}
            style={{
              flex: 1,
              backgroundColor: "#2a2a2a",
              border: "none",
              borderRadius: "8px",
              padding: "14px",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddBook
