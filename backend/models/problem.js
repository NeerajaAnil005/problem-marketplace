const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  adopted: { type: Boolean, default: false },
  solution: { type: String, default: "" }, // <-- new field
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Problem", ProblemSchema);