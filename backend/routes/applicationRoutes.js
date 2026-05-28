/*const express = require("express");
const router = express.Router();

const Application = require("../models/Application");
const authMiddleware = require("../middleware/authMiddleware");

//apply
router.post("/apply", authMiddleware, async (req, res) => {
  try {
    const {
      userName,
      userEmail,
      phone,
      college,
      userSkills,
      experience,
      portfolio,
      linkedin,
      coverLetter,
      resumeName,

      jobId,
      jobTitle,
      company,
      location,
      type,
      salary,
      duration,
      description,
      skills,

      status,
      appliedAt,
    } = req.body;

    // ✅ Check existing application
    const existingApplication = await Application.findOne({
      userEmail,
      jobId,
    });

    if (existingApplication) {
      return res.status(409).json({
        message: "You already applied for this job",
      });
    }

    // ✅ Create application
    const newApplication = new Application({
      userName,
      userEmail,
      phone,
      college,
      userSkills,
      experience,
      portfolio,
      linkedin,
      coverLetter,
      resumeName,

      jobId,
      jobTitle,
      company,
      location,
      type,
      salary,
      duration,
      description,
      skills,

      status: status || "Pending",
      appliedAt,
    });

    await newApplication.save();

    res.status(201).json({
      success: true,
      message: "Application Submitted Successfully",
      application: newApplication,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Application Failed",
    });
  }
});

//
// 🔥 GET USER APPLICATIONS
//
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const applications = await Application.find({
      userEmail: email,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(applications);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
      error: err.message,
    });
  }
});

//
// 🔥 UPDATE APPLICATION STATUS
//
router.put("/status/:id", async (req, res) => {
  try {
    const { status } = req.body;

    // 🔥 VALIDATION
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
      },
    );

    // 🔥 CHECK
    if (!updatedApplication) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application: updatedApplication,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Failed to update status",
      error: err.message,
    });
  }
});

//
// 🔥 GET ALL APPLICATIONS (ADMIN)
//
router.get("/all", async (req, res) => {
  try {
    const applications = await Application.find().sort({
      createdAt: -1,
    });

    res.status(200).json(applications);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
      error: err.message,
    });
  }
});

module.exports = router;*/
const express = require("express");
const router = express.Router();

const Application = require("../models/Application");
const authMiddleware = require("../middleware/authmiddleware");

// =========================
// APPLY JOB
// =========================
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

    // =========================
    // REQUIRED VALIDATION
    // =========================
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

    // =========================
    // DUPLICATE CHECK
    // =========================
    const alreadyApplied = await Application.findOne({
      userEmail,
      jobId,
    });

    if (alreadyApplied) {
      return res.status(409).json({
        message: "Already applied",
      });
    }

    // =========================
    // CREATE APPLICATION
    // =========================
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

// =========================
// GET USER APPLICATIONS
// =========================
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

// =========================
// GET ALL APPLICATIONS (ADMIN)
// =========================
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

// =========================
// UPDATE STATUS
// =========================
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