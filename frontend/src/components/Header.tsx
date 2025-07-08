"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Header: React.FC = () => {
    const { isAuthenticated, user, logout } = useAuth()

    const handleLogout = () => {
        logout()
    }

    return (
        <header className="bg-blue-600 text-white shadow-lg">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold">
                        My Portfolio
                    </Link>

                    <div className="flex items-center space-x-6">
                        <ul className="flex space-x-6">
                            <li>
                                <Link to="/" className="hover:text-blue-200 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/portfolio" className="hover:text-blue-200 transition-colors">
                                    Portfolio
                                </Link>
                            </li>
                            <li>
                                <Link to="/skills" className="hover:text-blue-200 transition-colors">
                                    Skills
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-blue-200 transition-colors">
                                    Contact
                                </Link>
                            </li>
                            {isAuthenticated && (
                                <li>
                                    <Link to="/admin" className="hover:text-blue-200 transition-colors">
                                        Admin
                                    </Link>
                                </li>
                            )}
                        </ul>

                        {/* Auth Section */}
                        <div className="flex items-center space-x-4 border-l border-blue-500 pl-6">
                            {isAuthenticated ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm">
                                        Welcome, <span className="font-semibold">{user?.username}</span>
                                        {user?.role === "admin" && (
                                            <span className="ml-1 px-2 py-1 bg-blue-500 text-xs rounded-full">Admin</span>
                                        )}
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-blue-500 hover:bg-blue-400 px-3 py-1 rounded text-sm transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="flex space-x-2">
                                    <Link
                                        to="/login"
                                        className="bg-blue-500 hover:bg-blue-400 px-3 py-1 rounded text-sm transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="border border-blue-400 hover:bg-blue-500 px-3 py-1 rounded text-sm transition-colors"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
