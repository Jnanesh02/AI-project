const Customer = require("../../model/customermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const express = require("express");
const router = express.Router();

// Signup logic
router.post("/signup", async (req, res) => {
  console.log("signup");
  try {
    const { userName, email, phoneNumber, password } = req.body;

    // Check if the username already exists
    const existingUser = await Customer.findOne({
      $or: [
        { userName: userName },
        { email: email },
        { phoneNumber: phoneNumber },
      ],
    });

    if (existingUser) {
      if (existingUser.userName === userName) {
        return res.status(409).json({ error: "Username already exists" });
      }
      if (existingUser.email === email) {
        return res.status(409).json({ error: "Email already exists" });
      }
      if (existingUser.phoneNumber === phoneNumber) {
        return res.status(409).json({ error: "Phone number already exists" });
      }
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new customer
    const newCustomer = new Customer({
      userName: userName,
      email: email,
      phoneNumber: phoneNumber,
      password: hashedPassword,
    });
    await newCustomer.save();
    res.status(201).json({ message: "the customer save successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { mailNumberuserId, password } = req.body;
    const user = await Customer.find({
      $or: [
        { username: { $regex: mailNumberuserId, $options: "i" } },
        { email: { $regex: mailNumberuserId, $options: "i" } },
      ],
    });

    if (!user) {
      return res.status(403).json({ message: "Invalid Credentials" });
    }

    const matchedPassword = await bcrypt.compare(password, user[0].password);
    if (!matchedPassword) {
      return res.status(401).json({ error: "Invalid credential" });
    }
    const token = jwt.sign({ userId: user[0]._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour (adjust as needed)
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
