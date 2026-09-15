import "./Footer.css"

function Footer() {
  return (
    <footer className="site-footer">
      <p>
        <strong>Libraria Bookstore</strong>
        <span>Curated reading for every kind of day.</span>
        <small>&copy; {new Date().getFullYear()}</small>
      </p>
    </footer>
  )
}

export default Footer
