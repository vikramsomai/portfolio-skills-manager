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

    const [editingSkillId, setEditingSkillId] = useState<string | null>(null)
    const [editSkill, setEditSkill] = useState({
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
            const [skillsResponse, contactsResponse] = await Promise.allSettled([
                skillsApi.getAll(),
                contactApi.getAll(),
            ])

            if (skillsResponse.status === "fulfilled") {
                setSkills(skillsResponse.value.data.data)
            } else {
                setSkills([
                    { _id: "1", name: "React", level: "Advanced", category: "Frontend" },
                    { _id: "2", name: "Node.js", level: "Intermediate", category: "Backend" },
                ])
            }

            if (contactsResponse.status === "fulfilled") {
                setContacts(contactsResponse.value.data.data)
            } else {
                setContacts([
                    {
                        _id: "1",
                        name: "John Doe",
                        email: "john@example.com",
                        message: "Great portfolio!",
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
            const newSkillWithId = { _id: Date.now().toString(), ...newSkill }
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
            setSkills(skills.filter((skill) => skill._id !== id))
        }
    }

    const handleEditClick = (skill: Skill) => {
        setEditingSkillId(skill._id!)
        setEditSkill({
            name: skill.name || "",
            level: skill.level || "Beginner",
            category: skill.category || "Frontend",
        })
    }

    const handleCancelEdit = () => {
        setEditingSkillId(null)
    }

    const handleUpdateSkill = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const updatedSkill = await skillsApi.update(editingSkillId!, editSkill)
            setSkills(skills.map((s) => (s._id === editingSkillId ? updatedSkill.data : s)))
        } catch (error) {
            console.error("Error updating skill:", error)
            setSkills(skills.map((s) => (s._id === editingSkillId ? { ...s, ...editSkill } : s)))
        } finally {
            setEditingSkillId(null)
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
        <div className="px-4 md:px-10">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Panel</h1>
                <p className="text-lg text-gray-600">Manage your skills and view contact submissions</p>
            </div>

            <div className="flex justify-center mb-8">
                <div className="bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveTab("skills")}
                        className={`px-6 py-2 rounded-md ${activeTab === "skills" ? "bg-white text-blue-600 shadow" : "text-gray-600 hover:text-gray-900"}`}
                    >
                        Skills Management
                    </button>
                    <button
                        onClick={() => setActiveTab("contacts")}
                        className={`px-6 py-2 rounded-md ${activeTab === "contacts" ? "bg-white text-blue-600 shadow" : "text-gray-600 hover:text-gray-900"}`}
                    >
                        Contact Messages
                    </button>
                </div>
            </div>

            {activeTab === "skills" && (
                <div className="space-y-8">
                    {/* Add Skill Form */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold mb-6">Add New Skill</h2>
                        <form onSubmit={handleAddSkill} className="grid md:grid-cols-4 gap-4">
                            <input
                                type="text"
                                value={newSkill.name}
                                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                                required
                                placeholder="Skill Name"
                                className="border px-3 py-2 rounded-md"
                            />
                            <select
                                value={newSkill.level}
                                onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value as Skill["level"] })}
                                className="border px-3 py-2 rounded-md"
                            >
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </select>
                            <select
                                value={newSkill.category}
                                onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as Skill["category"] })}
                                className="border px-3 py-2 rounded-md"
                            >
                                <option>Frontend</option>
                                <option>Backend</option>
                                <option>Database</option>
                                <option>Cloud</option>
                                <option>DevOps</option>
                            </select>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Add</button>
                        </form>
                    </div>

                    {/* Skills List */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold mb-6">Manage Skills ({skills.length})</h2>
                        <div className="space-y-4">
                            {skills.map((skill) =>
                                editingSkillId === skill._id ? (
                                    <form key={skill._id} onSubmit={handleUpdateSkill} className="flex flex-col md:flex-row gap-4 border p-4 rounded-md bg-yellow-50">
                                        <input
                                            type="text"
                                            value={editSkill.name}
                                            onChange={(e) => setEditSkill({ ...editSkill, name: e.target.value })}
                                            className="border px-3 py-1 rounded-md w-full md:w-40"
                                            required
                                        />
                                        <select
                                            value={editSkill.level || "Beginner"}
                                            onChange={(e) =>
                                                setEditSkill({ ...editSkill, level: e.target.value as Skill["level"] })
                                            }
                                            className="border px-3 py-1 rounded-md"
                                        >
                                            <option>Beginner</option>
                                            <option>Intermediate</option>
                                            <option>Advanced</option>
                                        </select>
                                        <select
                                            value={editSkill.category || "Frontend"}
                                            onChange={(e) =>
                                                setEditSkill({ ...editSkill, category: e.target.value as Skill["category"] })
                                            }
                                            className="border px-3 py-1 rounded-md"
                                        >
                                            <option>Frontend</option>
                                            <option>Backend</option>
                                            <option>Database</option>
                                            <option>Cloud</option>
                                            <option>DevOps</option>
                                        </select>
                                        <div className="flex gap-2">
                                            <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700">
                                                Save
                                            </button>
                                            <button type="button" onClick={handleCancelEdit} className="bg-gray-400 text-white px-4 py-1 rounded-md hover:bg-gray-600">
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div key={skill._id} className="flex justify-between items-center p-4 border rounded-md hover:bg-gray-50">
                                        <div>
                                            <h3 className="font-semibold">{skill.name}</h3>
                                            <p className="text-sm text-gray-600">{skill.category} — {skill.level}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEditClick(skill)}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteSkill(skill._id!)}
                                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "contacts" && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-semibold mb-6">Contact Messages ({contacts.length})</h2>
                    <div className="space-y-4">
                        {contacts.map((contact) => (
                            <div key={contact._id} className="border p-4 rounded-md">
                                <h3 className="font-semibold">{contact.name}</h3>
                                <p className="text-sm text-gray-600">{contact.email}</p>
                                <p className="mt-2">{contact.message}</p>
                                <p className="text-xs text-gray-400 mt-2">
                                    {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : "Recent"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Admin
