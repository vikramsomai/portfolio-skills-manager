import axios from "axios"

const API_BASE_URL =  "http://localhost:5000/api"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// Auth API
export const authApi = {
  login: (credentials: any) => api.post("/auth/login", credentials),
  register: (data: any) => api.post("/auth/register", data),
  getProfile: () => api.get("/auth/profile"),
}

// Skills API
export const skillsApi = {
  getAll: () => api.get("/skills"),
  create: (skill: any) => api.post("/skills", skill),
  update: (id: string, skill: any) => api.put(`/skills/${id}`, skill),
  delete: (id: string) => api.delete(`/skills/${id}`),
}

// Contact API
export const contactApi = {
  submit: (contact: any) => api.post("/contacts", contact),
  getAll: () => api.get("/contacts"),
}

export default api
