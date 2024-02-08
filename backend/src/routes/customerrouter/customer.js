const Customer = require("../../model/customermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const express=require("express");
const router = express.Router();


// Signup logic
router.post("/signup", async (req, res) => {
  console.log("signup");
  try {
    const { userName, email,phoneNumber, password} = req.body;
    console.log(req.body);

    // Check if the username already exists
    const existingUser = await Customer.findOne({ userName:userName });
    console.log("1",existingUser);

    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const existingemail = await Customer.findOne({ email:email });
    console.log("1",existingemail);
    if (existingemail) {
      return res.status(409).json({ error: "email already exists" });
    };
    const existingphoneNumber = await Customer.findOne({ phoneNumber:phoneNumber });
    console.log("3",existingphoneNumber);
    if (existingphoneNumber) {
      return res.status(409).json({ error: "phoneNumber is  already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    console.log(saltRounds);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword);

    // Create a new customer
    const newCustomer = new Customer({
      userName: userName,
      email: email,
      phoneNumber:phoneNumber,
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
    console.log("mailNumberuserId", mailNumberuserId, "password", password);
    const user = await Customer.find({
      $or: [
        { username: { $regex: mailNumberuserId, $options: "i" } },
        { email: { $regex: mailNumberuserId, $options: "i" } },
        
      ],
    });
    console.log(user);

    if (!user) {
      return res.status(403).json({ message: "Invalid Credentials" });
    }

    const matchedPassword = await bcrypt.compare(password, user[0].password);

    console.log("matchedPassword", matchedPassword);
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
