function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#fff",
        borderTop: "1px solid #e0e0e0",
        padding: "20px 40px",
        textAlign: "center",
        color: "#999",
        fontSize: "13px",
      }}
    >
      <p style={{ margin: 0 }}>
        © {new Date().getFullYear()}{" "}
        <span style={{ color: "#e63946", fontWeight: "700" }}>
          Libraria Bookstore
        </span>{" "}
        — All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
