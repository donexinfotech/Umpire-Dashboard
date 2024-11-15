const cors = require("cors");
const express = require("express");
const app = express();
const connectDb = require("./utils/db");
const authRoute = require("./router/Auth-router");
const availabilityRoute = require("./router/Availablity-router");
const reviewRoute = require("./router/Reviews-router");

app.use(cors({
  origin: ['https://umpire-dashboard.vercel.app', 'http://localhost:5173'],  // Allowing the frontend URLs
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  allowedHeaders: 'Content-Type,Authorization',
}));

app.use(express.json());  // Body parsing middleware
app.use(express.urlencoded({ extended: true }));  // URL encoded form data handling

// API routes
app.use("/api/auth", authRoute);
app.use("/api/availablity", availabilityRoute);
app.use("/api/reviews", reviewRoute);

// Test route to confirm server is running
app.get("/", (req, res) => {
  res.status(200).send("Server is running");
});

const PORT = process.env.PORT || 5000;  // Ensure it listens on the correct port

// Start server after DB connection
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
