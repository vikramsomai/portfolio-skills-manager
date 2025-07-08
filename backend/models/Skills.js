const mongoose = require("mongoose")

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Skill name is required"],
      trim: true,
      maxlength: [50, "Skill name cannot exceed 50 characters"],
      unique: true,
    },
    level: {
      type: String,
      required: [true, "Skill level is required"],
      enum: {
        values: ["Beginner", "Intermediate", "Advanced"],
        message: "Level must be Beginner, Intermediate, or Advanced",
      },
    },
    category: {
      type: String,
      required: [true, "Skill category is required"],
      enum: {
        values: ["Frontend", "Backend", "Database", "Cloud", "DevOps"],
        message: "Category must be Frontend, Backend, Database, Cloud, or DevOps",
      },
    },
    description: {
      type: String,
      maxlength: [200, "Description cannot exceed 200 characters"],
    },
    yearsOfExperience: {
      type: Number,
      min: [0, "Years of experience cannot be negative"],
      max: [50, "Years of experience seems too high"],
    },
  },
  {
    timestamps: true,
  },
)

// Index for better query performance
skillSchema.index({ category: 1, level: 1 })

module.exports = mongoose.model("Skill", skillSchema)
