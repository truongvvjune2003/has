const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));

// Routes
const routes = require("./routes");
app.use("/api/auth", routes.authRoutes);
app.use("/api/upload", routes.uploadRoutes);
app.use("/api/patient", routes.patientRoutes);

app.get("/", (req, res) => {
  res.send({ success: true, message: "Welcome to Healthcare Appointment System" });
});

const PORT = process.env.PORT || 9999;
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
});
