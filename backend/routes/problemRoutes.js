const express = require("express");
const router = express.Router();
const Problem = require("../models/problem");

router.post("/add", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description required" });
    }
    const problem = new Problem(req.body);
    await problem.save();
    res.json({ success: true, message: "Problem Added", problem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/adopt/:id", async (req, res) => {
  try {
    const problem = await Problem.findByIdAndUpdate(
      req.params.id,
      { adopted: true },
      { new: true }
    );
    res.json({ success: true, message: "Adopted", problem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/solve/:id", async (req, res) => {
  try {
    const { solution } = req.body;
    if (!solution) {
      return res.status(400).json({ error: "Solution required" });
    }
    const problem = await Problem.findByIdAndUpdate(
      req.params.id,
      { solution },
      { new: true }
    );
    res.json({ success: true, message: "Solution submitted", problem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;