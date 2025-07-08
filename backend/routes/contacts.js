const express = require("express")
const { body, validationResult } = require("express-validator")
const Contact = require("../models/Contact")

const router = express.Router()

// Validation middleware
const validateContact = [
  body("name").trim().isLength({ min: 1, max: 100 }).withMessage("Name must be between 1 and 100 characters"),
  body("email").trim().isEmail().normalizeEmail().withMessage("Please provide a valid email address"),
  body("message").trim().isLength({ min: 10, max: 1000 }).withMessage("Message must be between 10 and 1000 characters"),
]

// GET /api/contacts - Get all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })

    res.json({
      success: true,
      count: contacts.length,
      data: contacts,
    })
  } catch (error) {
    console.error("Error fetching contacts:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching contacts",
      error: error.message,
    })
  }
})

// POST /api/contacts - Create new contact
router.post("/", validateContact, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation errors",
        errors: errors.array(),
      })
    }

    const contact = new Contact(req.body)
    const savedContact = await contact.save()

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: {
        id: savedContact._id,
        createdAt: savedContact.createdAt,
      },
    })
  } catch (error) {
    console.error("Error creating contact:", error)
    res.status(500).json({
      success: false,
      message: "Error sending message",
      error: error.message,
    })
  }
})

module.exports = router
