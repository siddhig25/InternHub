import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Applications({ theme }) {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showDetails, setShowDetails] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const navigate = useNavigate();

  const isDark = theme === "dark";

  // ✅ CHECK LOGIN + FETCH APPLICATIONS
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    // 🔥 PROTECTED PAGE
    if (!token || !email) {
      alert("⚠ Please Login First");
      navigate("/login");
      return;
    }

    fetchApplications();
  }, [navigate]);

  // ✅ FETCH APPLICATIONS
  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

      const res = await axios.get(
        `http://localhost:5000/api/applications?email=${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setApps(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);

      // 🔥 INVALID TOKEN
      if (err.response?.status === 401) {
        localStorage.clear();
        alert("⚠ Session Expired. Please Login Again");
        navigate("/login");
      }

      setLoading(false);
    }
  };

  // ✅ STATUS COLORS
  const getStatusColor = (status) => {
    if (status === "Accepted") return "#22c55e";

    if (status === "Rejected") return "#ef4444";

    return "#facc15";
  };

  // ✅ FORMAT DATE
  const formatDate = (date) => {
    const newDate = new Date(date);

    return newDate.toLocaleDateString("en-GB");
  };

  // ✅ FORMAT TIME
  const formatTime = (date) => {
    const newDate = new Date(date);

    return newDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ✅ OPEN DETAILS
  const openDetails = (app) => {
    setSelectedApp(app);
    setShowDetails(true);
  };

  const styles = {
    page: {
      minHeight: "100vh",
      padding: window.innerWidth <= 768 ? "25px 15px" : "50px",
      background: isDark ? "#0f0f0f" : "#f5f5f5",
      color: isDark ? "white" : "#111",
      fontFamily: "Segoe UI",
    },

    title: {
      textAlign: "center",
      fontSize: window.innerWidth <= 768 ? "32px" : "42px",
      marginBottom: "10px",
      fontWeight: "700",
      lineHeight: "1.3",
    },

    subtitle: {
      textAlign: "center",
      color: isDark ? "#aaa" : "#666",
      marginBottom: window.innerWidth <= 768 ? "30px" : "40px",
      fontSize: window.innerWidth <= 768 ? "14px" : "16px",
      lineHeight: "1.6",
      padding: window.innerWidth <= 768 ? "0 10px" : "0",
    },

    gold: {
      color: "#d4af37",
    },

    grid: {
      display: "grid",
      gridTemplateColumns:
        window.innerWidth <= 768 ? "1fr" : "repeat(auto-fit,minmax(340px,1fr))",
      gap: window.innerWidth <= 768 ? "18px" : "24px",
    },

    card: {
      background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
      padding: window.innerWidth <= 768 ? "18px" : "24px",
      borderRadius: "18px",
      border: isDark ? "1px solid rgba(212,175,55,0.2)" : "1px solid #ddd",
      boxShadow: isDark ? "none" : "0 4px 12px rgba(0,0,0,0.08)",
      transition: "0.3s ease",
    },

    topRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: window.innerWidth <= 768 ? "flex-start" : "center",
      marginBottom: "12px",
      flexWrap: "wrap",
      gap: "10px",
      flexDirection: window.innerWidth <= 768 ? "column" : "row",
    },

    statusBadge: {
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: window.innerWidth <= 768 ? "12px" : "13px",
      fontWeight: "600",
      color: "#fff",
      alignSelf: window.innerWidth <= 768 ? "flex-start" : "center",
    },

    jobTitle: {
      fontSize: window.innerWidth <= 768 ? "20px" : "24px",
      marginBottom: "6px",
      fontWeight: "700",
      lineHeight: "1.4",
    },

    company: {
      color: "#d4af37",
      marginBottom: "14px",
      fontWeight: "600",
      fontSize: window.innerWidth <= 768 ? "15px" : "16px",
    },

    info: {
      color: isDark ? "#d1d5db" : "#444",
      fontSize: window.innerWidth <= 768 ? "13px" : "14px",
      marginBottom: "10px",
      lineHeight: "1.7",
      wordBreak: "break-word",
    },

    divider: {
      border: "none",
      borderTop: isDark
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid #e5e5e5",
      margin: "18px 0",
    },

    footer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: window.innerWidth <= 768 ? "stretch" : "center",
      flexWrap: "wrap",
      gap: "12px",
      flexDirection: window.innerWidth <= 768 ? "column" : "row",
    },

    appliedDate: {
      color: isDark ? "#9ca3af" : "#666",
      fontSize: "13px",
    },

    viewBtn: {
      padding: window.innerWidth <= 768 ? "12px" : "10px 16px",
      border: "none",
      borderRadius: "10px",
      background: "#d4af37",
      color: "#111",
      fontWeight: "600",
      cursor: "pointer",
      width: window.innerWidth <= 768 ? "100%" : "auto",
    },

    empty: {
      textAlign: "center",
      color: isDark ? "#aaa" : "#666",
      fontSize: "18px",
      marginTop: "40px",
    },

    loading: {
      textAlign: "center",
      color: isDark ? "#aaa" : "#666",
      fontSize: "18px",
      marginTop: "40px",
    },

    statsBox: {
      display: "grid",
      gridTemplateColumns:
        window.innerWidth <= 768
          ? "1fr 1fr"
          : "repeat(auto-fit,minmax(180px,1fr))",
      gap: window.innerWidth <= 768 ? "15px" : "20px",
      marginBottom: "40px",
    },

    statCard: {
      background: isDark ? "#171717" : "#fff",
      padding: window.innerWidth <= 768 ? "18px" : "22px",
      borderRadius: "16px",
      border: isDark ? "1px solid #262626" : "1px solid #ddd",
      textAlign: "center",
    },

    statNumber: {
      fontSize: window.innerWidth <= 768 ? "24px" : "30px",
      color: "#d4af37",
      fontWeight: "700",
      marginBottom: "8px",
    },

    statText: {
      color: isDark ? "#ccc" : "#555",
      fontSize: window.innerWidth <= 768 ? "12px" : "14px",
    },

    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      padding: window.innerWidth <= 768 ? "12px" : "20px",
    },

    popup: {
      width: "100%",
      maxWidth: "650px",
      background: isDark ? "#171717" : "#ffffff",
      padding: window.innerWidth <= 768 ? "20px" : "30px",
      borderRadius: "20px",
      border: "1px solid rgba(212,175,55,0.2)",
      maxHeight: "90vh",
      overflowY: "auto",
    },

    popupTitle: {
      fontSize: window.innerWidth <= 768 ? "24px" : "28px",
      marginBottom: "10px",
      fontWeight: "700",
      lineHeight: "1.4",
    },

    popupCompany: {
      color: "#d4af37",
      marginBottom: "20px",
      fontWeight: "600",
      fontSize: window.innerWidth <= 768 ? "15px" : "16px",
    },

    closeBtn: {
      width: "100%",
      padding: "12px",
      background: "#d4af37",
      border: "none",
      borderRadius: "10px",
      fontWeight: "700",
      cursor: "pointer",
      marginTop: "20px",
      fontSize: window.innerWidth <= 768 ? "14px" : "15px",
    },
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>
        My <span style={styles.gold}>Applications</span>
      </h1>

      <p style={styles.subtitle}>
        Track your internship applications and recruitment progress
      </p>

      {/* ✅ STATS */}
      <div style={styles.statsBox}>
        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>{apps.length}</h2>
          <p style={styles.statText}>Applications Sent</p>
        </div>

        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>
            {apps.filter((app) => app.status === "Accepted").length}
          </h2>
          <p style={styles.statText}>Accepted</p>
        </div>

        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>
            {apps.filter((app) => app.status === "Pending").length}
          </h2>
          <p style={styles.statText}>Pending</p>
        </div>

        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>
            {apps.filter((app) => app.status === "Rejected").length}
          </h2>
          <p style={styles.statText}>Rejected</p>
        </div>
      </div>

      {/* ✅ APPLICATIONS */}
      {loading ? (
        <p style={styles.loading}>Loading applications...</p>
      ) : apps.length === 0 ? (
        <p style={styles.empty}>No applications submitted yet 🚀</p>
      ) : (
        <div style={styles.grid}>
          {apps.map((app) => (
            <div key={app._id} style={styles.card}>
              <div style={styles.topRow}>
                <h2 style={styles.jobTitle}>{app.jobTitle}</h2>

                <span
                  style={{
                    ...styles.statusBadge,
                    background: getStatusColor(app.status),
                  }}
                >
                  {app.status || "Pending"}
                </span>
              </div>

              <p style={styles.company}>{app.company}</p>

              <p style={styles.info}>📍 {app.location}</p>

              <p style={styles.info}>💼 {app.type}</p>

              <p style={styles.info}>💰 {app.salary}</p>

              <p style={styles.info}>⏳ {app.duration}</p>

              <p style={styles.info}>
                🛠 Skills: {app.skills || "Not specified"}
              </p>

              <hr style={styles.divider} />

              <div style={styles.footer}>
                <p style={styles.appliedDate}>
                  📅 {formatDate(app.createdAt || new Date())}
                </p>

                <button style={styles.viewBtn} onClick={() => openDetails(app)}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ DETAILS POPUP */}
      {showDetails && selectedApp && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <h2 style={styles.popupTitle}>{selectedApp.jobTitle}</h2>

            <p style={styles.popupCompany}>{selectedApp.company}</p>

            <p style={styles.info}>👤 Applicant: {selectedApp.userName}</p>

            <p style={styles.info}>📧 Email: {selectedApp.userEmail}</p>

            <p style={styles.info}>📞 Phone: {selectedApp.phone}</p>

            <p style={styles.info}>🎓 College: {selectedApp.college}</p>

            <p style={styles.info}>📍 Location: {selectedApp.location}</p>

            <p style={styles.info}>💼 Type: {selectedApp.type}</p>

            <p style={styles.info}>💰 Salary: {selectedApp.salary}</p>

            <p style={styles.info}>⏳ Duration: {selectedApp.duration}</p>

            <p style={styles.info}>🛠 Skills Required: {selectedApp.skills}</p>

            <p style={styles.info}>📄 Resume: {selectedApp.resumeName}</p>

            <p style={styles.info}>
              📝 Cover Letter:
              <br />
              {selectedApp.coverLetter || "No cover letter"}
            </p>

            <p style={styles.info}>
              📅 Applied On: {formatDate(selectedApp.createdAt || new Date())}
            </p>

            <p style={styles.info}>
              🕒 Time: {formatTime(selectedApp.createdAt || new Date())}
            </p>

            <button
              style={styles.closeBtn}
              onClick={() => setShowDetails(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Applications;
