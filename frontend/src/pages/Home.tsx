import type React from "react"
import { Link } from "react-router-dom"

const Home: React.FC = () => {
    return (
        <div className="text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-8 rounded-lg mb-12">
                <h1 className="text-5xl font-bold mb-6">Welcome to My Portfolio</h1>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                    Full-Stack Developer specializing in React, Node.js, and cloud technologies. Passionate about creating
                    scalable web applications and solving complex problems.
                </p>
                <div className="space-x-4">
                    <Link
                        to="/portfolio"
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                        View My Work
                    </Link>
                    <Link
                        to="/contact"
                        className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                    >
                        Get In Touch
                    </Link>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-4xl mb-4">🚀</div>
                    <h3 className="text-xl font-semibold mb-2">Full-Stack Development</h3>
                    <p className="text-gray-600">
                        Building complete web applications from frontend to backend with modern technologies.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-4xl mb-4">☁️</div>
                    <h3 className="text-xl font-semibold mb-2">Cloud Deployment</h3>
                    <p className="text-gray-600">Deploying applications on AWS with CI/CD pipelines for seamless updates.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-4xl mb-4">📱</div>
                    <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
                    <p className="text-gray-600">Creating beautiful, responsive interfaces that work perfectly on all devices.</p>
                </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6">Technology Stack</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["React", "Node.js", "MongoDB", "AWS", "TypeScript", "Express", "Tailwind CSS", "Git"].map((tech) => (
                        <div key={tech} className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg text-center font-medium">
                            {tech}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
