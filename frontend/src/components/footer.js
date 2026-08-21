import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  // RESPONSIVE CHECK
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

  return (
    <footer style={styles.footer}>
      <div
        style={{
          ...styles.top,
          gridTemplateColumns: isMobile
            ? "1fr"
            : "2fr 1fr 1fr",
          gap: isMobile ? "40px" : "35px",
        }}
      >
        {/* Brand */}
        <div style={styles.brandBox}>
          <h2
            style={{
              ...styles.logo,
              fontSize: isMobile ? "28px" : "34px",
            }}
          >
            Intern<span style={styles.gold}>Hub</span>
          </h2>

          <p
            style={{
              ...styles.desc,
              maxWidth: isMobile ? "100%" : "420px",
              fontSize: isMobile ? "14px" : "16px",
            }}
          >
            A premium internship platform crafted for
            ambitious students to discover elite
            opportunities and grow their careers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={styles.heading}>Quick Links</h3>

          <div style={styles.links}>
            <Link to="/" style={styles.link}>
              Home
            </Link>

            <Link to="/jobs" style={styles.link}>
              Jobs
            </Link>

            <Link to="/login" style={styles.link}>
              Login
            </Link>

            <Link to="/signup" style={styles.link}>
              Signup
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 style={styles.heading}>Contact</h3>

          <p style={styles.text}>
            support@internhub.com
          </p>

          <p style={styles.text}>
            Pune, Maharashtra
          </p>

          <p style={styles.text}>
            +91 98765 43210
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div
        style={{
          ...styles.bottom,
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
        }}
      >
        <p style={styles.copy}>
          © 2026 InternHub. All rights reserved.
        </p>

        <div
          style={{
            ...styles.bottomLinks,
            flexWrap: "wrap",
          }}
        >
          <span style={styles.small}>Privacy</span>

          <span style={styles.small}>Terms</span>

          <span style={styles.small}>Support</span>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background:
      "linear-gradient(135deg,#0f0f0f 0%, #151515 45%, #111111 100%)",
    color: "white",
    padding: "60px 40px 25px",
    borderTop:
      "1px solid rgba(212,175,55,0.12)",
    fontFamily: "Segoe UI, sans-serif",
  },

  top: {
    display: "grid",
    gap: "35px",
    marginBottom: "35px",
  },

  brandBox: {},

  logo: {
    marginBottom: "15px",
  },

  gold: {
    color: "#d4af37",
  },

  desc: {
    color: "#bdbdbd",
    lineHeight: "1.8",
  },

  heading: {
    fontSize: "18px",
    marginBottom: "16px",
    color: "#d4af37",
  },

  links: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  link: {
    textDecoration: "none",
    color: "#d1d5db",
    transition: "0.3s",
  },

  text: {
    color: "#d1d5db",
    marginBottom: "10px",
  },

  bottom: {
    borderTop: "1px solid #262626",
    paddingTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "15px",
  },

  copy: {
    color: "#9ca3af",
    fontSize: "14px",
  },

  bottomLinks: {
    display: "flex",
    gap: "18px",
  },

  small: {
    color: "#9ca3af",
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default Footer;


