const express = require("express");
const dotenv = require("dotenv");
const weatherRoute = require("./routes/weather");

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/weather", weatherRoute);

// Default route
app.get("/", (req, res) => {
  res.send("🌦️ Weather API is running! Use /api/weather?city=CityName");
});

// Start server
app.listen(5000, () => {
  console.log("✅ Server running at http://localhost:5000");
});
