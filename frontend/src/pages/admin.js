import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Admin({ theme }) {
  const navigate = useNavigate();

  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const [popupMessage, setPopupMessage] = useState("");
  const [showPopupMessage, setShowPopupMessage] = useState(false);

  const isDark = theme === "dark";

  // =========================================
  // FETCH APPLICATIONS
  // =========================================
  const fetchApps = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/applications/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setApps(response.data);
    } catch (err) {
      console.log("Fetch Apps Error:", err);

      if (err.response?.status === 401) {
        localStorage.clear();

        alert("⚠ Session Expired");

        navigate("/login");
      } else {
        alert("❌ Failed To Load Applications");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // =========================================
  // ADMIN SECURITY CHECK
  // =========================================
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    console.log("ROLE:", role);

    if (!token) {
      alert("⚠ Please Login First");
      navigate("/login");
      return;
    }

    if (role !== "admin") {
      alert("⚠ Access Denied. Admin Only");
      navigate("/");
      return;
    }

    fetchApps();
  }, [fetchApps, navigate]);

  useEffect(() => {
    if (showDetails) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showDetails]);

  // =========================================
  // UPDATE APPLICATION STATUS
  // =========================================
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/applications/status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setApps((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status } : app)),
      );

      if (selectedApp && selectedApp._id === id) {
        setSelectedApp({
          ...selectedApp,
          status,
        });
      }

      setPopupMessage(`✅ Application ${status}`);
      setShowPopupMessage(true);

      setTimeout(() => {
        setShowPopupMessage(false);
      }, 3000);
    } catch (err) {
      console.log("Update Status Error:", err);

      setPopupMessage("❌ Failed To Update Status");
      setShowPopupMessage(true);

      setTimeout(() => {
        setShowPopupMessage(false);
      }, 3000);
    }
  };

  // =========================================
  // OPEN DETAILS POPUP
  // =========================================
  const openDetails = (app) => {
    setSelectedApp(app);
    setShowDetails(true);
  };

  // =========================================
  // CLOSE POPUP
  // =========================================
  const closeDetails = () => {
    setSelectedApp(null);
    setShowDetails(false);
  };

  // =========================================
  // FORMAT DATE
  // =========================================
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN");
  };

  // =========================================
  // FORMAT TIME
  // =========================================
  const formatTime = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // =========================================
  // STATUS COLORS
  // =========================================
  const getStatusColor = (status) => {
    if (status === "Accepted") return "#16a34a";

    if (status === "Rejected") return "#dc2626";

    return "#facc15";
  };

  // =========================================
  // VIEW RESUME
  // =========================================
  const viewResume = (resumeURL) => {
    if (!resumeURL) {
      alert("Resume Not Uploaded");
      return;
    }

    window.open(resumeURL, "_blank");
  };

  // =========================================
  // STYLES
  // =========================================
  const styles = {
    page: {
      padding: window.innerWidth < 768 ? "20px" : "50px",
      minHeight: "100vh",
      background: isDark ? "#0f0f0f" : "#f5f5f5",
      color: isDark ? "#fff" : "#111",
      fontFamily: "Segoe UI",
    },

    title: {
      textAlign: "center",
      fontSize: window.innerWidth < 768 ? "34px" : "46px",
      marginBottom: "10px",
      fontWeight: "700",
    },

    subtitle: {
      textAlign: "center",
      color: isDark ? "#aaa" : "#666",
      marginBottom: "45px",
    },

    gold: {
      color: "#d4af37",
    },

    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
      gap: "20px",
      marginBottom: "40px",
    },

    statCard: {
      background: isDark ? "#171717" : "#fff",
      padding: "25px",
      borderRadius: "18px",
      textAlign: "center",
    },

    statNumber: {
      fontSize: "34px",
      color: "#d4af37",
      fontWeight: "700",
    },

    statText: {
      marginTop: "8px",
      color: isDark ? "#aaa" : "#555",
    },

    applicationList: {
      display: "flex",
      flexDirection: "column",
      gap: "25px",
    },

    card: {
      background: isDark ? "#171717" : "#fff",
      borderRadius: "20px",
      padding: "25px",
    },

    topRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "10px",
    },

    jobTitle: {
      fontSize: window.innerWidth < 768 ? "22px" : "28px",
      fontWeight: "700",
    },

    company: {
      color: "#d4af37",
      marginTop: "5px",
    },

    status: {
      padding: "8px 15px",
      borderRadius: "20px",
      color: "#fff",
      fontWeight: "700",
      fontSize: "13px",
    },

    infoGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
      gap: "12px",
      marginTop: "20px",
    },

    info: {
      color: isDark ? "#ddd" : "#444",
    },

    buttonWrap: {
      display: "flex",
      gap: "12px",
      marginTop: "25px",
      flexWrap: "wrap",
    },

    detailsBtn: {
      padding: "12px 18px",
      border: "none",
      borderRadius: "10px",
      background: "#d4af37",
      cursor: "pointer",
      fontWeight: "700",
    },

    acceptBtn: {
      padding: "12px 18px",
      border: "none",
      borderRadius: "10px",
      background: "#16a34a",
      color: "#fff",
      cursor: "pointer",
      fontWeight: "700",
    },

    rejectBtn: {
      padding: "12px 18px",
      border: "none",
      borderRadius: "10px",
      background: "#dc2626",
      color: "#fff",
      cursor: "pointer",
      fontWeight: "700",
    },

    resumeBtn: {
      padding: "12px 18px",
      border: "none",
      borderRadius: "10px",
      background: "#2563eb",
      color: "#fff",
      cursor: "pointer",
      fontWeight: "700",
    },

    loading: {
      textAlign: "center",
      marginTop: "60px",
      fontSize: "18px",
    },

    empty: {
      textAlign: "center",
      marginTop: "60px",
      fontSize: "18px",
    },

    // =========================================
    // POPUP STYLES
    // =========================================
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      background: "rgba(0,0,0,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
      backdropFilter: "blur(5px)",
      overflowY: "auto",
      padding: "20px",
    },

    popup: {
      width: "95%",
      maxWidth: "650px",
      maxHeight: "90vh",
      overflowY: "auto",
      background: isDark ? "#171717" : "#fff",
      borderRadius: "25px",
      padding: window.innerWidth < 768 ? "22px" : "35px",
      boxShadow: "0 0 30px rgba(0,0,0,0.4)",
      border: "1px solid rgba(212,175,55,0.2)",
    },

    popupTitle: {
      fontSize: window.innerWidth < 768 ? "26px" : "32px",
      marginBottom: "10px",
      color: "#d4af37",
      fontWeight: "700",
    },

    popupSub: {
      color: isDark ? "#aaa" : "#666",
      marginBottom: "25px",
    },

    detailRow: {
      marginBottom: "18px",
      paddingBottom: "12px",
      borderBottom: isDark ? "1px solid #2a2a2a" : "1px solid #eee",
    },

    detailLabel: {
      color: "#d4af37",
      fontWeight: "700",
      marginBottom: "5px",
      fontSize: "15px",
    },

    detailValue: {
      fontSize: "16px",
      color: isDark ? "#fff" : "#222",
      wordBreak: "break-word",
    },

    closeBtn: {
      marginTop: "25px",
      width: "100%",
      padding: "14px",
      border: "none",
      borderRadius: "12px",
      background: "#d4af37",
      color: "#111",
      fontWeight: "700",
      fontSize: "16px",
      cursor: "pointer",
      transition: "0.3s",
    },
  };

  return (
    <div style={styles.page}>
      {/* Popup Message */}
      {showPopupMessage && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            background: popupMessage.includes("Failed") ? "#dc2626" : "#16a34a",
            color: "#fff",
            padding: "15px 22px",
            borderRadius: "10px",
            zIndex: 9999,
          }}
        >
          {popupMessage}
        </div>
      )}

      {/* DETAILS POPUP */}
      {showDetails && selectedApp && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <h2 style={styles.popupTitle}>Application Details</h2>

            <p style={styles.popupSub}>Complete information of applicant</p>

            <div style={styles.detailRow}>
              <div style={styles.detailLabel}>Applicant Name</div>
              <div style={styles.detailValue}>{selectedApp.userName}</div>
            </div>

            <div style={styles.detailRow}>
              <div style={styles.detailLabel}>Email</div>
              <div style={styles.detailValue}>{selectedApp.userEmail}</div>
            </div>

            <div style={styles.detailRow}>
              <div style={styles.detailLabel}>Phone</div>
              <div style={styles.detailValue}>{selectedApp.phone}</div>
            </div>

            <div style={styles.detailRow}>
              <div style={styles.detailLabel}>College</div>
              <div style={styles.detailValue}>{selectedApp.college}</div>
            </div>

            <div style={styles.detailRow}>
              <div style={styles.detailLabel}>Job Title</div>
              <div style={styles.detailValue}>{selectedApp.jobTitle}</div>
            </div>

            <div style={styles.detailRow}>
              <div style={styles.detailLabel}>Company</div>
              <div style={styles.detailValue}>{selectedApp.company}</div>
            </div>

            <div style={styles.detailRow}>
              <div style={styles.detailLabel}>Status</div>
              <div style={styles.detailValue}>
                {selectedApp.status || "Pending"}
              </div>
            </div>

            <div style={styles.detailRow}>
              <div style={styles.detailLabel}>Applied Date</div>
              <div style={styles.detailValue}>
                {formatDate(selectedApp.createdAt)}
              </div>
            </div>

            <div style={styles.detailRow}>
              <div style={styles.detailLabel}>Applied Time</div>
              <div style={styles.detailValue}>
                {formatTime(selectedApp.createdAt)}
              </div>
            </div>

            <button style={styles.closeBtn} onClick={closeDetails}>
              Close
            </button>
          </div>
        </div>
      )}

      <h1 style={styles.title}>
        <span style={styles.gold}>Admin</span> Dashboard
      </h1>

      <p style={styles.subtitle}>
        Manage internship applications professionally
      </p>

      {/* Stats */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>{apps.length}</h2>
          <p style={styles.statText}>Total Applications</p>
        </div>

        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>
            {apps.filter((a) => a.status === "Accepted").length}
          </h2>
          <p style={styles.statText}>Accepted</p>
        </div>

        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>
            {apps.filter((a) => a.status === "Pending").length}
          </h2>
          <p style={styles.statText}>Pending</p>
        </div>

        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>
            {apps.filter((a) => a.status === "Rejected").length}
          </h2>
          <p style={styles.statText}>Rejected</p>
        </div>
      </div>

      {/* Applications */}
      {loading ? (
        <p style={styles.loading}>Loading Applications...</p>
      ) : apps.length === 0 ? (
        <p style={styles.empty}>No Applications Found</p>
      ) : (
        <div style={styles.applicationList}>
          {apps.map((app) => (
            <div key={app._id} style={styles.card}>
              <div style={styles.topRow}>
                <div>
                  <h2 style={styles.jobTitle}>{app.jobTitle}</h2>

                  <p style={styles.company}>{app.company}</p>
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

              <div style={styles.infoGrid}>
                <p style={styles.info}>👤 {app.userName}</p>

                <p style={styles.info}>📧 {app.userEmail}</p>

                <p style={styles.info}>📞 {app.phone}</p>

                <p style={styles.info}>🎓 {app.college}</p>

                <p style={styles.info}>📅 {formatDate(app.createdAt)}</p>
              </div>

              <div style={styles.buttonWrap}>
                <button
                  style={styles.detailsBtn}
                  onClick={() => openDetails(app)}
                >
                  View Details
                </button>

                <button
                  style={styles.acceptBtn}
                  onClick={() => updateStatus(app._id, "Accepted")}
                >
                  Accept
                </button>

                <button
                  style={styles.rejectBtn}
                  onClick={() => updateStatus(app._id, "Rejected")}
                >
                  Reject
                </button>

                {app.resumeURL && (
                  <button
                    style={styles.resumeBtn}
                    onClick={() => viewResume(app.resumeURL)}
                  >
                    View Resume
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Admin;
