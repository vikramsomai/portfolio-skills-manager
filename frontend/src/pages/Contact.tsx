import type React from "react"
import { useState } from "react"
import { contactApi } from "../services/api"

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            await contactApi.submit(formData)
            setSubmitted(true)
            setFormData({ name: "", email: "", message: "" })
        } catch (err) {
            setError("Failed to send message. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    if (submitted) {
        return (
            <div className="max-w-2xl mx-auto text-center">
                <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg">
                    <div className="text-4xl mb-4">✅</div>
                    <h2 className="text-xl font-semibold mb-2">Message Sent!</h2>
                    <p>Thank you for your message. I'll get back to you soon.</p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Send Another Message
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h1>
                <p className="text-lg text-gray-600">Have a question or want to work together? I'd love to hear from you.</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="Your full name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="your.email@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                            Message *
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={6}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
                            placeholder="Tell me about your project or question..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>

            {/* Contact Information */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white rounded-lg shadow">
                    <div className="text-3xl mb-2">📧</div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">your.email@example.com</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow">
                    <div className="text-3xl mb-2">💼</div>
                    <h3 className="font-semibold mb-1">LinkedIn</h3>
                    <p className="text-gray-600">linkedin.com/in/yourprofile</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow">
                    <div className="text-3xl mb-2">🐙</div>
                    <h3 className="font-semibold mb-1">GitHub</h3>
                    <p className="text-gray-600">github.com/yourusername</p>
                </div>
            </div>
        </div>
    )
}

export default Contact
