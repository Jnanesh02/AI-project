const Customer = require("../../model/customermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const express = require("express");
const router = express.Router();

// Signup logic
router.post("/signup", async (req, res) => {
  console.log("signup", req.body);
  try {
    const { firstName, lastName, email, password, mobileNumber } = req.body;
    console.log(req.body);

    // Check if the username already exists
    const existingUser = await Customer.findOne({
      $or: [
        { firstName: firstName },
        { lastName: lastName },
        { email: email },
        { phoneNumber: mobileNumber },
      ],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(409).json({ error: "Email already exists" });
      }
      if (existingUser.phoneNumber === mobileNumber) {
        return res.status(409).json({ error: "Phone number already exists" });
      }
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new customer
    const newCustomer = new Customer({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: mobileNumber,
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
  console.log("login:", req.body);
  try {
    const { email, password } = req.body;
    const user = await Customer.find({
      email: email,
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
