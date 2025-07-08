"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { skillsApi, contactApi } from "../services/api"

interface Skill {
    _id?: string
    name: string
    level: "Beginner" | "Intermediate" | "Advanced"
    category: "Frontend" | "Backend" | "Database" | "Cloud" | "DevOps"
}

interface Contact {
    _id?: string
    name: string
    email: string
    message: string
    createdAt?: Date
}

const Admin: React.FC = () => {
    const [skills, setSkills] = useState<Skill[]>([])
    const [contacts, setContacts] = useState<Contact[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<"skills" | "contacts">("skills")

    const [newSkill, setNewSkill] = useState({
        name: "",
        level: "Beginner" as const,
        category: "Frontend" as const,
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            setLoading(true)
            // Try to fetch real data, fallback to demo data
            const [skillsResponse, contactsResponse] = await Promise.allSettled([skillsApi.getAll(), contactApi.getAll()])

            if (skillsResponse.status === "fulfilled") {
                setSkills(skillsResponse.value.data.data)
            } else {
                // Fallback data
                setSkills([
                    { _id: "1", name: "React", level: "Advanced", category: "Frontend" },
                    { _id: "2", name: "Node.js", level: "Intermediate", category: "Backend" },
                ])
            }

            if (contactsResponse.status === "fulfilled") {
                setContacts(contactsResponse.value.data.data)
            } else {
                // Fallback data
                setContacts([
                    {
                        _id: "1",
                        name: "John Doe",
                        email: "john@example.com",
                        message: "Great portfolio! I would like to discuss a project.",
                        createdAt: new Date(),
                    },
                ])
            }
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddSkill = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await skillsApi.create(newSkill)
            setSkills([...skills, response.data])
            setNewSkill({ name: "", level: "Beginner", category: "Frontend" })
        } catch (error) {
            console.error("Error adding skill:", error)
            // For demo purposes, add locally
            const newSkillWithId = {
                _id: Date.now().toString(),
                ...newSkill,
            }
            setSkills([...skills, newSkillWithId])
            setNewSkill({ name: "", level: "Beginner", category: "Frontend" })
        }
    }

    const handleDeleteSkill = async (id: string) => {
        try {
            await skillsApi.delete(id)
            setSkills(skills.filter((skill) => skill._id !== id))
        } catch (error) {
            console.error("Error deleting skill:", error)
            // For demo purposes, delete locally
            setSkills(skills.filter((skill) => skill._id !== id))
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
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Panel</h1>
                <p className="text-lg text-gray-600">Manage your skills and view contact submissions</p>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
                <div className="bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveTab("skills")}
                        className={`px-6 py-2 rounded-md transition-colors ${activeTab === "skills" ? "bg-white text-blue-600 shadow" : "text-gray-600 hover:text-gray-900"
                            }`}
                    >
                        Skills Management
                    </button>
                    <button
                        onClick={() => setActiveTab("contacts")}
                        className={`px-6 py-2 rounded-md transition-colors ${activeTab === "contacts" ? "bg-white text-blue-600 shadow" : "text-gray-600 hover:text-gray-900"
                            }`}
                    >
                        Contact Messages
                    </button>
                </div>
            </div>

            {activeTab === "skills" && (
                <div className="space-y-8">
                    {/* Add New Skill Form */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold mb-6">Add New Skill</h2>
                        <form onSubmit={handleAddSkill} className="grid md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Skill Name</label>
                                <input
                                    type="text"
                                    value={newSkill.name}
                                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., React"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                                <select
                                    value={newSkill.level}
                                    onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value as any })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select
                                    value={newSkill.category}
                                    onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as any })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="Frontend">Frontend</option>
                                    <option value="Backend">Backend</option>
                                    <option value="Database">Database</option>
                                    <option value="Cloud">Cloud</option>
                                    <option value="DevOps">DevOps</option>
                                </select>
                            </div>
                            <div className="flex items-end">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Add Skill
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Skills List */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold mb-6">Manage Skills ({skills.length})</h2>
                        <div className="space-y-4">
                            {skills.map((skill) => (
                                <div
                                    key={skill._id}
                                    className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                                >
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg">{skill.name}</h3>
                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                            <span>Category: {skill.category}</span>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${skill.level === "Advanced"
                                                    ? "bg-green-100 text-green-800"
                                                    : skill.level === "Intermediate"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-blue-100 text-blue-800"
                                                    }`}
                                            >
                                                {skill.level}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteSkill(skill._id!)}
                                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                            {skills.length === 0 && (
                                <div className="text-center py-8 text-gray-500">No skills added yet. Add your first skill above!</div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "contacts" && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-semibold mb-6">Contact Messages ({contacts.length})</h2>
                    <div className="space-y-6">
                        {contacts.map((contact) => (
                            <div key={contact._id} className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-semibold text-lg">{contact.name}</h3>
                                        <p className="text-gray-600">{contact.email}</p>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : "Recent"}
                                    </span>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-gray-700 leading-relaxed">{contact.message}</p>
                                </div>
                            </div>
                        ))}
                        {contacts.length === 0 && <div className="text-center py-8 text-gray-500">No contact messages yet.</div>}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Admin
