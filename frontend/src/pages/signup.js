import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup({ theme }) {
  const navigate = useNavigate();

  const isDark = theme === "dark";

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/signup", user);

      alert("Account Created Successfully");

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup Failed");
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
      transition: "0.3s ease",

      // RESPONSIVE
      boxSizing: "border-box",
    },

    card: {
      width: "100%",
      maxWidth: "480px",
      background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.9)",
      border: isDark ? "1px solid rgba(212,175,55,0.25)" : "1px solid #ddd",
      borderRadius: "22px",
      padding: window.innerWidth < 768 ? "28px" : "42px",
      backdropFilter: "blur(10px)",
      boxShadow: isDark
        ? "0 20px 50px rgba(0,0,0,0.35)"
        : "0 10px 30px rgba(0,0,0,0.08)",
      transition: "0.3s ease",

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
      fontSize: window.innerWidth < 768 ? "30px" : "36px",
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
      transition: "0.3s ease",
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
      <div style={styles.card}>
        <p style={styles.tag}>JOIN THE ELITE</p>

        <h1 style={styles.title}>
          Create Your <span style={styles.gold}>InternHub</span> Account
        </h1>

        <p style={styles.sub}>
          Unlock premium internships, build your future, and join ambitious
          talent.
        </p>

        <input
          type="text"
          name="name"
          placeholder="Enter Full Name"
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email Address"
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Create Password"
          onChange={handleChange}
          style={styles.input}
        />

        <button onClick={handleSignup} style={styles.button}>
          Create Account
        </button>

        <p style={styles.bottom}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;


