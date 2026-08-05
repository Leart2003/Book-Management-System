import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import API from "../services/api"

function EditBook() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    publishedYear: "",
    authorId: "",
    categoryId: "",
  })
  const [image, setImage] = useState(null)

  useEffect(() => {
    API.get(`/Book/${id}`).then((res) => {
      const book = res.data
      setForm({
        id: book.id,
        title: book.title,
        description: book.description,
        price: book.price,
        publishedYear: book.publishedYear,
        authorId: book.authorId,
        categoryId: book.categoryId,
      })
    })
    API.get("/Category").then((res) => setCategories(res.data))
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (
      !form.title ||
      !form.authorId ||
      !form.categoryId ||
      !form.price ||
      !form.publishedYear
    ) {
      setError("Please fill in all required fields.")
      return
    }

    try {
      const formData = new FormData()
      formData.append("id", parseInt(id))
      formData.append("title", form.title)
      formData.append("description", form.description)
      formData.append("price", parseFloat(form.price))
      formData.append("publishedYear", parseInt(form.publishedYear))
      formData.append("authorId", parseInt(form.authorId))
      formData.append("categoryId", parseInt(form.categoryId))
      if (image) formData.append("imageFile", image)

      await API.put(`/Book/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setSuccess("Book updated successfully!")
      setTimeout(() => navigate("/books"), 1500)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    }
  }

  return (
    <div
      style={{ backgroundColor: "#0f0f0f", color: "#fff", padding: "40px 0" }}
    >
      <div className="container" style={{ maxWidth: "600px" }}>
        <h3 style={{ fontWeight: "700", marginBottom: "8px" }}>✏️ Edit Book</h3>
        <p style={{ color: "#666", marginBottom: "32px" }}>
          Update the book details below.
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

        {/* Price and Year */}
        <div className="d-flex gap-3" style={{ marginBottom: "20px" }}>
          <div style={{ flex: 1 }}>
            <label
              style={{
                fontSize: "13px",
                color: "#aaa",
                marginBottom: "8px",
                display: "block",
              }}
            >
              PRICE *
            </label>
            <input
              name="price"
              type="number"
              value={form.price}
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
            />
          </div>
          <div style={{ flex: 1 }}>
            <label
              style={{
                fontSize: "13px",
                color: "#aaa",
                marginBottom: "8px",
                display: "block",
              }}
            >
              PUBLISHED YEAR *
            </label>
            <input
              name="publishedYear"
              type="number"
              value={form.publishedYear}
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
            />
          </div>
        </div>

        {/* Author ID */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              fontSize: "13px",
              color: "#aaa",
              marginBottom: "8px",
              display: "block",
            }}
          >
            AUTHOR ID *
          </label>
          <input
            name="authorId"
            type="number"
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
          />
        </div>

        {/* Category */}
        <div style={{ marginBottom: "32px" }}>
          <label
            style={{
              fontSize: "13px",
              color: "#aaa",
              marginBottom: "8px",
              display: "block",
            }}
          >
            COVER IMAGE (leave empty to keep current)
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
            Save Changes
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

export default EditBook
