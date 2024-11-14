const mongoose = require("mongoose");

const cognitiveTestSchema = new mongoose.Schema({
  userId: String,
  testType: String,
  testScore: Number,
  timeTaken: Number,
  date: { type: Date, default: Date.now }
});

const CognitiveTest = mongoose.model("CognitiveTest", cognitiveTestSchema);
module.exports = CognitiveTest;
