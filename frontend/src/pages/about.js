import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AboutInternHub({ theme }) {
  const navigate = useNavigate();

  const isDark = theme === "dark";

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      border: `1px solid ${isDark ? "#555" : "#ccc"}`,
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
      backgroundColor: isDark ? "#171717" : "#ffffff",
      padding: isMobile ? "25px" : "30px",
      borderRadius: "20px",
      textAlign: "center",
      border: isDark ? "1px solid #262626" : "1px solid #ddd",
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
      backgroundColor: isDark ? "#171717" : "#ffffff",
      padding: isMobile ? "24px" : "30px",
      borderRadius: "20px",
      border: isDark ? "1px solid #262626" : "1px solid #ddd",
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
          <p style={styles.tag}>ABOUT INTERNHUB</p>

          <h1 style={styles.title}>
            Start Your
            <br />
            <span style={styles.gold}>Career Journey</span>
            <br />
            With InternHub.
          </h1>

          <p style={styles.desc}>
            InternHub is a modern internship platform designed to help
            students and fresh graduates discover meaningful opportunities,
            build valuable experience, and take their first step toward a
            successful career.
          </p>

          <div style={styles.btnWrap}>
            <button
              style={styles.primaryBtn}
              onClick={() => navigate("/jobs")}
            >
              Explore Internships
            </button>

            <button
              style={styles.secondaryBtn}
              onClick={() => navigate("/signup")}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* HERO CARD */}
        <div style={styles.heroCard}>
          <p style={styles.cardTitle}>WHY INTERNHUB?</p>

          <h2 style={styles.cardRole}>
            Opportunities that move you forward.
          </h2>

          <p style={styles.cardText}>
            Finding your first internship should not feel complicated.
            InternHub brings opportunities and students together through
            a simple and focused platform.
          </p>

          <hr style={styles.line} />

          <p style={styles.cardMini}>
            ✓ Discover internship opportunities
          </p>

          <p style={styles.cardMini}>
            ✓ Apply with ease
          </p>

          <p style={styles.cardMini}>
            ✓ Track your applications
          </p>

          <p style={styles.cardMini}>
            ✓ Build real-world experience
          </p>
        </div>
      </section>

      {/* STATS */}
      <section style={styles.stats}>
        <div style={styles.statBox}>
          <h2 style={styles.statNumber}>01</h2>
          <p>Discover Opportunities</p>
        </div>

        <div style={styles.statBox}>
          <h2 style={styles.statNumber}>02</h2>
          <p>Build Your Profile</p>
        </div>

        <div style={styles.statBox}>
          <h2 style={styles.statNumber}>03</h2>
          <p>Apply With Confidence</p>
        </div>

        <div style={styles.statBox}>
          <h2 style={styles.statNumber}>04</h2>
          <p>Grow Your Career</p>
        </div>
      </section>

      {/* WHAT IS INTERNHUB */}
      <section style={styles.section}>
        <h2 style={styles.heading}>
          What is <span style={styles.gold}>InternHub?</span>
        </h2>

        <div style={styles.grid}>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>
              Built For Students
            </h3>

            <p style={styles.featureText}>
              InternHub is designed with students and fresh graduates
              in mind. It provides a focused place to discover internship
              opportunities and begin building professional experience.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>
              Career Opportunities
            </h3>

            <p style={styles.featureText}>
              Explore opportunities across different roles, companies,
              locations and internship types to find experiences that
              match your career interests.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>
              Simple Experience
            </h3>

            <p style={styles.featureText}>
              From discovering an opportunity to submitting an application,
              InternHub keeps the experience straightforward and easy to
              navigate.
            </p>
          </div>
        </div>
      </section>

      {/* WHY INTERNHUB */}
      <section style={styles.section}>
        <h2 style={styles.heading}>
          Why Choose <span style={styles.gold}>InternHub?</span>
        </h2>

        <div style={styles.grid}>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>
              Discover Opportunities
            </h3>

            <p style={styles.featureText}>
              Browse internship opportunities and explore roles that
              can help you gain practical experience in your field.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>
              Build Your Profile
            </h3>

            <p style={styles.featureText}>
              Create your professional presence by providing your
              personal, educational and career information.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>
              Easy Applications
            </h3>

            <p style={styles.featureText}>
              Find an opportunity you like and submit your application
              through a simple application process.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>
              Track Progress
            </h3>

            <p style={styles.featureText}>
              Keep track of your submitted applications and stay informed
              about their current status.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>
              Resume Ready
            </h3>

            <p style={styles.featureText}>
              Present your professional information and resume so that
              your skills and qualifications are ready when opportunities
              come your way.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>
              Career Growth
            </h3>

            <p style={styles.featureText}>
              Every internship can be a chance to develop skills,
              understand your industry and gain experience for your
              future career.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={styles.section}>
        <h2 style={styles.heading}>
          How <span style={styles.gold}>InternHub</span> Works
        </h2>

        <div style={styles.grid}>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>01. Create Your Account</h3>

            <p style={styles.featureText}>
              Sign up and create your InternHub account to get started
              with your internship search.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>02. Explore Jobs</h3>

            <p style={styles.featureText}>
              Browse available internship opportunities and find roles
              that match your interests and career goals.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>03. Apply</h3>

            <p style={styles.featureText}>
              Select an opportunity and submit your application with
              your relevant information and resume.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>04. Track Your Journey</h3>

            <p style={styles.featureText}>
              Monitor your applications and stay updated as your
              internship journey progresses.
            </p>
          </div>
        </div>
      </section>

      {/* FOR STUDENTS */}
      <section style={styles.section}>
        <div style={styles.hero}>
          <div>
            <p style={styles.tag}>FOR STUDENTS</p>

            <h2 style={styles.title}>
              Turn your
              <br />
              <span style={styles.gold}>potential</span>
              <br />
              into experience.
            </h2>
          </div>

          <div style={styles.heroCard}>
            <h3 style={styles.cardTitle}>
              YOUR CAREER STARTS HERE
            </h3>

            <p style={styles.cardText}>
              Internships are an opportunity to move beyond classroom
              learning and experience how your skills work in the real
              world.
            </p>

            <p style={styles.cardMini}>
              ✓ Gain practical experience
            </p>

            <p style={styles.cardMini}>
              ✓ Develop professional skills
            </p>

            <p style={styles.cardMini}>
              ✓ Understand your career interests
            </p>

            <p style={styles.cardMini}>
              ✓ Strengthen your resume
            </p>

            
          </div>
        </div>
      </section>

      {/* FOR COMPANIES */}
      <section style={styles.section}>
        <h2 style={styles.heading}>
          For <span style={styles.gold}>Companies</span>
        </h2>

        <div style={styles.grid}>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>
              Find Emerging Talent
            </h3>

            <p style={styles.featureText}>
              Connect with students and fresh graduates who are looking
              for opportunities to gain practical experience.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>
              Manage Applications
            </h3>

            <p style={styles.featureText}>
              Review internship applications and manage candidate
              responses through the platform's application workflow.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>
              Build Future Talent
            </h3>

            <p style={styles.featureText}>
              Give students an opportunity to work on real projects
              while identifying promising talent for future roles.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={styles.section}>
        <h2 style={styles.heading}>
          Everything You Need
        </h2>

        <div style={styles.grid}>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>
              Internship Listings
            </h3>

            <p style={styles.featureText}>
              Explore available internship roles and discover new
              opportunities for your career.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>
              Application Management
            </h3>

            <p style={styles.featureText}>
              Keep your internship applications organized and monitor
              their progress.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>
              Resume Support
            </h3>

            <p style={styles.featureText}>
              Keep your resume ready so you can present your skills and
              experience when applying.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>
              Student Dashboard
            </h3>

            <p style={styles.featureText}>
              Access your account, applications and career information
              from one convenient place.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>
              Admin Management
            </h3>

            <p style={styles.featureText}>
              Manage internship applications and review candidate
              information through the admin dashboard.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>
              Responsive Design
            </h3>

            <p style={styles.featureText}>
              Access InternHub comfortably across desktop, tablet and
              mobile devices.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={styles.cta}>
        <h2 style={styles.ctaTitle}>
          Your next opportunity
          <br />
          could start here.
        </h2>

        <p style={styles.ctaText}>
          Explore internships, build your experience and take the next
          step toward your career with InternHub.
        </p>

        <button
          style={styles.ctaBtn}
          onClick={() => navigate("/jobs")}
        >
          Explore Internships
        </button>
      </section>

    </div>
  );
}

export default AboutInternHub;