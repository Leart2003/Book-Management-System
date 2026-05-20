function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#1a1a1a",
        borderTop: "1px solid #2a2a2a",
        padding: "20px 24px",
        textAlign: "center",
        color: "#555",
        fontSize: "13px",
      }}
    >
      <p style={{ margin: 0 }}>
        © {new Date().getFullYear()}{" "}
        <span style={{ color: "#6c63ff", fontWeight: "bold" }}>
          Book Management
        </span>{" "}
        — All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
