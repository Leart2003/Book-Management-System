import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import API from "../services/api"

function Payment() {
  const navigate = useNavigate()
  const location = useLocation()
  const { bookId, bookTitle, bookPrice } = location.state || {}

  const [card, setCard] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    let value = e.target.value

    if (e.target.name === "number") {
      value = value.replace(/\D/g, "").slice(0, 16)
      value = value.replace(/(.{4})/g, "$1 ").trim()
    }

    if (e.target.name === "expiry") {
      value = value.replace(/\D/g, "").slice(0, 4)
      if (value.length >= 2) value = value.slice(0, 2) + "/" + value.slice(2)
    }

    if (e.target.name === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 3)
    }

    setCard({ ...card, [e.target.name]: value })
  }

  const handlePay = async () => {
    if (!card.name || !card.number || !card.expiry || !card.cvv) {
      setError("Please fill in all card details.")
      return
    }
    if (card.number.replace(/\s/g, "").length < 16) {
      setError("Please enter a valid card number.")
      return
    }
    if (card.cvv.length < 3) {
      setError("Please enter a valid CVV.")
      return
    }

    setError("")
    setLoading(true)

    try {
      await API.post("/Order", [parseInt(bookId)])
      setTimeout(() => {
        setLoading(false)
        setSuccess(true)
        setTimeout(() => navigate("/orders"), 2000)
      }, 2000)
    } catch (err) {
      setLoading(false)
      setError("Payment failed. Please try again.")
    }
  }

  if (success) {
    return (
      <div
        style={{
          backgroundColor: "#0f0f0f",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "72px", marginBottom: "16px" }}>✅</div>
          <h3 style={{ color: "#4caf50" }}>Payment Successful!</h3>
          <p style={{ color: "#aaa" }}>Redirecting to your orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{ backgroundColor: "#0f0f0f", color: "#fff", padding: "40px 0" }}
    >
      <div className="container" style={{ maxWidth: "500px" }}>
        <h3 style={{ fontWeight: "700", marginBottom: "4px" }}>💳 Checkout</h3>
        <p style={{ color: "#666", marginBottom: "32px" }}>
          Complete your purchase securely
        </p>

        {/* Order Summary */}
        <div
          style={{
            backgroundColor: "#1a1a1a",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "24px",
            border: "1px solid #2a2a2a",
          }}
        >
          <h6 style={{ color: "#aaa", marginBottom: "12px" }}>ORDER SUMMARY</h6>
          <div className="d-flex justify-content-between">
            <span style={{ fontSize: "14px" }}>📚 {bookTitle}</span>
            <span style={{ fontWeight: "bold", color: "#6c63ff" }}>
              ${bookPrice}
            </span>
          </div>
          <hr style={{ borderColor: "#2a2a2a", margin: "12px 0" }} />
          <div className="d-flex justify-content-between">
            <span style={{ color: "#aaa", fontSize: "13px" }}>Total</span>
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>
              ${bookPrice}
            </span>
          </div>
        </div>

        {/* Card Visual */}
        <div
          style={{
            background: "linear-gradient(135deg, #6c63ff, #3b37cc)",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "24px",
            boxShadow: "0 8px 32px rgba(108, 99, 255, 0.3)",
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <span style={{ fontSize: "13px", opacity: 0.8 }}>
              Book Management Bank
            </span>
            <span style={{ fontSize: "24px" }}>💳</span>
          </div>
          <p
            style={{
              fontSize: "18px",
              letterSpacing: "3px",
              marginBottom: "16px",
              fontFamily: "monospace",
            }}
          >
            {card.number || "•••• •••• •••• ••••"}
          </p>
          <div className="d-flex justify-content-between">
            <div>
              <p style={{ fontSize: "10px", opacity: 0.7, margin: 0 }}>
                CARD HOLDER
              </p>
              <p style={{ fontSize: "14px", margin: 0 }}>
                {card.name || "YOUR NAME"}
              </p>
            </div>
            <div>
              <p style={{ fontSize: "10px", opacity: 0.7, margin: 0 }}>
                EXPIRES
              </p>
              <p style={{ fontSize: "14px", margin: 0 }}>
                {card.expiry || "MM/YY"}
              </p>
            </div>
          </div>
        </div>

        {/* Card Form */}
        <div
          style={{
            backgroundColor: "#1a1a1a",
            borderRadius: "12px",
            padding: "24px",
            border: "1px solid #2a2a2a",
          }}
        >
          <h6 style={{ color: "#aaa", marginBottom: "20px" }}>CARD DETAILS</h6>

          {error && (
            <div
              style={{
                backgroundColor: "#2a1a1a",
                border: "1px solid #ff4d4d",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "16px",
                color: "#ff4d4d",
                fontSize: "13px",
              }}
            >
              {error}
            </div>
          )}

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                fontSize: "12px",
                color: "#aaa",
                marginBottom: "6px",
                display: "block",
              }}
            >
              CARDHOLDER NAME
            </label>
            <input
              name="name"
              value={card.name}
              onChange={handleChange}
              placeholder="John Doe"
              style={{
                width: "100%",
                backgroundColor: "#252525",
                border: "1px solid #333",
                borderRadius: "8px",
                padding: "12px",
                color: "#fff",
                outline: "none",
                fontSize: "14px",
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                fontSize: "12px",
                color: "#aaa",
                marginBottom: "6px",
                display: "block",
              }}
            >
              CARD NUMBER
            </label>
            <input
              name="number"
              value={card.number}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              style={{
                width: "100%",
                backgroundColor: "#252525",
                border: "1px solid #333",
                borderRadius: "8px",
                padding: "12px",
                color: "#fff",
                outline: "none",
                fontSize: "14px",
                fontFamily: "monospace",
                letterSpacing: "2px",
              }}
            />
          </div>

          <div className="d-flex gap-3" style={{ marginBottom: "24px" }}>
            <div style={{ flex: 1 }}>
              <label
                style={{
                  fontSize: "12px",
                  color: "#aaa",
                  marginBottom: "6px",
                  display: "block",
                }}
              >
                EXPIRY DATE
              </label>
              <input
                name="expiry"
                value={card.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                style={{
                  width: "100%",
                  backgroundColor: "#252525",
                  border: "1px solid #333",
                  borderRadius: "8px",
                  padding: "12px",
                  color: "#fff",
                  outline: "none",
                  fontSize: "14px",
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label
                style={{
                  fontSize: "12px",
                  color: "#aaa",
                  marginBottom: "6px",
                  display: "block",
                }}
              >
                CVV
              </label>
              <input
                name="cvv"
                value={card.cvv}
                onChange={handleChange}
                placeholder="•••"
                type="password"
                style={{
                  width: "100%",
                  backgroundColor: "#252525",
                  border: "1px solid #333",
                  borderRadius: "8px",
                  padding: "12px",
                  color: "#fff",
                  outline: "none",
                  fontSize: "14px",
                }}
              />
            </div>
          </div>

          <button
            onClick={handlePay}
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: loading ? "#444" : "#6c63ff",
              border: "none",
              borderRadius: "8px",
              padding: "14px",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 0.2s",
            }}
          >
            {loading ? "Processing Payment..." : `Pay $${bookPrice}`}
          </button>

          <p
            style={{
              color: "#555",
              fontSize: "12px",
              textAlign: "center",
              marginTop: "12px",
            }}
          >
            🔒 Your payment is secured and encrypted
          </p>
        </div>
      </div>
    </div>
  )
}

export default Payment
