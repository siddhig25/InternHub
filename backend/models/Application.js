const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    // USER INFO
    userName: {
      type: String,
      required: true,
      trim: true,
    },

    userEmail: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    college: {
      type: String,
      required: true,
      trim: true,
    },

    // EXTRA USER DETAILS
    userSkills: {
      type: String,
      default: "",
    },

    experience: {
      type: String,
      default: "",
    },

    portfolio: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    coverLetter: {
      type: String,
      default: "",
    },

    resumeName: {
      type: String,
      default: "No Resume Uploaded",
    },

    // JOB DETAILS
    jobId: {
      type: String,
      required: true,
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      default: "",
    },

    salary: {
      type: String,
      default: "",
    },

    duration: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    skills: {
      type: String,
      default: "",
    },

    // APPLICATION STATUS
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Accepted", "Rejected"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Application", applicationSchema);


