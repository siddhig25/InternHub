/*import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar({ theme, toggleTheme }) {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [role, setRole] = useState("");

  const isDark = theme === "dark";

  // =====================================
  // CHECK LOGIN + ROLE
  // =====================================
  useEffect(() => {
    const token = localStorage.getItem("token");

    const userRole = localStorage.getItem("role");

    setIsLoggedIn(!!token);

    setRole(userRole || "");
  }, []);

  // =====================================
  // LOGOUT
  // =====================================
  const logout = () => {
    localStorage.clear();

    alert("✅ Logged out successfully");

    window.location.href = "/login";
  };

  // =====================================
  // STYLES
  // =====================================
  const styles = {
    navbar: {
      width: "100%",
      padding: "18px 45px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: isDark
        ? "linear-gradient(135deg,#111,#181818)"
        : "linear-gradient(135deg,#ffffff,#f8f8f8)",
      borderBottom: isDark
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid #ddd",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      backdropFilter: "blur(10px)",
      boxSizing: "border-box",
    },

    left: {
      display: "flex",
      alignItems: "center",
      gap: "35px",
    },

    logo: {
      fontSize: "30px",
      fontWeight: "700",
      color: "#d4af37",
      textDecoration: "none",
      letterSpacing: "1px",
    },

    links: {
      display: "flex",
      alignItems: "center",
      gap: "22px",
      flexWrap: "wrap",
    },

    link: {
      textDecoration: "none",
      color: isDark ? "#f5f5f5" : "#111",
      fontWeight: "600",
      fontSize: "15px",
      transition: "0.3s",
    },

    right: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },

    themeBtn: {
      padding: "10px 16px",
      borderRadius: "12px",
      border: isDark
        ? "1px solid rgba(255,255,255,0.1)"
        : "1px solid #ddd",
      background: isDark ? "#1f1f1f" : "#fff",
      color: isDark ? "#fff" : "#111",
      cursor: "pointer",
      fontWeight: "600",
    },

    authBtn: {
      padding: "10px 18px",
      border: "none",
      borderRadius: "12px",
      background: "#d4af37",
      color: "#111",
      cursor: "pointer",
      fontWeight: "700",
      boxShadow: "0 4px 14px rgba(212,175,55,0.25)",
    },
  };

  return (
    <nav style={styles.navbar}>
      {/* LEFT *}
      <div style={styles.left}>
        <Link to="/" style={styles.logo}>
          CareerConnect
        </Link>

        <div style={styles.links}>
          {/* HOME *}
          <Link
            to="/"
            style={styles.link}
            onMouseOver={(e) => (e.target.style.color = "#d4af37")}
            onMouseOut={(e) =>
              (e.target.style.color = isDark ? "#f5f5f5" : "#111")
            }
          >
            Home
          </Link>

          {/* JOBS *}
          <Link
            to="/jobs"
            style={styles.link}
            onMouseOver={(e) => (e.target.style.color = "#d4af37")}
            onMouseOut={(e) =>
              (e.target.style.color = isDark ? "#f5f5f5" : "#111")
            }
          >
            Jobs
          </Link>

          {/* DASHBOARD *}
          {isLoggedIn && (
            <Link
              to="/dashboard"
              style={styles.link}
              onMouseOver={(e) => (e.target.style.color = "#d4af37")}
              onMouseOut={(e) =>
                (e.target.style.color = isDark ? "#f5f5f5" : "#111")
              }
            >
              Dashboard
            </Link>
          )}

          {/* APPLICATIONS *}
          {isLoggedIn && (
            <Link
              to="/applications"
              style={styles.link}
              onMouseOver={(e) => (e.target.style.color = "#d4af37")}
              onMouseOut={(e) =>
                (e.target.style.color = isDark ? "#f5f5f5" : "#111")
              }
            >
              Applications
            </Link>
          )}

          {/* ADMIN ONLY *}
          {isLoggedIn && role === "admin" && (
            <Link
              to="/admin"
              style={styles.link}
              onMouseOver={(e) => (e.target.style.color = "#d4af37")}
              onMouseOut={(e) =>
                (e.target.style.color = isDark ? "#f5f5f5" : "#111")
              }
            >
              Admin
            </Link>
          )}
        </div>
      </div>

      {/* RIGHT *}
      <div style={styles.right}>
        {/* THEME BUTTON *}
        <button style={styles.themeBtn} onClick={toggleTheme}>
          {isDark ? "☀ Light" : "🌙 Dark"}
        </button>

        {/* LOGIN / LOGOUT *}
        {!isLoggedIn ? (
          <>
            <Link to="/login">
              <button style={styles.authBtn}>Login</button>
            </Link>

            <Link to="/signup">
              <button style={styles.authBtn}>Signup</button>
            </Link>
          </>
        ) : (
          <button style={styles.authBtn} onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;*/
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar({ theme, toggleTheme }) {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [role, setRole] = useState("");

  const isDark = theme === "dark";

  // =====================================
  // CHECK SCREEN SIZE
  // =====================================
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  // =====================================
  // CHECK LOGIN + ROLE
  // =====================================
  useEffect(() => {
    const token = localStorage.getItem("token");

    const userRole = localStorage.getItem("role");

    setIsLoggedIn(!!token);

    setRole(userRole || "");
  }, []);

  // =====================================
  // LOGOUT
  // =====================================
  const logout = () => {
    localStorage.clear();

    alert("✅ Logged out successfully");

    window.location.href = "/login";
  };

  // =====================================
  // STYLES
  // =====================================
  const styles = {
    navbar: {
      width: "100%",
      padding: isMobile ? "15px 20px" : "18px 45px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: isMobile ? "flex-start" : "center",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? "18px" : "0",
      background: isDark
        ? "linear-gradient(135deg,#111,#181818)"
        : "linear-gradient(135deg,#ffffff,#f8f8f8)",
      borderBottom: isDark
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid #ddd",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      backdropFilter: "blur(10px)",
      boxSizing: "border-box",
    },

    left: {
      display: "flex",
      alignItems: isMobile ? "flex-start" : "center",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? "18px" : "35px",
      width: "100%",
    },

    logo: {
      fontSize: isMobile ? "26px" : "30px",
      fontWeight: "700",
      color: "#d4af37",
      textDecoration: "none",
      letterSpacing: "1px",
    },

    links: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "14px" : "22px",
      flexWrap: "wrap",
      width: "100%",
    },

    link: {
      textDecoration: "none",
      color: isDark ? "#f5f5f5" : "#111",
      fontWeight: "600",
      fontSize: isMobile ? "14px" : "15px",
      transition: "0.3s",
    },

    right: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      flexWrap: "wrap",
      width: isMobile ? "100%" : "auto",
    },

    themeBtn: {
      padding: isMobile ? "9px 14px" : "10px 16px",
      borderRadius: "12px",
      border: isDark
        ? "1px solid rgba(255,255,255,0.1)"
        : "1px solid #ddd",
      background: isDark ? "#1f1f1f" : "#fff",
      color: isDark ? "#fff" : "#111",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: isMobile ? "13px" : "14px",
    },

    authBtn: {
      padding: isMobile ? "9px 16px" : "10px 18px",
      border: "none",
      borderRadius: "12px",
      background: "#d4af37",
      color: "#111",
      cursor: "pointer",
      fontWeight: "700",
      boxShadow: "0 4px 14px rgba(212,175,55,0.25)",
      fontSize: isMobile ? "13px" : "14px",
    },
  };

  return (
    <nav style={styles.navbar}>
      {/* LEFT */}
      <div style={styles.left}>
        <Link to="/" style={styles.logo}>
          InternHub
        </Link>

        <div style={styles.links}>
          {/* HOME */}
          <Link
            to="/"
            style={styles.link}
            onMouseOver={(e) => (e.target.style.color = "#d4af37")}
            onMouseOut={(e) =>
              (e.target.style.color = isDark ? "#f5f5f5" : "#111")
            }
          >
            Home
          </Link>

          {/* JOBS */}
          <Link
            to="/jobs"
            style={styles.link}
            onMouseOver={(e) => (e.target.style.color = "#d4af37")}
            onMouseOut={(e) =>
              (e.target.style.color = isDark ? "#f5f5f5" : "#111")
            }
          >
            Jobs
          </Link>

          {/* DASHBOARD */}
          {isLoggedIn && (
            <Link
              to="/dashboard"
              style={styles.link}
              onMouseOver={(e) => (e.target.style.color = "#d4af37")}
              onMouseOut={(e) =>
                (e.target.style.color = isDark ? "#f5f5f5" : "#111")
              }
            >
              Dashboard
            </Link>
          )}

          {/* APPLICATIONS */}
          {isLoggedIn && (
            <Link
              to="/applications"
              style={styles.link}
              onMouseOver={(e) => (e.target.style.color = "#d4af37")}
              onMouseOut={(e) =>
                (e.target.style.color = isDark ? "#f5f5f5" : "#111")
              }
            >
              Applications
            </Link>
          )}

          {/* ADMIN ONLY */}
          {isLoggedIn && role === "admin" && (
            <Link
              to="/admin"
              style={styles.link}
              onMouseOver={(e) => (e.target.style.color = "#d4af37")}
              onMouseOut={(e) =>
                (e.target.style.color = isDark ? "#f5f5f5" : "#111")
              }
            >
              Admin
            </Link>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div style={styles.right}>
        {/* THEME BUTTON */}
        <button style={styles.themeBtn} onClick={toggleTheme}>
          {isDark ? "☀ Light" : "🌙 Dark"}
        </button>

        {/* LOGIN / LOGOUT */}
        {!isLoggedIn ? (
          <>
            <Link to="/login">
              <button style={styles.authBtn}>Login</button>
            </Link>

            <Link to="/signup">
              <button style={styles.authBtn}>Signup</button>
            </Link>
          </>
        ) : (
          <button style={styles.authBtn} onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
