const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobroutes");
const applicationRoutes = require("./routes/applicationRoutes");

app.use("/api/applications", applicationRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    // Start server AFTER DB connection
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });
