import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login({ theme }) {
  const navigate = useNavigate();

  const isDark = theme === "dark";

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // HANDLE INPUT
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // LOGIN
  const handleLogin = async () => {
    try {
      setLoading(true);

      // CLEAR OLD DATA
      localStorage.clear();

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        user,
      );

      // SAVE LOGIN DATA
      localStorage.setItem("token", res.data.token);

      localStorage.setItem("name", res.data.name);

      localStorage.setItem("email", res.data.email);

      localStorage.setItem("role", res.data.role);
      window.dispatchEvent(new Event("login"));

      alert(" Login Successful");

      // ADMIN REDIRECT
    
if (res.data.role === "admin") {
  navigate("/admin");
} else {
  navigate("/dashboard");
}
    } catch (error) {
      console.log(error);

      localStorage.clear();

      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: isDark
        ? "linear-gradient(135deg, #0f0f0f 0%, #171717 50%, #111111 100%)"
        : "linear-gradient(135deg, #f8f8f8 0%, #ffffff 50%, #f1f1f1 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "30px",
      fontFamily: "Segoe UI, sans-serif",

      // RESPONSIVE
      boxSizing: "border-box",
    },

    card: {
      width: "100%",
      maxWidth: "460px",
      background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.9)",
      border: isDark ? "1px solid rgba(212,175,55,0.25)" : "1px solid #ddd",
      borderRadius: "22px",
      padding: "42px",
      backdropFilter: "blur(10px)",
      boxShadow: isDark
        ? "0 20px 50px rgba(0,0,0,0.35)"
        : "0 10px 30px rgba(0,0,0,0.08)",

      // RESPONSIVE
      boxSizing: "border-box",
    },

    tag: {
      color: "#d4af37",
      fontSize: window.innerWidth < 768 ? "11px" : "12px",
      letterSpacing: "2px",
      marginBottom: "14px",
    },

    title: {
      color: isDark ? "#ffffff" : "#111",
      fontSize: window.innerWidth < 768 ? "30px" : "38px",
      lineHeight: "1.2",
      marginBottom: "12px",
    },

    gold: {
      color: "#d4af37",
    },

    sub: {
      color: isDark ? "#bdbdbd" : "#555",
      fontSize: window.innerWidth < 768 ? "14px" : "15px",
      lineHeight: "1.7",
      marginBottom: "28px",
    },

    input: {
      width: "100%",
      padding: window.innerWidth < 768 ? "14px" : "15px",
      marginBottom: "16px",
      borderRadius: "12px",
      border: isDark ? "1px solid #2f2f2f" : "1px solid #ccc",
      backgroundColor: isDark ? "#151515" : "#ffffff",
      color: isDark ? "white" : "#111",
      fontSize: "15px",
      outline: "none",
      boxSizing: "border-box",
    },

    button: {
      width: "100%",
      padding: window.innerWidth < 768 ? "14px" : "15px",
      border: "none",
      borderRadius: "12px",
      backgroundColor: "#d4af37",
      color: "#111",
      fontWeight: "700",
      fontSize: window.innerWidth < 768 ? "15px" : "16px",
      cursor: "pointer",
      marginTop: "6px",
      opacity: loading ? 0.7 : 1,
    },

    bottom: {
      color: isDark ? "#cfcfcf" : "#555",
      textAlign: "center",
      marginTop: "20px",
      fontSize: window.innerWidth < 768 ? "13px" : "14px",
    },

    link: {
      color: "#d4af37",
      textDecoration: "none",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.page}>
      <div
        style={{
          ...styles.card,

          // RESPONSIVE CARD PADDING
          padding: window.innerWidth < 768 ? "28px" : "42px",
        }}
      >
        <p style={styles.tag}>WELCOME BACK</p>

        <h1 style={styles.title}>
          Sign In to <span style={styles.gold}>InternHub</span>
        </h1>

        <p style={styles.sub}>
          Access premium internship opportunities and continue your journey.
        </p>

        <input
          type="email"
          name="email"
          placeholder="Enter Email Address"
          value={user.email}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={user.password}
          onChange={handleChange}
          style={styles.input}
        />

        <button onClick={handleLogin} style={styles.button}>
          {loading ? "Logging In..." : "Login"}
        </button>

        <p style={styles.bottom}>
          New here?{" "}
          <Link to="/signup" style={styles.link}>
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;


