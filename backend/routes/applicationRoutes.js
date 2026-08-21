const express = require("express");
const router = express.Router();

const Application = require("../models/Application");
const authMiddleware = require("../middleware/authMiddleware");

// APPLY JOB
router.post("/apply", authMiddleware, async (req, res) => {
  try {
    console.log(req.body);

    const {
      userName,
      userEmail,
      phone,
      college,
      jobId,
      jobTitle,
      company,
    } = req.body;

    // REQUIRED VALIDATION
    if (
      !userName ||
      !userEmail ||
      !phone ||
      !college ||
      !jobId ||
      !jobTitle ||
      !company
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    // DUPLICATE CHECK
    const alreadyApplied = await Application.findOne({
      userEmail,
      jobId,
    });

    if (alreadyApplied) {
      return res.status(409).json({
        message: "Already applied",
      });
    }

    // CREATE APPLICATION
    const newApplication = new Application(req.body);

    await newApplication.save();

    res.status(201).json({
      success: true,
      message: "Application Submitted Successfully",
      application: newApplication,
    });
  } catch (error) {
    console.log("APPLICATION ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// GET USER APPLICATIONS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const email = req.query.email;

    const applications = await Application.find({
      userEmail: email,
    }).sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch applications",
    });
  }
});

// GET ALL APPLICATIONS (ADMIN)
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const applications = await Application.find().sort({
      createdAt: -1,
    });

    res.json(applications);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch applications",
    });
  }
});

// UPDATE STATUS
router.put("/status/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const updatedApplication =
      await Application.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );

    res.json(updatedApplication);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to update status",
    });
  }
});

module.exports = router;


