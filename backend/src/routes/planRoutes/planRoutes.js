const express = require("express");
const router = express.Router();

const Plan = require("../../model/plan");
const { requireAuth } = require("../../../middleware/auth");

const isAdmin = (req, res, next) => {
  // console.log("inside isAdmin", req);
  if (req.user && req.user.role === "admin") {
    // User is an admin
    next();
  } else {
  res.status(403).json({ message: "Unauthorized. Admin access required." });
  }
};

router.post("/addPlans", requireAuth, isAdmin, async (req, res) => {
  try {
    // console.log("req.user", req.user);
    console.log(req.body);
    const plan = new Plan({
      
    });

    await plan.save();
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/getPlans", async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.put("/plans/:id", requireAuth, isAdmin, async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!plan) {
      return res.status(404).json({ error: "Plan not found" });
    }
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.delete("/plans/:id", requireAuth, isAdmin, async (req, res) => {
  try {
    console.log("inside delete route", req.params.id);
    const plan = await Plan.findByIdAndDelete(req.params.id);
    if (!plan) {
      return res.status(404).json({ error: "Plan not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error"});
  }
});

module.exports = router;
