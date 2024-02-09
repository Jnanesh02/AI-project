const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const adminSchema = require("../../model/adminmodel");
router.post("/create/newAdmin", async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, Address, email } = req.body;
    const existingAdmin = await adminSchema.findOne({ email: email });
    let newAdmin;
    if (existingAdmin) {
      return res.status(409).json({ message: "already emails exist" });
    } else {
      const generatePassword = `TEMP_${Math.random().toString(36).slice(-8)}`;

      newAdmin = await adminSchema.create({
        email: email,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        Address: Address,
        password: generatePassword,
      });

      await newAdmin.save();
    }
    return res.status(200).json({ newAdmin });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/admin/login", async (req, res) => {
  console.log("Admin:",req.body);
  try {
    const { email, password } = req.body;
    const existingAdmin = await adminSchema.findOne({ email: email });
    const existingAdminPassword = await adminSchema.findOne({
      password: password,
    });

    if (!existingAdmin) {
      return res.status(409).json({ message: "Invalid email" });
    } else if (!existingAdminPassword) {
      return res.status(409).json({ message: "Invalid email" });
    }
    if (!existingAdmin.password.startsWith("TEMP_")) {
      // Check if the provided password matches the stored hashed password
      const isMatch = await bcrypt.compare(password, existingUser.password);

      if (!isMatch) {
        return res.status(409).json({ message: "Invalid password" });
      }
    }
    return res.status(200).json({ message: existingAdmin });
  } catch (error) {
    res.status(500).message(error.message);
  }
});
module.exports = router;
