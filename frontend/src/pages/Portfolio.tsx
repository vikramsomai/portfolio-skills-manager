import type React from "react"
interface Project {
    id: number
    title: string
    description: string
    technologies: string[]
    image: string
    githubUrl?: string
    liveUrl?: string
}

const Portfolio: React.FC = () => {
    const projects: Project[] = [
        {
            id: 1,
            title: "E-commerce Platform",
            description:
                "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.",
            technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe API"],
            image: "project1.jpg",
            githubUrl: "https://github.com/yourusername/ecommerce-platform",
            liveUrl: "https://your-ecommerce-demo.com",
        },
        {
            id: 2,
            title: "Task Management App",
            description:
                "Collaborative task management application with real-time updates using Socket.io. Built with React and PostgreSQL for data persistence.",
            technologies: ["React", "Socket.io", "PostgreSQL", "Node.js", "Express"],
            image: "project2.jpg",
            githubUrl: "https://github.com/yourusername/task-manager",
            liveUrl: "https://your-task-manager.com",
        },
        {
            id: 3,
            title: "Portfolio Skills Manager",
            description:
                "This current application! A full-stack portfolio management system with CRUD operations, AWS deployment, and CI/CD pipeline.",
            technologies: ["React", "TypeScript", "Node.js", "MongoDB", "AWS", "GitHub Actions"],
            image: "project3.jpg",
            githubUrl: "https://github.com/yourusername/portfolio-skills-manager",
            liveUrl: "https://your-portfolio.com",
        },
    ]

    return (
        <div>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">My Portfolio</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Here are some of the projects I've worked on, showcasing different technologies and approaches to web
                    development.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                    >
                        <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-64 object-cover" />
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-3">{project.title}</h3>
                            <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Technologies Used:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, index) => (
                                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        View Code
                                    </a>
                                )}
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            />
                                        </svg>
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Portfolio
