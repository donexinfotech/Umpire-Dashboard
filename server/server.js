const express = require('express');
const app = express();
const connectDb = require("./utils/db");
const cors = require("cors");
const authRoute = require("./router/Auth-router");
const availabilityRoute = require('./router/Availablity-router');
const reviewRoute = require("./router/Reviews-router");

// CORS configuration to allow localhost during development and Vercel in production
const allowedOrigins = [
  'http://localhost:3000', // Localhost for React development server (or whatever port you're using)
  'https://umpire-dashboard.vercel.app', // Replace with your Vercel frontend URL
];

// CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,  // Allows credentials (cookies, authorization headers) to be sent
  allowedHeaders: 'Content-Type, Authorization',
}));

app.use(express.json());

// API routes
app.use("/api/auth", authRoute);
app.use("/api/availablity", availabilityRoute);
app.use("/api/reviews", reviewRoute);

// Basic test route to check if server is running
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Default CORS test route
app.get('/test', (req, res) => {
  res.json({ message: 'CORS working' });
});

// Listen on the Vercel default port or local port 5000 for development
const PORT = process.env.PORT || 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
