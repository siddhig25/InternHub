import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard({ theme }) {
  const navigate = useNavigate();

  const [name, setName] = useState("User");
  const [currentTime, setCurrentTime] = useState("");

  // RESUME STATES
  const [resumeName, setResumeName] = useState("No Resume Uploaded");
  const [resumeFileURL, setResumeFileURL] = useState("");

  // OTHER STATES
  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [notificationsList, setNotificationsList] = useState([]);
  const [loading, setLoading] = useState(true);

  //  POPUP STATES
  const [showPopup, setShowPopup] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const isDark = theme === "dark";

  //  CHECK LOGIN
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("name");
    const email = localStorage.getItem("email");

    //  ONLY LOGGED IN USERS
    if (!token) {
      navigate("/login");
      return;
    }

    setName(username || "User");

    //  LOAD SAVED RESUME
    const savedResumeName = localStorage.getItem("resumeName");
    const savedResumeURL = localStorage.getItem("resumeURL");

    if (savedResumeName) {
      setResumeName(savedResumeName);
    }

    if (savedResumeURL) {
      setResumeFileURL(savedResumeURL);
    }

    //  LIVE CLOCK
    updateTime();

    const interval = setInterval(updateTime, 1000);

    //  FETCH APPLICATIONS
    fetchApplications(email);

    //  DEFAULT NOTIFICATIONS
    setNotificationsList([
      " New AI Internship added",
      " Complete your profile to boost visibility",
      " Keep your resume updated",
    ]);

    return () => clearInterval(interval);
  }, [navigate]);

  //  FETCH APPLICATIONS
  const fetchApplications = async (email) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/applications?email=${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setApplications(res.data);

      setLoading(false);
    } catch (err) {
      console.log(err);

      setLoading(false);
    }
  };

  //  CLOCK
  const updateTime = () => {
    const now = new Date();

    setCurrentTime(
      now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    );
  };

  //  LOGOUT
  const logout = () => {
    localStorage.clear();

    alert("Logged out successfully");

    navigate("/login");

    window.location.reload();
  };

  

  // VIEW DETAILS POPUP
  const viewApplication = (jobTitle) => {
    const selectedJob = applications.find((app) => app.jobTitle === jobTitle);

    if (!selectedJob) {
      alert("Application details not found");
      return;
    }

    setSelectedApplication(selectedJob);
    setShowPopup(true);
  };

  // UPLOAD RESUME
  const uploadResume = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    //  FILE VALIDATION
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF, DOC and DOCX files are allowed");

      return;
    }

    //  CREATE FILE URL
    const fileURL = URL.createObjectURL(file);

    //  SAVE
    setResumeName(file.name);
    setResumeFileURL(fileURL);

    // STORE IN LOCAL STORAGE
    localStorage.setItem("resumeName", file.name);
    localStorage.setItem("resumeURL", fileURL);

    //  NOTIFICATIONS
    setNotificationsList((prev) => [
      ` Resume uploaded: ${file.name}`,
      ...prev,
    ]);

    alert("Resume uploaded successfully");
  };

  // VIEW RESUME
  const viewResume = () => {
    if (!resumeFileURL) {
      alert("No resume uploaded");

      return;
    }

    window.open(resumeFileURL, "_blank");
  };

  //  DELETE RESUME
  const deleteResume = () => {
    if (!resumeFileURL) {
      alert("No resume uploaded");

      return;
    }

    setResumeName("No Resume Uploaded");
    setResumeFileURL("");

    localStorage.removeItem("resumeName");
    localStorage.removeItem("resumeURL");

    setNotificationsList((prev) => ["ðŸ—‘ï¸ Resume deleted successfully", ...prev]);

    alert("Resume deleted successfully");
  };

  //  REMOVE NOTIFICATION
  const removeNotification = (index) => {
    const updated = [...notificationsList];

    updated.splice(index, 1);

    setNotificationsList(updated);
  };

  //  RECOMMENDED JOBS
  const recommendedJobs = [
    {
      title: "AI/ML Engineer",
      company: "OpenAI",
      type: "Remote  Full Time",
    },

    {
      title: "Backend Developer",
      company: "Microsoft",
      type: "Bangalore  Internship",
    },

    {
      title: "Marketing Intern",
      company: "Amazon",
      type: "Hybrid  Internship",
    },
  ];

  //  STATUS COLORS
  const getStatusColor = (status) => {
    if (status === "Accepted") return "#16a34a";

    if (status === "Rejected") return "#dc2626";

    return "#facc15";
  };

  //  STYLES
  const styles = {
    page: {
      minHeight: "100vh",
      background: isDark
        ? "linear-gradient(135deg,#0f0f0f 0%, #151515 45%, #111111 100%)"
        : "linear-gradient(135deg,#f8f8f8 0%, #ffffff 45%, #f1f1f1 100%)",
      color: isDark ? "white" : "#111",
      padding: window.innerWidth < 768 ? "20px" : "40px",
      fontFamily: "Segoe UI, sans-serif",
    },
    topBar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: window.innerWidth < 768 ? "flex-start" : "center",
      marginBottom: "40px",
      flexWrap: "wrap",
      gap: "20px",
      flexDirection: window.innerWidth < 768 ? "column" : "row",
    },

    title: {
      fontSize: window.innerWidth < 768 ? "34px" : "48px",
      marginBottom: "12px",
      fontWeight: "700",
      lineHeight: "1.3",
    },

    gold: {
      color: "#d4af37",
    },

    topActions: {
      display: "flex",
      gap: "15px",
      alignItems: "center",
      flexWrap: "wrap",
      width: window.innerWidth < 768 ? "100%" : "auto",
    },

    clock: {
      background: isDark ? "#171717" : "#fff",
      padding: "12px 20px",
      borderRadius: "12px",
      border: isDark ? "1px solid rgba(212,175,55,0.2)" : "1px solid #ddd",
      fontWeight: "600",
      color: "#d4af37",
      width: window.innerWidth < 768 ? "100%" : "auto",
      textAlign: "center",
    },

    logoutBtn: {
      padding: "12px 20px",
      borderRadius: "12px",
      border: "none",
      background: "#d4af37",
      color: "#111",
      cursor: "pointer",
      fontWeight: "700",
      width: window.innerWidth < 768 ? "100%" : "auto",
    },

    statsGrid: {
      display: "grid",
      gridTemplateColumns:
        window.innerWidth < 768 ? "1fr" : "repeat(auto-fit,minmax(220px,1fr))",
      gap: "20px",
      marginBottom: "35px",
    },

    statCard: {
      background: isDark ? "rgba(255,255,255,0.04)" : "#fff",
      borderRadius: "22px",
      padding: "28px",
      border: isDark ? "1px solid rgba(212,175,55,0.15)" : "1px solid #ddd",
    },

    statNumber: {
      fontSize: "38px",
      color: "#d4af37",
      marginBottom: "10px",
      fontWeight: "700",
    },

    layout: {
      display: "grid",
      gridTemplateColumns: window.innerWidth < 992 ? "1fr" : "2fr 1fr",
      gap: "25px",
      marginTop: "30px",
    },

    leftSection: {
      display: "flex",
      flexDirection: "column",
      gap: "25px",
    },

    rightSection: {
      display: "flex",
      flexDirection: "column",
      gap: "25px",
    },

    section: {
      background: isDark ? "rgba(255,255,255,0.04)" : "#fff",
      borderRadius: "24px",
      padding: window.innerWidth < 768 ? "20px" : "30px",
      border: isDark ? "1px solid rgba(212,175,55,0.15)" : "1px solid #ddd",
    },

    sectionTitle: {
      fontSize: window.innerWidth < 768 ? "22px" : "28px",
      marginBottom: "25px",
      fontWeight: "700",
    },

    applicationCard: {
      padding: "20px 0",
      borderBottom: isDark ? "1px solid #2a2a2a" : "1px solid #eee",
    },

    applicationTop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: window.innerWidth < 768 ? "flex-start" : "center",
      gap: "15px",
      flexWrap: "wrap",
      flexDirection: window.innerWidth < 768 ? "column" : "row",
    },

    jobTitle: {
      fontSize: window.innerWidth < 768 ? "16px" : "18px",
      marginBottom: "6px",
      fontWeight: "600",
    },

    appButtons: {
      display: "flex",
      gap: "10px",
      marginTop: "15px",
      flexWrap: "wrap",
      flexDirection: window.innerWidth < 768 ? "column" : "row",
    },

    meta: {
      color: isDark ? "#aaa" : "#666",
      fontSize: "14px",
    },

    status: {
      padding: "8px 16px",
      borderRadius: "20px",
      color: "white",
      fontWeight: "600",
      fontSize: "13px",
    },

    appButton: {
      display: "flex",
      gap: "10px",
      marginTop: "15px",
      flexWrap: "wrap",
    },

    smallBtn: {
      padding: "10px 16px",
      border: "none",
      borderRadius: "10px",
      background: "#d4af37",
      color: "#111",
      cursor: "pointer",
      fontWeight: "700",
      width: window.innerWidth < 768 ? "100%" : "auto",
    },

    profileBox: {
      textAlign: "center",
    },

    avatar: {
      width: window.innerWidth < 768 ? "80px" : "95px",
      height: window.innerWidth < 768 ? "80px" : "95px",
      borderRadius: "50%",
      background: "#d4af37",
      color: "#111",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: window.innerWidth < 768 ? "30px" : "36px",
      fontWeight: "700",
      margin: "0 auto 18px",
    },

    profileName: {
      fontSize: window.innerWidth < 768 ? "20px" : "24px",
      marginBottom: "8px",
      fontWeight: "700",
    },

    resumeBtn: {
      width: "100%",
      padding: "14px",
      borderRadius: "12px",
      border: "none",
      background: "#d4af37",
      color: "#111",
      fontWeight: "700",
      cursor: "pointer",
      marginTop: "20px",
    },

    viewResumeBtn: {
      width: "100%",
      padding: "14px",
      borderRadius: "12px",
      border: "none",
      background: "#16a34a",
      color: "white",
      fontWeight: "700",
      cursor: "pointer",
      marginTop: "12px",
    },

    deleteResumeBtn: {
      width: "100%",
      padding: "14px",
      borderRadius: "12px",
      border: "none",
      background: "#dc2626",
      color: "white",
      fontWeight: "700",
      cursor: "pointer",
      marginTop: "12px",
    },

    resumeText: {
      marginTop: "15px",
      fontSize: "14px",
      color: isDark ? "#ccc" : "#444",
      wordBreak: "break-word",
    },

    recommendedCard: {
      padding: "18px",
      borderRadius: "16px",
      background: isDark ? "#171717" : "#f8f8f8",
      marginBottom: "15px",
    },

    applyBtn: {
      marginTop: "14px",
      padding: "10px 18px",
      border: "none",
      borderRadius: "10px",
      background: "#d4af37",
      color: "#111",
      fontWeight: "700",
      cursor: "pointer",
      marginRight: "10px",
      width: window.innerWidth < 768 ? "100%" : "auto",
    },

    notification: {
      background: isDark ? "#171717" : "#f8f8f8",
      padding: "15px",
      borderRadius: "14px",
      marginBottom: "14px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: window.innerWidth < 768 ? "flex-start" : "center",
      flexDirection: window.innerWidth < 768 ? "column" : "row",
      gap: "10px",
    },

    deleteBtn: {
      border: "none",
      background: "#dc2626",
      color: "white",
      padding: "6px 10px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "12px",
    },

    loading: {
      textAlign: "center",
      marginTop: "50px",
      fontSize: "18px",
      color: "#888",
    },

    popupOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
      padding: "20px",
    },

    popupBox: {
      width: "100%",
      maxWidth: "520px",
      background: isDark ? "#171717" : "#fff",
      borderRadius: "24px",
      padding: window.innerWidth < 768 ? "22px" : "35px",
      border: "1px solid rgba(212,175,55,0.2)",
      boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
      animation: "fadeIn 0.3s ease",
    },

    popupTitle: {
      fontSize: window.innerWidth < 768 ? "24px" : "32px",
      marginBottom: "10px",
      color: "#d4af37",
      fontWeight: "700",
    },

    popupCompany: {
      fontSize: "18px",
      marginBottom: "20px",
      color: isDark ? "#ccc" : "#555",
    },

    popupInfo: {
      marginBottom: "14px",
      fontSize: "15px",
      color: isDark ? "#ddd" : "#333",
      lineHeight: "1.7",
    },

    closePopupBtn: {
      marginTop: "25px",
      width: "100%",
      padding: "14px",
      border: "none",
      borderRadius: "12px",
      background: "#d4af37",
      color: "#111",
      fontWeight: "700",
      cursor: "pointer",
      fontSize: "15px",
    },
  };

  return (
    <div style={styles.page}>
      {/* TOP */}
      <section style={styles.topBar}>
        <div>
          <h1 style={styles.title}>
            Welcome Back, <span style={styles.gold}>{name}</span>
          </h1>
        </div>

        <div style={styles.topActions}>
          <div style={styles.clock}>{currentTime}</div>

          <button style={styles.logoutBtn} onClick={logout}>
            Logout
          </button>
        </div>
      </section>

      {/* STATS */}
      <section style={styles.statsGrid}>
        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>{applications.length}</h2>
          <p>Applications Sent</p>
        </div>

        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>
            {applications.filter((app) => app.status === "Accepted").length}
          </h2>

          <p>Accepted</p>
        </div>

        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>{savedJobs.length}</h2>
          <p>Saved Opportunities</p>
        </div>

        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>89%</h2>
          <p>Profile Strength</p>
        </div>
      </section>

      {/* MAIN */}
      <section style={styles.layout}>
        {/* LEFT */}
        <div style={styles.leftSection}>
          {/* APPLICATIONS */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>My Applications</h2>

            {loading ? (
              <p style={styles.loading}>Loading applications...</p>
            ) : applications.length === 0 ? (
              <p>No applications submitted yet ðŸš€</p>
            ) : (
              applications.map((app, index) => (
                <div key={index} style={styles.applicationCard}>
                  <div style={styles.applicationTop}>
                    <div>
                      <h3 style={styles.jobTitle}>{app.jobTitle}</h3>

                      <p style={styles.company}>{app.company}</p>

                      <p style={styles.meta}>{app.location}</p>
                    </div>

                    <span
                      style={{
                        ...styles.status,
                        background: getStatusColor(app.status),
                      }}
                    >
                      {app.status || "Pending"}
                    </span>
                  </div>

                  <div style={styles.appButtons}>
                    <button
                      style={styles.smallBtn}
                      onClick={() => viewApplication(app.jobTitle)}
                    >
                      View Details
                    </button>

                    
                  </div>
                </div>
              ))
            )}
          </div>

          {/* RECOMMENDED */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Recommended Opportunities</h2>

            {recommendedJobs.map((job, index) => (
              <div key={index} style={styles.recommendedCard}>
                <h3 style={styles.jobTitle}>{job.title}</h3>

                <p style={styles.company}>{job.company}</p>

                <p style={styles.meta}>{job.type}</p>

                <button
                  style={styles.applyBtn}
                  onClick={() => navigate("/jobs")}
                >
                  Apply Now
                </button>

                
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div style={styles.rightSection}>
          {/* PROFILE */}
          <div style={styles.section}>
            <div style={styles.profileBox}>
              <div style={styles.avatar}>{name.charAt(0).toUpperCase()}</div>

              <h2 style={styles.profileName}>{name}</h2>

              {/* FILE INPUT */}
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                id="resumeUpload"
                style={{ display: "none" }}
                onChange={uploadResume}
              />

              {/* UPLOAD BUTTON */}
              <button
                style={styles.resumeBtn}
                onClick={() => document.getElementById("resumeUpload").click()}
              >
                Upload Resume
              </button>

              {/* VIEW BUTTON */}
              {resumeFileURL && (
                <button style={styles.viewResumeBtn} onClick={viewResume}>
                  View Resume
                </button>
              )}

              {/* DELETE BUTTON */}
              {resumeFileURL && (
                <button style={styles.deleteResumeBtn} onClick={deleteResume}>
                  Delete Resume
                </button>
              )}

              <p style={styles.resumeText}>{resumeName}</p>
            </div>
          </div>

          {/* NOTIFICATIONS */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Notifications</h2>

            {notificationsList.length === 0 ? (
              <p>No notifications</p>
            ) : (
              notificationsList.map((note, index) => (
                <div key={index} style={styles.notification}>
                  <span>{note}</span>

                  <button
                    style={styles.deleteBtn}
                    onClick={() => removeNotification(index)}
                  >
                    Remove
                  </button>

                  {/*  APPLICATION DETAILS POPUP */}
                  {showPopup && selectedApplication && (
                    <div style={styles.popupOverlay}>
                      <div style={styles.popupBox}>
                        <h2 style={styles.popupTitle}>
                          {selectedApplication.jobTitle}
                        </h2>

                        <p style={styles.popupCompany}>
                          {selectedApplication.company}
                        </p>

                        <p style={styles.popupInfo}>
                           Location: {selectedApplication.location}
                        </p>

                        <p style={styles.popupInfo}>
                          Status:{" "}
                          <span
                            style={{
                              color: getStatusColor(selectedApplication.status),
                              fontWeight: "700",
                            }}
                          >
                            {selectedApplication.status || "Pending"}
                          </span>
                        </p>

                        <p style={styles.popupInfo}>
                           Applicant Email: {selectedApplication.userEmail}
                        </p>

                        <p style={styles.popupInfo}>
                           Applied On:{" "}
                          {new Date(
                            selectedApplication.createdAt,
                          ).toLocaleDateString()}
                        </p>

                        <button
                          style={styles.closePopupBtn}
                          onClick={() => setShowPopup(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;


