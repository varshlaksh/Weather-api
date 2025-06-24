const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!city) {
    return res.status(400).json({ error: "City is required in query" });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    res.status(200).json({
      city: response.data.name,
      temperature: response.data.main.temp + " °C",
      weather: response.data.weather[0].description,
      humidity: response.data.main.humidity + " %",
      wind: response.data.wind.speed + " m/s",
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather", details: err.response?.data || err.message });
  }
});

module.exports = router;
