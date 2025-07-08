export interface Skill {
  _id?: string
  name: string
  level: "Beginner" | "Intermediate" | "Advanced"
  category: "Frontend" | "Backend" | "Database" | "Cloud" | "DevOps"
  createdAt?: Date
}

export interface Contact {
  _id?: string
  name: string
  email: string
  message: string
  createdAt?: Date
}

export interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  image: string
  githubUrl?: string
  liveUrl?: string
}
