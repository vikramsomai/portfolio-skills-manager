export interface User {
  _id?: string
  username: string
  email: string
  role: "admin" | "user"
  createdAt?: Date
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  token?: string
  user?: User
  message?: string
}

export interface AuthContextType {
  user: User | null
  token: string | null
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  loading: boolean
  isAuthenticated: boolean
}
