require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db");
const userRoutes = require("./routes/userRoutes");
const authMiddleware = require("./middleware/auth");
const equbRoutes = require("./routes/equbRoutes");
const equbDrawRoutes = require("./routes/equbDrawRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const chatRoutes = require("./routes/chatRoutes");

// Express app

const app = express();
app.use(express.json());

app.use(cors()); // This allows all origins to make requests

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/users", userRoutes);

// Protected route
app.get("/api/home", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to the home page", user: req.user.email });
});

// Use Equb routes
app.use("/api/equbs", authMiddleware, equbRoutes); // Authenticated users only
// Use Equb draw routes
app.use("/api/equb-draws", authMiddleware, equbDrawRoutes); // Authenticated users only
//notification routes
app.use("/api/notifications", authMiddleware, notificationRoutes); // Authenticated users
//chat routes
app.use("/api/chat", authMiddleware, chatRoutes); // Authenticated users

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
