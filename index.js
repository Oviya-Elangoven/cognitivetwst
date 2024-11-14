console.log("Starting server...");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const CognitiveTest = require("./models/CognitiveTest");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = "mongodb://localhost:27017/brainHealth"; // Replace with MongoDB Atlas URL if needed
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// API Endpoint to save cognitive test data
app.post("/brain-health/cognitive-test", async (req, res) => {
  try {
    const { userId, testType, testScore, timeTaken } = req.body;
    const cognitiveTest = new CognitiveTest({ userId, testType, testScore, timeTaken });
    const savedTest = await cognitiveTest.save();

    // Send the custom response
    res.json({
      result: "Cognitive analysis data submitted successfully!",
      analysis: "Do creative outlets like painting and other art forms, learning an instrument, doing expressive or autobiographical writing, and learning a language."
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to save cognitive test data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
