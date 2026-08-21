import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home({ theme }) {
  const navigate = useNavigate();

  const isDark = theme === "dark";

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //  RESPONSIVE STATE
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 768
  );

  //  Check Login Status
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }

    // RESPONSIVE LISTENER
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  //  Smooth Scroll
  const scrollToSection = () => {
    const section = document.getElementById("learn-more");

    section?.scrollIntoView({
      behavior: "smooth",
    });
  };

  //  Protected Apply Flow
  const handleApply = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("âš  Please Login First");
      navigate("/login");
      return;
    }

    navigate("/jobs");
  };

  const styles = {
    page: {
      background: isDark ? "#0f0f0f" : "#f5f5f5",
      color: isDark ? "white" : "#111",
      minHeight: "100vh",
      padding: isMobile ? "25px 18px" : "40px",
      fontFamily: "Segoe UI, sans-serif",
      transition: "0.3s ease",
      overflowX: "hidden",
    },

    hero: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : "repeat(auto-fit,minmax(320px,1fr))",
      gap: isMobile ? "30px" : "40px",
      alignItems: "center",
      marginTop: isMobile ? "20px" : "40px",
    },

    tag: {
      color: "#d4af37",
      letterSpacing: "2px",
      fontSize: isMobile ? "11px" : "13px",
      marginBottom: "15px",
      fontWeight: "600",
    },

    title: {
      fontSize: isMobile ? "38px" : "58px",
      lineHeight: "1.1",
      marginBottom: "22px",
      fontWeight: "700",
    },

    gold: {
      color: "#d4af37",
    },

    desc: {
      color: isDark ? "#d1d5db" : "#444",
      fontSize: isMobile ? "15px" : "18px",
      maxWidth: "620px",
      lineHeight: "1.8",
      marginBottom: "30px",
    },

    btnWrap: {
      display: "flex",
      gap: "15px",
      flexWrap: "wrap",
      flexDirection: isMobile ? "column" : "row",
    },

    primaryBtn: {
      padding: "15px 28px",
      backgroundColor: "#d4af37",
      border: "none",
      borderRadius: "12px",
      fontWeight: "700",
      cursor: "pointer",
      fontSize: "15px",
      width: isMobile ? "100%" : "auto",
    },

    secondaryBtn: {
      padding: "15px 28px",
      backgroundColor: "transparent",
      color: isDark ? "#fff" : "#111",
      border: `1px solid ${
        isDark ? "#555" : "#ccc"
      }`,
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: "600",
      width: isMobile ? "100%" : "auto",
    },

    heroCard: {
      background: isDark
        ? "rgba(255,255,255,0.05)"
        : "rgba(255,255,255,0.9)",
      border: "1px solid rgba(212,175,55,0.3)",
      padding: isMobile ? "25px" : "35px",
      borderRadius: "24px",
      backdropFilter: "blur(10px)",
      transition: "0.3s ease",
      boxShadow: isDark
        ? "none"
        : "0 10px 30px rgba(0,0,0,0.08)",
    },

    cardTitle: {
      color: "#d4af37",
      marginBottom: "14px",
      fontWeight: "600",
    },

    cardRole: {
      fontSize: isMobile ? "24px" : "30px",
      fontWeight: "700",
      marginBottom: "10px",
    },

    cardText: {
      color: isDark ? "#cfcfcf" : "#444",
      marginBottom: "22px",
      lineHeight: "1.7",
      fontSize: isMobile ? "14px" : "16px",
    },

    line: {
      borderColor: isDark ? "#333" : "#ddd",
      marginBottom: "18px",
    },

    cardMini: {
      color: isDark ? "#9ca3af" : "#555",
      marginBottom: "14px",
      fontSize: isMobile ? "14px" : "16px",
    },

    smallBtn: {
      padding: "13px 20px",
      backgroundColor: "#d4af37",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: "700",
      width: "100%",
    },

    stats: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : "repeat(auto-fit,minmax(220px,1fr))",
      gap: "20px",
      marginTop: isMobile ? "50px" : "80px",
    },

    statBox: {
      backgroundColor: isDark
        ? "#171717"
        : "#ffffff",
      padding: isMobile ? "25px" : "30px",
      borderRadius: "20px",
      textAlign: "center",
      border: isDark
        ? "1px solid #262626"
        : "1px solid #ddd",
      boxShadow: isDark
        ? "none"
        : "0 5px 18px rgba(0,0,0,0.08)",
    },

    statNumber: {
      fontSize: isMobile ? "34px" : "42px",
      color: "#d4af37",
      marginBottom: "10px",
    },

    section: {
      marginTop: isMobile ? "60px" : "90px",
    },

    heading: {
      fontSize: isMobile ? "30px" : "38px",
      marginBottom: "30px",
      textAlign: "center",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : "repeat(auto-fit,minmax(280px,1fr))",
      gap: "24px",
    },

    featureCard: {
      backgroundColor: isDark
        ? "#171717"
        : "#ffffff",
      padding: isMobile ? "24px" : "30px",
      borderRadius: "20px",
      border: isDark
        ? "1px solid #262626"
        : "1px solid #ddd",
      boxShadow: isDark
        ? "none"
        : "0 5px 18px rgba(0,0,0,0.08)",
      transition: "0.3s ease",
    },

    featureTitle: {
      marginBottom: "14px",
      color: "#d4af37",
      fontSize: isMobile ? "20px" : "22px",
    },

    featureText: {
      color: isDark ? "#ccc" : "#555",
      lineHeight: "1.7",
      fontSize: isMobile ? "14px" : "16px",
    },

    cta: {
      marginTop: isMobile ? "70px" : "100px",
      background: "#d4af37",
      color: "#111",
      padding: isMobile ? "35px 20px" : "50px",
      borderRadius: "26px",
      textAlign: "center",
    },

    ctaTitle: {
      fontSize: isMobile ? "30px" : "40px",
      marginBottom: "15px",
      lineHeight: "1.3",
    },

    ctaText: {
      fontSize: isMobile ? "15px" : "18px",
      marginBottom: "25px",
      lineHeight: "1.7",
    },

    ctaBtn: {
      padding: "15px 30px",
      border: "none",
      borderRadius: "12px",
      background: "#111",
      color: "#fff",
      cursor: "pointer",
      fontWeight: "700",
      fontSize: "15px",
      width: isMobile ? "100%" : "auto",
      maxWidth: isMobile ? "300px" : "auto",
    },
  };

  return (
    <div style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <div>
          <p style={styles.tag}>
            PREMIUM INTERNSHIP PLATFORM
          </p>

          <h1 style={styles.title}>
            Elevate Your{" "}
            <span style={styles.gold}>
              Career Journey
            </span>
          </h1>

          <p style={styles.desc}>
            Discover elite internships, connect
            with top companies, and shape your
            future with a platform designed for
            ambitious students.
          </p>

          <div style={styles.btnWrap}>
            <button
              style={styles.primaryBtn}
              onClick={() => navigate("/jobs")}
            >
              Explore Opportunities
            </button>

            <button
              style={styles.secondaryBtn}
              onClick={scrollToSection}
            >
              Learn More
            </button>
          </div>
        </div>

        {/* HERO CARD */}
        <div style={styles.heroCard}>
          <h3 style={styles.cardTitle}>
            Featured Opportunity
          </h3>

          <p style={styles.cardRole}>
            Frontend Developer Intern
          </p>

          <p style={styles.cardText}>
            Remote  Paid  Top Startup
          </p>

          <hr style={styles.line} />

          <p style={styles.cardMini}>
            Applications Open Now
          </p>

          <button
            style={styles.smallBtn}
            onClick={handleApply}
          >
            {isLoggedIn
              ? "Apply Now"
              : "Login To Apply"}
          </button>
        </div>
      </section>

      {/* STATS */}
      <section style={styles.stats}>
        <div style={styles.statBox}>
          <h2 style={styles.statNumber}>
            250+
          </h2>

          <p>Internships Listed</p>
        </div>

        <div style={styles.statBox}>
          <h2 style={styles.statNumber}>
            80+
          </h2>

          <p>Hiring Companies</p>
        </div>

        <div style={styles.statBox}>
          <h2 style={styles.statNumber}>
            1K+
          </h2>

          <p>Student Users</p>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="learn-more"
        style={styles.section}
      >
        <h2 style={styles.heading}>
          Why Choose InternHub
        </h2>

        <div style={styles.grid}>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>
              Exclusive Listings
            </h3>

            <p style={styles.featureText}>
              Access curated premium internships
              from trusted companies.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>
              Elegant Experience
            </h3>

            <p style={styles.featureText}>
              Luxury design crafted for modern
              ambitious students.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>
              Fast Applications
            </h3>

            <p style={styles.featureText}>
              Apply instantly and manage
              opportunities seamlessly.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={styles.cta}>
        <h2 style={styles.ctaTitle}>
          Ready To Start Your Career?
        </h2>

        <p style={styles.ctaText}>
          Join thousands of students building
          their future with InternHub.
        </p>

        <button
          style={styles.ctaBtn}
          onClick={() =>
            isLoggedIn
              ? navigate("/jobs")
              : navigate("/signup")
          }
        >
          {isLoggedIn
            ? "Browse Jobs"
            : "Create Account"}
        </button>
      </section>
    </div>
  );
}

export default Home;


