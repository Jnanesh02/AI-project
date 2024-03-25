const express = require("express");
const router = express.Router();

const AssistanceInstructionModel = require("../../model/assistanceInstruction");
const { requireAuth, isAdmin } = require("../../../middleware/auth");

// POST a new AssistanceInstruction
router.post(
  "/assistance-instructions",
  requireAuth,
  isAdmin,
  async (req, res) => {
    const { tone, description } = req.body;

    try {
      // Validation
      if (!tone) {
        return res.status(400).json({ message: "Tone is required" });
      }

      const newInstruction = await AssistanceInstructionModel.create({
        tone,
        description,
      });
      await newInstruction.save();
      res.status(201).json(newInstruction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// GET all AssistanceInstructions
router.get("/all-assistance-instructions", async (req, res) => {
  try {
    const instructions = await AssistanceInstructionModel.find();
    res.json(instructions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET a specific AssistanceInstruction by ID


router.get("/single-assistance-instructions/:id", async (req, res) => {
  try {
    const instruction = await AssistanceInstructionModel.findById(
      req.params.id
    );
    if (!instruction) {
      return res
        .status(404)
        .json({ message: "AssistanceInstruction not found" });
    }
    res.json(instruction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// PUT (Update) a specific AssistanceInstruction by ID
router.put(
  "/update-assistance-instructions/:id",
  requireAuth,
  isAdmin,
  async (req, res) => {
    try {
      // Validation
      if (!req.body.tone || !req.body.description) {
        return res
          .status(400)
          .json({ message: "Tone and description are required fields." });
      }

      const updatedInstruction =
        await AssistanceInstructionModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

      if (!updatedInstruction) {
        return res
          .status(404)
          .json({ message: "AssistanceInstruction not found" });
      }
      await updatedInstruction.save();
      res.json(updatedInstruction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
); 

// DELETE a specific AssistanceInstruction by ID
router.delete(
  "/delete-assistance-instructions/:id",
  requireAuth,
  isAdmin,
  async (req, res) => {
    try {
      const deletedInstruction =
        await AssistanceInstructionModel.findByIdAndDelete(req.params.id);

      if (!deletedInstruction) {
        return res
          .status(404)
          .json({ message: "AssistanceInstruction not found" });
      }

      res.json({ message: "AssistanceInstruction deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

module.exports = router;
