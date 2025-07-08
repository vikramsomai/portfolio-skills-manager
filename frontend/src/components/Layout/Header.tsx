import { Link, useLocation } from "react-router-dom"

function Header() {
    const location = useLocation()

    const navItems = [
        { path: "/", label: "Home" },
        { path: "/portfolio", label: "Portfolio" },
        { path: "/skills", label: "Skills" },
        { path: "/contact", label: "Contact" },
        { path: "/admin", label: "Admin" },
    ]

    return (
        <header className="bg-white shadow-lg sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-primary-600">
                        Portfolio Manager
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`transition-colors duration-200 ${location.pathname === item.path
                                        ? "text-primary-600 font-semibold"
                                        : "text-gray-600 hover:text-primary-500"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default Header