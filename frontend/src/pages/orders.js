import { useEffect, useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"

function Orders() {
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    API.get("/Order").then((res) => setOrders(res.data))
  }, [])

  return (
    <div className="container-fluid bg-dark text-white p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>🛒 My Orders</h4>
      </div>

      {orders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#555" }}>
          <p style={{ fontSize: "48px" }}>📦</p>
          <p style={{ fontSize: "16px" }}>No orders yet. Go buy some books!</p>
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
        <div>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #2a2a2a",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "16px",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 style={{ margin: 0 }}>Order #{order.id}</h6>
                <span
                  style={{
                    backgroundColor:
                      order.status === "Completed"
                        ? "#1a2a1a"
                        : order.status === "Cancelled"
                          ? "#2a1a1a"
                          : "#2a2a1a",
                    color:
                      order.status === "Completed"
                        ? "#4caf50"
                        : order.status === "Cancelled"
                          ? "#ff4d4d"
                          : "#ffc107",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {order.status}
                </span>
              </div>

              <p
                style={{ color: "#666", fontSize: "13px", margin: "0 0 12px" }}
              >
                📅 {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <div>
                {order.orderItems?.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex align-items-center gap-3"
                    style={{
                      backgroundColor: "#252525",
                      borderRadius: "8px",
                      padding: "10px 14px",
                      marginBottom: "8px",
                    }}
                  >
                    {item.book?.imageUrl && (
                      <img
                        src={`https://localhost:7012${item.book.imageUrl}`}
                        alt={item.book?.title}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                      />
                    )}
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      >
                        {item.book?.title}
                      </p>
                      <p style={{ margin: 0, fontSize: "12px", color: "#aaa" }}>
                        ✍️ {item.book?.author?.name}
                      </p>
                    </div>
                    <span style={{ color: "#6c63ff", fontWeight: "bold" }}>
                      ${item.book?.price}
                    </span>
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <span style={{ color: "#aaa", fontSize: "13px" }}>
                  {order.orderItems?.length} book(s)
                </span>
                <span style={{ color: "#fff", fontWeight: "bold" }}>
                  Total: $
                  {order.orderItems
                    ?.reduce((sum, item) => sum + (item.book?.price || 0), 0)
                    .toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
