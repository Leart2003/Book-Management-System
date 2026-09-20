import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

const initialForm = {
  title: "",
  description: "",
  price: "",
  publishedYear: "",
  authorId: "",
  categoryId: "",
}

function AddBook() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState(initialForm)
  const [image, setImage] = useState(null)
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    API.get("/Category")
      .then((response) => setCategories(response.data))
      .catch(() => setError("Categories could not be loaded. Please try again."))
  }, [])

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const validateForm = () => {
    if (!form.title.trim() || !form.authorId || !form.categoryId) {
      return "Title, author, and category are required."
    }

    if (!form.price || Number(form.price) <= 0) {
      return "Please enter a valid price."
    }

    if (!form.publishedYear || Number(form.publishedYear) < 1000) {
      return "Please enter a valid published year."
    }

    return ""
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setError("")
    setSaving(true)

    try {
      const formData = new FormData()
      formData.append("title", form.title.trim())
      formData.append("description", form.description.trim())
      formData.append("price", Number(form.price))
      formData.append("publishedYear", Number(form.publishedYear))
      formData.append("authorId", Number(form.authorId))
      formData.append("categoryId", Number(form.categoryId))
      if (image) formData.append("imageFile", image)

      await API.post("/Book", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      navigate("/books")
    } catch (requestError) {
      setError("The book could not be saved. Please check the details and try again.")
      setSaving(false)
    }
  }

  return (
    <main className="catalog-page">
      <section className="catalog-heading">
        <div>
          <p className="eyebrow">Admin tools</p>
          <h1>Add a new book</h1>
          <p className="catalog-intro">
            Create a catalog entry with pricing, category, and cover details.
          </p>
        </div>
      </section>

      <form className="book-form" onSubmit={handleSubmit}>
        {error && <p className="catalog-message error-message">{error}</p>}

        <label>
          <span>Title *</span>
          <input name="title" value={form.title} onChange={handleChange} />
        </label>

        <label>
          <span>Description</span>
          <textarea
            name="description"
            rows={5}
            value={form.description}
            onChange={handleChange}
          />
        </label>

        <div className="book-form-row">
          <label>
            <span>Price *</span>
            <input
              min="0"
              name="price"
              step="0.01"
              type="number"
              value={form.price}
              onChange={handleChange}
            />
          </label>
          <label>
            <span>Published year *</span>
            <input
              min="1000"
              name="publishedYear"
              type="number"
              value={form.publishedYear}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="book-form-row">
          <label>
            <span>Author ID *</span>
            <input
              min="1"
              name="authorId"
              type="number"
              value={form.authorId}
              onChange={handleChange}
            />
          </label>
          <label>
            <span>Category *</span>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
            >
              <option value="">Choose category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label>
          <span>Cover image</span>
          <input
            accept="image/*"
            type="file"
            onChange={(event) => setImage(event.target.files[0] || null)}
          />
        </label>

        <div className="book-form-actions">
          <button className="view-button" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save book"}
          </button>
          <button
            className="text-button"
            type="button"
            onClick={() => navigate("/books")}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  )
}

export default AddBook
