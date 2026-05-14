import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Books from "./pages/Books"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
