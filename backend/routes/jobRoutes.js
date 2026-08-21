const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

//  TEST ROUTE (IMPORTANT FOR DEBUGGING)
router.get("/", (req, res) => {
  console.log(" GET /api/jobs HIT");

  res.json([
    {
      title: "Frontend Developer Intern",
      company: "InternHub Demo",
      location: "Remote",
      type: "Paid Internship",
    },
  ]);
});

//  CREATE JOB
router.post("/add", async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();

    res.json({
      message: "Job created successfully",
      job,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


