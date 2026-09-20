import { jwtDecode } from "jwt-decode"

export const hasValidToken = () => {
  const token = localStorage.getItem("token")
  if (!token) return false

  try {
    const decoded = jwtDecode(token)
    return !decoded.exp || decoded.exp * 1000 > Date.now()
  } catch {
    return false
  }
}

export const getCurrentUserEmail = () => {
  if (!hasValidToken()) return null
  const token = localStorage.getItem("token")
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
