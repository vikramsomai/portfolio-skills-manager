"use client"

import type React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

interface ProtectedRouteProps {
    children: React.ReactNode
    requireAdmin?: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
    const { isAuthenticated, user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (requireAdmin && user?.role !== "admin") {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
                <p className="text-gray-600">You don't have permission to access this page.</p>
            </div>
        )
    }

    return <>{children}</>
}

export default ProtectedRoute
