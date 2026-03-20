require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { initializeDatabase } = require("./models/db");
const authRoutes = require("./routes/authRoutes");
const companyRoutes = require("./routes/companyRoutes");
const regulationRoutes = require("./routes/regulationRoutes");
const deadlineRoutes = require("./routes/deadlineRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const preRegistrationRoutes = require("./routes/preRegistrationRoutes");
const errorHandler = require("./middleware/errorHandler");
const { startDeadlineNotificationJob } = require("./services/notificationService");

const app = express();
const PORT = Number(process.env.PORT || 4000);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  })
);
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/auth", authRoutes);
app.use("/companies", companyRoutes);
app.use("/regulations", regulationRoutes);
app.use("/deadlines", deadlineRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/pre-registrations", preRegistrationRoutes);

app.use(errorHandler);

const start = async () => {
  try {
    await initializeDatabase();
    startDeadlineNotificationJob();
    app.listen(PORT, () => {
      console.log(`Backend server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

start();
