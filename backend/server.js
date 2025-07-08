const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
require("dotenv").config()
const User = require("./models/User")
const app = express()
const PORT = process.env.PORT || 5000
const bcrypt = require("bcryptjs")
// Middleware
app.use(helmet())
app.use(morgan("combined"))
app.use(cors())
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))


const createInitialAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: "admin@example.com" })
    if (existingAdmin) {
      console.log("Admin user already exists")
      return
    }

    // const hashedPassword = await bcrypt.hash("admin123", 10)

    const adminUser = new User({
      username: "admin",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    })

    await adminUser.save()
    console.log("Admin user created successfully")
  } catch (error) {
    console.error("Error creating admin user:", error.message)
  }
}
// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/portfolio", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error("Database connection error:", error)
    process.exit(1)
  }
}

connectDB().then(()=>{
  createInitialAdmin()
})

// Import Routes
const authRoutes = require("./routes/auth")
const skillRoutes = require("./routes/skills")
const contactRoutes = require("./routes/contacts")

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/skills", skillRoutes)
app.use("/api/contacts", contactRoutes)

    


// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Portfolio Skills Manager API with JWT Authentication",
    version: "2.0.0",
    endpoints: {
      auth: "/api/auth",
      skills: "/api/skills",
      contacts: "/api/contacts",
      health: "/api/health",
    },
  })
})



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "production" ? {} : err.message,
  })
})

// 404 handler
// app.use("*", (req, res) => {
//   res.status(404).json({
//     message: "Route not found",
//     path: req.originalUrl,
//   })
// })

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`)
})

module.exports = app
