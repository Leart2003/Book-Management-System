import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Books from "./pages/Books"
import BookDetails from "./pages/BookDetails"
import Header from "./Components/header"
import Footer from "./Components/Footer"
import { useLocation } from "react-router-dom"
import AddBook from "./pages/AddBook"

function Layout() {
  const location = useLocation()
  const hideHeader = location.pathname === "/login"

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/add" element={<AddBook />} />
        <Route path="/books/:id" element={<BookDetails />} />
      </Routes>
      {!hideHeader && <Footer />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App
