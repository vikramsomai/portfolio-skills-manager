"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User, LoginCredentials, RegisterData, AuthContextType } from "../types/auth"
import { authApi } from "../services/api"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check for existing token on app load
        const savedToken = localStorage.getItem("token")
        const savedUser = localStorage.getItem("user")

        if (savedToken && savedUser) {
            setToken(savedToken)
            setUser(JSON.parse(savedUser))
        }
        setLoading(false)
    }, [])

    const login = async (credentials: LoginCredentials) => {
        try {
            const response = await authApi.login(credentials)
            const { token: newToken, user: newUser } = response.data

            setToken(newToken)
            setUser(newUser)

            // Save to localStorage
            localStorage.setItem("token", newToken)
            localStorage.setItem("user", JSON.stringify(newUser))
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Login failed")
        }
    }

    const register = async (data: RegisterData) => {
        try {
            const response = await authApi.register(data)
            const { token: newToken, user: newUser } = response.data

            setToken(newToken)
            setUser(newUser)

            // Save to localStorage
            localStorage.setItem("token", newToken)
            localStorage.setItem("user", JSON.stringify(newUser))
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Registration failed")
        }
    }

    const logout = () => {
        setToken(null)
        setUser(null)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    }

    const value: AuthContextType = {
        user,
        token,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!token && !!user,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
