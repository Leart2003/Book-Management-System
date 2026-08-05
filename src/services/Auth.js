import { jwtDecode } from "jwt-decode"

export const getCurrentUserEmail = () => {
  const token = localStorage.getItem("token")
  if (!token) return null
  try {
    const decoded = jwtDecode(token)
    return decoded.email
  } catch {
    return null
  }
}

export const isAdmin = () => {
  return getCurrentUserEmail() === "malokuleart@gmail.com"
}
