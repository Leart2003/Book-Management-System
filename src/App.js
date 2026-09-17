import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom"
import Footer from "./Components/Footer"
import Header from "./Components/header"
import AddBook from "./pages/AddBook"
import BookDetails from "./pages/BookDetails"
import Books from "./pages/Books"
import EditBook from "./pages/Edit"
import Favorites from "./pages/Favorites"
import Login from "./pages/Login"
import Orders from "./pages/Orders"
import Payment from "./pages/Payment"
import Register from "./pages/Register"
import { hasValidToken, isAdmin } from "./services/Auth"

function ProtectedRoute({ children }) {
  return hasValidToken() ? children : <Navigate to="/login" replace />
}

function AdminRoute({ children }) {
  if (!hasValidToken()) return <Navigate to="/login" replace />

  return isAdmin() ? children : <Navigate to="/books" replace />
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
        <Route path="/books/add" element={<AdminRoute><AddBook /></AdminRoute>} />
        <Route path="/books/edit/:id" element={<AdminRoute><EditBook /></AdminRoute>} />
        <Route path="/books/:id" element={<ProtectedRoute><BookDetails /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/books" replace />} />
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
