import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Jobs({ theme }) {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search + Filter
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  // Popup states
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Resume
  const [resumeFile, setResumeFile] = useState(null);

  // Success popup
  const [successPopup, setSuccessPopup] = useState(false);

  // Submit Loading
  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState({});
  // Form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    skills: "",
    experience: "",
    portfolio: "",
    linkedin: "",
    coverLetter: "",
  });

  const isDark = theme === "dark";

  // =====================================
  // FETCH JOBS
  // =====================================
  const fetchJobs = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:5000/api/jobs");

      // Demo Jobs
      const extraJobs = [
        {
          _id: "1",
          title: "Frontend Developer Intern",
          company: "Microsoft",
          location: "Hyderabad",
          type: "Internship",
          description: "Develop scalable UI/UX using react.js",
          salary: "₹20,000/month",
          duration: "5 Months",
          skills: "React.js,html,css,javascript",
        },

        {
          _id: "2",
          title: "Backend Developer Intern",
          company: "Microsoft",
          location: "Bangalore",
          type: "Internship",
          description:
            "Develop scalable APIs and backend systems using Node.js.",
          salary: "₹30,000/month",
          duration: "4 Months",
          skills: "Node.js, MongoDB, Express",
        },

        {
          _id: "3",
          title: "UI/UX Designer",
          company: "Adobe",
          location: "Mumbai",
          type: "Full Time",
          description:
            "Design modern user interfaces and smooth user experiences.",
          salary: "₹40,000/month",
          duration: "Permanent",
          skills: "Figma, UI Design, Adobe XD",
        },

        {
          _id: "4",
          title: "Business Analyst Intern",
          company: "Deloitte",
          location: "Pune",
          type: "Internship",
          description: "Analyze business data and create strategic reports.",
          salary: "₹22,000/month",
          duration: "5 Months",
          skills: "Excel, Analytics, Communication",
        },

        {
          _id: "5",
          title: "Marketing Intern",
          company: "Amazon",
          location: "Hybrid",
          type: "Internship",
          description: "Handle social media marketing and digital campaigns.",
          salary: "₹18,000/month",
          duration: "3 Months",
          skills: "SEO, Marketing, Social Media",
        },

        {
          _id: "6",
          title: "Data Science Intern",
          company: "Infosys",
          location: "Hyderabad",
          type: "Internship",
          description:
            "Work with machine learning models and business datasets.",
          salary: "₹35,000/month",
          duration: "6 Months",
          skills: "Python, ML, Data Analysis",
        },

        {
          _id: "7",
          title: "Cyber Security Analyst",
          company: "TCS",
          location: "Mumbai",
          type: "Full Time",
          description: "Protect enterprise systems and monitor cyber threats.",
          salary: "₹50,000/month",
          duration: "Permanent",
          skills: "Cyber Security, Networking, Linux",
        },

        {
          _id: "8",
          title: "AI/ML Engineer",
          company: "OpenAI",
          location: "Remote",
          type: "Full Time",
          description:
            "Build intelligent AI systems and machine learning pipelines.",
          salary: "₹80,000/month",
          duration: "Permanent",
          skills: "Python, AI, Deep Learning",
        },
      ];

      // Database Jobs
      const databaseJobs = Array.isArray(res.data) ? res.data : [];

      // ✅ REMOVE Frontend Developer Intern
      const cleanedDatabaseJobs = databaseJobs.filter(
        (job) =>
          job.title?.trim().toLowerCase() !== "frontend developer intern",
      );

      // Final Jobs
      const allJobs = [...extraJobs, ...cleanedDatabaseJobs];

      setJobs(allJobs);
      setFilteredJobs(allJobs);
    } catch (error) {
      console.log("Fetch Jobs Error:", error);
      alert("❌ Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // LOAD JOBS
  // =====================================
  useEffect(() => {
    fetchJobs();
  }, []);

  // =====================================
  // FILTER JOBS
  // =====================================
  useEffect(() => {
    let updatedJobs = [...jobs];

    if (selectedType !== "All") {
      updatedJobs = updatedJobs.filter((job) => job.type === selectedType);
    }

    if (search.trim() !== "") {
      updatedJobs = updatedJobs.filter((job) => {
        const title = job.title?.toLowerCase() || "";
        const company = job.company?.toLowerCase() || "";
        const skills = job.skills?.toLowerCase() || "";

        return (
          title.includes(search.toLowerCase()) ||
          company.includes(search.toLowerCase()) ||
          skills.includes(search.toLowerCase())
        );
      });
    }

    setFilteredJobs(updatedJobs);
  }, [search, selectedType, jobs]);

  // =====================================
  // OPEN APPLY FORM
  // =====================================
  const openApplyForm = (job) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("⚠ Please Login First");
      navigate("/login");
      return;
    }

    const userName = localStorage.getItem("name") || "";
    const userEmail = localStorage.getItem("email") || "";

    setSelectedJob(job);

    setFormData({
      fullName: userName,
      email: userEmail,
      phone: "",
      college: "",
      skills: "",
      experience: "",
      portfolio: "",
      linkedin: "",
      coverLetter: "",
    });

    setResumeFile(null);
    setShowForm(true);
  };

  // =====================================
  // HANDLE INPUT
  // =====================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // =====================================
  // RESUME UPLOAD
  // =====================================
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("⚠ Only PDF or DOC files allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("⚠ File size must be under 5MB");
      return;
    }

    setResumeFile(file);
    setErrors({
      ...errors,
      resume: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone Number must be exactly 10 digits";
    }

    if (!formData.college.trim()) {
      newErrors.college = "College Name is required";
    }

    if (!formData.skills.trim()) {
      newErrors.skills = "Skills are required";
    }

    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = "Cover Letter is required";
    }

    if (!resumeFile) {
      newErrors.resume = "Resume is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =====================================
  // SUBMIT APPLICATION
  // =====================================
  const submitApplication = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("⚠ Please Login First");
      navigate("/login");
      return;
    }
    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);

      const applicationData = {
        userName: formData.fullName,
        userEmail: formData.email,
        phone: formData.phone,
        college: formData.college,

        userSkills: formData.skills,
        experience: formData.experience,
        portfolio: formData.portfolio,
        linkedin: formData.linkedin,
        coverLetter: formData.coverLetter,

        resumeName: resumeFile?.name || "No Resume Uploaded",

        jobId: selectedJob._id,
        jobTitle: selectedJob.title,
        company: selectedJob.company,
        location: selectedJob.location,
        type: selectedJob.type,
        salary: selectedJob.salary,
        duration: selectedJob.duration,
        description: selectedJob.description,
        skills: selectedJob.skills,

        status: "Pending",
        appliedAt: new Date(),
      };

      await axios.post(
        "http://localhost:5000/api/applications/apply",
        applicationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setShowForm(false);

      setSuccessPopup(true);

      setTimeout(() => {
        setSuccessPopup(false);
      }, 3000);
    } catch (err) {
      console.log("Application Error:", err);

      if (err.response?.status === 401) {
        localStorage.clear();

        alert("⚠ Session Expired. Please Login Again");

        navigate("/login");
        return;
      }

      if (err.response?.status === 409) {
        alert("⚠ You already applied for this job");
        return;
      }

      alert("❌ Application Failed");
    } finally {
      setSubmitting(false);
    }
  };

  // =====================================
  // STYLES
  // =====================================

  const styles = {
    page: {
      minHeight: "100vh",
      padding: window.innerWidth <= 768 ? "25px 15px" : "50px",
      background: isDark ? "#0f0f0f" : "#f5f5f5",
      color: isDark ? "white" : "#111",
      fontFamily: "Segoe UI",
      overflowX: "hidden",
      boxSizing: "border-box",
    },

    title: {
      fontSize: window.innerWidth <= 768 ? "34px" : "48px",
      textAlign: "center",
      marginBottom: "10px",
      fontWeight: "700",
      lineHeight: "1.2",
    },

    subtitle: {
      textAlign: "center",
      color: isDark ? "#aaa" : "#555",
      marginBottom: "35px",
      fontSize: window.innerWidth <= 768 ? "14px" : "16px",
      padding: "0 10px",
    },

    gold: {
      color: "#d4af37",
    },

    topBar: {
      display: "flex",
      gap: "15px",
      marginBottom: "35px",
      flexWrap: "wrap",
      justifyContent: "center",
      width: "100%",
    },

    search: {
      padding: "14px",
      width: window.innerWidth <= 768 ? "100%" : "320px",
      maxWidth: "100%",
      borderRadius: "10px",
      border: "1px solid #444",
      background: isDark ? "#171717" : "#fff",
      color: isDark ? "#fff" : "#111",
      outline: "none",
      boxSizing: "border-box",
    },

    select: {
      padding: "14px",
      width: window.innerWidth <= 768 ? "100%" : "220px",
      maxWidth: "100%",
      borderRadius: "10px",
      border: "1px solid #444",
      background: isDark ? "#171717" : "#fff",
      color: isDark ? "#fff" : "#111",
      outline: "none",
      cursor: "pointer",
      boxSizing: "border-box",
    },

    grid: {
      display: "grid",
      gridTemplateColumns:
        window.innerWidth <= 768 ? "1fr" : "repeat(auto-fit,minmax(340px,1fr))",
      gap: "24px",
    },

    card: {
      background: isDark ? "rgba(255,255,255,0.05)" : "#fff",
      padding: window.innerWidth <= 768 ? "20px" : "25px",
      borderRadius: "22px",
      border: isDark ? "1px solid rgba(212,175,55,0.2)" : "1px solid #ddd",
      boxShadow: isDark ? "none" : "0 8px 18px rgba(0,0,0,0.08)",
      overflow: "hidden",
      wordWrap: "break-word",
    },

    badge: {
      background: "#d4af37",
      color: "#111",
      display: "inline-block",
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "700",
      marginBottom: "15px",
    },

    jobTitle: {
      fontSize: window.innerWidth <= 768 ? "21px" : "25px",
      marginBottom: "8px",
      lineHeight: "1.3",
    },

    company: {
      color: "#d4af37",
      marginBottom: "12px",
      fontWeight: "600",
    },

    meta: {
      color: isDark ? "#aaa" : "#555",
      marginBottom: "14px",
      fontSize: "14px",
    },

    desc: {
      lineHeight: "1.7",
      marginBottom: "16px",
      color: isDark ? "#ddd" : "#444",
      fontSize: "14px",
    },

    info: {
      marginBottom: "10px",
      color: isDark ? "#ccc" : "#333",
      fontSize: "14px",
      lineHeight: "1.6",
      wordBreak: "break-word",
    },

    applyBtn: {
      width: "100%",
      padding: "14px",
      border: "none",
      borderRadius: "12px",
      background: "#d4af37",
      color: "#111",
      fontWeight: "700",
      cursor: "pointer",
      marginTop: "18px",
      fontSize: "15px",
    },

    loading: {
      textAlign: "center",
      marginTop: "50px",
      color: "#888",
      fontSize: "18px",
    },

    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      background: "rgba(0,0,0,0.75)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      padding: window.innerWidth <= 768 ? "10px" : "20px",
      overflowY: "auto",
    },

    popup: {
      width: "100%",
      maxWidth: "600px",
      maxHeight: "90vh",
      overflowY: "auto",
      background: isDark ? "#171717" : "#fff",
      padding: window.innerWidth <= 768 ? "20px" : "30px",
      borderRadius: "22px",
      boxSizing: "border-box",
    },

    popupTitle: {
      marginBottom: "22px",
      fontSize: window.innerWidth <= 768 ? "22px" : "28px",
      lineHeight: "1.3",
    },

    input: {
      width: "100%",
      padding: "14px",
      marginBottom: "15px",
      borderRadius: "10px",
      border: "1px solid #444",
      background: isDark ? "#0f0f0f" : "#f3f3f3",
      color: isDark ? "#fff" : "#111",
      outline: "none",
      boxSizing: "border-box",
      fontSize: "14px",
    },

    textarea: {
      width: "100%",
      padding: "14px",
      marginBottom: "15px",
      borderRadius: "10px",
      border: "1px solid #444",
      background: isDark ? "#0f0f0f" : "#f3f3f3",
      color: isDark ? "#fff" : "#111",
      minHeight: "120px",
      resize: "none",
      outline: "none",
      boxSizing: "border-box",
      fontSize: "14px",
    },

    uploadBox: {
      border: "2px dashed #d4af37",
      borderRadius: "12px",
      padding: window.innerWidth <= 768 ? "18px" : "24px",
      textAlign: "center",
      cursor: "pointer",
      marginBottom: "18px",
      background: isDark ? "#111" : "#fafafa",
    },

    uploadText: {
      color: isDark ? "#ccc" : "#444",
      fontSize: "14px",
      wordBreak: "break-word",
    },

    popupBtns: {
      display: "flex",
      gap: "12px",
      marginTop: "10px",
      flexDirection: window.innerWidth <= 768 ? "column" : "row",
    },

    submitBtn: {
      flex: 1,
      padding: "14px",
      border: "none",
      borderRadius: "10px",
      background: "#d4af37",
      fontWeight: "700",
      cursor: "pointer",
      width: "100%",
    },

    cancelBtn: {
      flex: 1,
      padding: "14px",
      border: "none",
      borderRadius: "10px",
      background: "#444",
      color: "#fff",
      cursor: "pointer",
      width: "100%",
    },

    successPopup: {
      position: "fixed",
      top: window.innerWidth <= 768 ? "15px" : "30px",
      right: window.innerWidth <= 768 ? "15px" : "30px",
      left: window.innerWidth <= 768 ? "15px" : "auto",
      background: "#16a34a",
      color: "#fff",
      padding: "18px 24px",
      borderRadius: "12px",
      zIndex: 2000,
      fontWeight: "600",
      boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.page}>
      {successPopup && (
        <div style={styles.successPopup}>
          🎉 Application Submitted Successfully!
        </div>
      )}

      <h1 style={styles.title}>
        InternHub <span style={styles.gold}>Opportunities</span>
      </h1>

      <p style={styles.subtitle}>
        Explore premium internships and career opportunities
      </p>

      {/* Search + Filter */}
      <div style={styles.topBar}>
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          style={styles.select}
        >
          <option value="All">All Jobs</option>
          <option value="Internship">Internship</option>
          <option value="Full Time">Full Time</option>
        </select>
      </div>

      {/* Jobs */}
      {loading ? (
        <p style={styles.loading}>Loading jobs...</p>
      ) : filteredJobs.length === 0 ? (
        <p style={styles.loading}>No jobs found</p>
      ) : (
        <div style={styles.grid}>
          {filteredJobs.map((job) => (
            <div key={job._id} style={styles.card}>
              <div style={styles.badge}>{job.type}</div>

              <h2 style={styles.jobTitle}>{job.title}</h2>

              <p style={styles.company}>{job.company}</p>

              <p style={styles.meta}>📍 {job.location}</p>

              <p style={styles.desc}>{job.description}</p>

              <p style={styles.info}>💰 Salary: {job.salary}</p>

              <p style={styles.info}>⏳ Duration: {job.duration}</p>

              <p style={styles.info}>🛠 Skills: {job.skills}</p>

              <button
                style={styles.applyBtn}
                onClick={() => openApplyForm(job)}
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}

      {/* APPLY FORM POPUP */}
      {showForm && selectedJob && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <h2 style={styles.popupTitle}>Apply for {selectedJob.title}</h2>

            <input
              type="text"
              name="fullName"
              placeholder="Full Name *"
              value={formData.fullName}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.fullName && (
              <p
                style={{
                  color: "#ef4444",
                  fontSize: "13px",
                  marginTop: "-10px",
                  marginBottom: "15px",
                }}
              >
                {errors.fullName}
              </p>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.email && (
              <p
                style={{
                  color: "#ef4444",
                  fontSize: "13px",
                  marginTop: "-10px",
                  marginBottom: "15px",
                }}
              >
                {errors.email}
              </p>
            )}

            <input
              type="text"
              name="phone"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.phone && (
              <p
                style={{
                  color: "#ef4444",
                  fontSize: "13px",
                  marginTop: "-10px",
                  marginBottom: "15px",
                }}
              >
                {errors.phone}
              </p>
            )}

            <input
              type="text"
              name="college"
              placeholder="College Name *"
              value={formData.college}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.college && (
              <p
                style={{
                  color: "#ef4444",
                  fontSize: "13px",
                  marginTop: "-10px",
                  marginBottom: "15px",
                }}
              >
                {errors.college}
              </p>
            )}

            <input
              type="text"
              name="skills"
              placeholder="Your Skills"
              value={formData.skills}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.skills && (
              <p
                style={{
                  color: "#ef4444",
                  fontSize: "13px",
                  marginTop: "-10px",
                  marginBottom: "15px",
                }}
              >
                {errors.skills}
              </p>
            )}

            <textarea
              name="coverLetter"
              placeholder="Write your cover letter..."
              value={formData.coverLetter}
              onChange={handleChange}
              style={styles.textarea}
            />
            {errors.coverLetter && (
              <p
                style={{
                  color: "#ef4444",
                  fontSize: "13px",
                  marginTop: "-10px",
                  marginBottom: "15px",
                }}
              >
                {errors.coverLetter}
              </p>
            )}

            {/* Resume Upload */}
            <label style={styles.uploadBox}>
              <input
                type="file"
                hidden
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
              />

              <p style={styles.uploadText}>
                {resumeFile
                  ? `📄 ${resumeFile.name}`
                  : "Click to Upload Resume"}
              </p>
            </label>
            {errors.resume && (
              <p
                style={{
                  color: "#ef4444",
                  fontSize: "13px",
                  marginTop: "-10px",
                  marginBottom: "15px",
                }}
              >
                {errors.resume}
              </p>
            )}

            {/* Buttons */}
            <div style={styles.popupBtns}>
              <button
                style={styles.submitBtn}
                onClick={submitApplication}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>

              <button
  style={styles.cancelBtn}
  onClick={() => {
    setShowForm(false);
    setErrors({});
  }}
>
  Cancel
</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Jobs;
