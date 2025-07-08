import type React from "react"
import { useState, useEffect } from "react"
import { skillsApi } from "../services/api"

interface Skill {
    _id?: string
    name: string
    level: "Beginner" | "Intermediate" | "Advanced"
    category: "Frontend" | "Backend" | "Database" | "Cloud" | "DevOps"
}

const Skills: React.FC = () => {
    const [skills, setSkills] = useState<Skill[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [filter, setFilter] = useState<string>("All")

    useEffect(() => {
        fetchSkills()
    }, [])

    const fetchSkills = async () => {
        try {
            setLoading(true)
            const response = await skillsApi.getAll()
            setSkills(response.data.data)
        } catch (err) {
            setError("Failed to fetch skills")
            // Fallback data for demo
            setSkills([
                { _id: "1", name: "React", level: "Advanced", category: "Frontend" },
                { _id: "2", name: "Node.js", level: "Intermediate", category: "Backend" },
                { _id: "3", name: "MongoDB", level: "Intermediate", category: "Database" },
                { _id: "4", name: "AWS", level: "Beginner", category: "Cloud" },
                { _id: "5", name: "JavaScript", level: "Advanced", category: "Frontend" },
                { _id: "6", name: "Express.js", level: "Intermediate", category: "Backend" },
            ])
        } finally {
            setLoading(false)
        }
    }

    const categories = ["All", "Frontend", "Backend", "Database", "Cloud", "DevOps"]
    const filteredSkills = filter === "All" ? skills : skills.filter((skill) => skill.category === filter)

    const getLevelColor = (level: string) => {
        switch (level) {
            case "Advanced":
                return "bg-green-100 text-green-800"
            case "Intermediate":
                return "bg-yellow-100 text-yellow-800"
            case "Beginner":
                return "bg-blue-100 text-blue-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    return (
        <div>
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">My Skills</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Here are the technologies and tools I work with, organized by category and proficiency level.
                </p>
            </div>

            {error && (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
                    ⚠️ {error}. Showing demo data.
                </div>
            )}

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setFilter(category)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === category ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Skills Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSkills.map((skill) => (
                    <div key={skill._id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold text-gray-900">{skill.name}</h3>
                            <span className="text-sm text-gray-500">{skill.category}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Proficiency Level</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(skill.level)}`}>
                                {skill.level}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {filteredSkills.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No skills found for the selected category.</p>
                </div>
            )}
        </div>
    )
}

export default Skills
