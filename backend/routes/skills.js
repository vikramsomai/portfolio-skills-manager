const express = require("express")
const { body, validationResult } = require("express-validator")
const Skill = require("../models/Skills")
const { auth, adminAuth } = require("../middleware/auth")

const router = express.Router()

// Validation middleware
const validateSkill = [
  body("name").trim().isLength({ min: 1, max: 50 }).withMessage("Skill name must be between 1 and 50 characters"),
  body("level")
    .isIn(["Beginner", "Intermediate", "Advanced"])
    .withMessage("Level must be Beginner, Intermediate, or Advanced"),
  body("category")
    .isIn(["Frontend", "Backend", "Database", "Cloud", "DevOps"])
    .withMessage("Category must be Frontend, Backend, Database, Cloud, or DevOps"),
]

// GET /api/skills - Get all skills (public)
router.get("/", async (req, res) => {
  try {
    const { category, level, sort } = req.query
    const query = {}

    if (category) query.category = category
    if (level) query.level = level

    let skillsQuery = Skill.find(query)

    // Sorting
    if (sort === "name") {
      skillsQuery = skillsQuery.sort({ name: 1 })
    } else if (sort === "level") {
      skillsQuery = skillsQuery.sort({ level: 1 })
    } else if (sort === "category") {
      skillsQuery = skillsQuery.sort({ category: 1, name: 1 })
    } else {
      skillsQuery = skillsQuery.sort({ createdAt: -1 })
    }

    const skills = await skillsQuery

    res.json({
      success: true,
      count: skills.length,
      data: skills,
    })
  } catch (error) {
    console.error("Error fetching skills:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching skills",
      error: error.message,
    })
  }
})

// GET /api/skills/:id - Get single skill (public)
router.get("/:id", async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id)

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      })
    }

    res.json({
      success: true,
      data: skill,
    })
  } catch (error) {
    console.error("Error fetching skill:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching skill",
      error: error.message,
    })
  }
})

// POST /api/skills - Create new skill (admin only)
router.post("/", adminAuth, validateSkill, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation errors",
        errors: errors.array(),
      })
    }

    const skill = new Skill({
      ...req.body,
      createdBy: req.user._id,
    })
    const savedSkill = await skill.save()

    res.status(201).json({
      success: true,
      message: "Skill created successfully",
      data: savedSkill,
    })
  } catch (error) {
    console.error("Error creating skill:", error)

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Skill with this name already exists",
      })
    }

    res.status(500).json({
      success: false,
      message: "Error creating skill",
      error: error.message,
    })
  }
})

// PUT /api/skills/:id - Update skill (admin only)
router.put("/:id", adminAuth, validateSkill, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation errors",
        errors: errors.array(),
      })
    }

    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedBy: req.user._id },
      { new: true, runValidators: true },
    )

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      })
    }

    res.json({
      success: true,
      message: "Skill updated successfully",
      data: skill,
    })
  } catch (error) {
    console.error("Error updating skill:", error)
    res.status(500).json({
      success: false,
      message: "Error updating skill",
      error: error.message,
    })
  }
})

// DELETE /api/skills/:id - Delete skill (admin only)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id)

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      })
    }

    res.json({
      success: true,
      message: "Skill deleted successfully",
      data: skill,
    })
  } catch (error) {
    console.error("Error deleting skill:", error)
    res.status(500).json({
      success: false,
      message: "Error deleting skill",
      error: error.message,
    })
  }
})

module.exports = router
