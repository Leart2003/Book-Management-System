import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Books from "./pages/Books"
import BookDetails from "./pages/BookDetails"
import Header from "./Components/header"
import Footer from "./Components/Footer"
import { useLocation } from "react-router-dom"
import AddBook from "./pages/AddBook"
import Register from "./pages/Register"
import Favorites from "./pages/Favorites"
import Orders from "./pages/Orders"
import Payment from "./pages/Payment"
import EditBook from "./pages/Edit"
import { hasValidToken } from "./services/Auth"

function ProtectedRoute({ children }) {
  return hasValidToken() ? children : <Navigate to="/login" replace />
}

function Layout() {
  const location = useLocation()
  const hideHeader =
    location.pathname === "/login" || location.pathname === "/register"

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<ProtectedRoute><Books /></ProtectedRoute>} />
        <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/books/add" element={<ProtectedRoute><AddBook /></ProtectedRoute>} />
        <Route path="/books/edit/:id" element={<ProtectedRoute><EditBook /></ProtectedRoute>} />
        <Route path="/books/:id" element={<ProtectedRoute><BookDetails /></ProtectedRoute>} />
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
