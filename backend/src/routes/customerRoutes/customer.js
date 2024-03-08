const Customer = require("../../model/customermodel");
const Plan = require("../../model/plan");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const express = require("express");
const router = express.Router();
const moment = require("moment");
const json2csv = require("json2csv").parse;
const fs = require("fs");
const { requireAuth, isAdmin } = require("../../../middleware/auth");

// Signup logic
router.post("/signup/customer", async (req, res) => {
  console.log("signup");
  try {
    const {
      firstName,
      lastName,
      email,
      mobileNumber,
      password,
      // subscriptionPlanId,
    } = req.body;
    console.log(req.body);

    // Check if the username already exists
    const existingUser = await Customer.findOne({
      $or: [{ email: email }, { phoneNumber: mobileNumber }],
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
    // const subscriptionPlan = await Plan.findById(subscriptionPlanId);

    // if (!subscriptionPlan) {
    //   return res.status(400).json({ error: "Invalid subscription plan ID" });
    // }

    // Create a new customer
    const newCustomer = new Customer({
      firstName: firstName,
      lastName: lastName,
      // userName: userName,
      email: email,
      phoneNumber: mobileNumber,
      password: hashedPassword,
      // subscriptionPlan: subscriptionPlan._id,
    });
    await newCustomer.save();
    res.status(201).json({
      userId: newCustomer._id,
      role: newCustomer.role,
      message: "The customer saved successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login/customer", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("email", email, "password", password);

    const user = await Customer.findOne({
      $or: [
        
        { email: { $regex: email, $options: "i" } },
      ],
    });

    if (!user) {
      return res.status(403).json({ message: "Invalid Credentials" });
    }

    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return res.status(401).json({ error: "Invalid credential" });
    }

    user.lastActiveDate = moment(new Date()).format("DD/MM/YYYY HH:mm");

    // Save the user with the updated lastActiveDate
    await user.save();

    const token = jwt.sign(
      { userId: user._id, userRole: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // Token expires in 1 hour (adjust as needed)
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/customer", requireAuth, isAdmin, async (req, res) => {
  try {
    // Check if the authenticated user is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    // Fetch and return all customer details
    // const customers = await Customer.find();
    const customers = await Customer.find();
    // .populate("subscriptionPlan");
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// router.get("/export/customer", requireAuth, isAdmin, async (req, res) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ message: "Access denied. Admins only." });
//   }
//   try {
//     const customers = await Customer.find({});
//     // console.log("backend customer export route", customers);
//     const fields = Object.keys(customers[0]);
//     const csv = json2csv(customers, { fields });
//     fs.writeFileSync("customers.csv", csv, "utf8");
//     res.download("customers.csv");
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: err.message });
//   }
// });

router.get("/export/customer", requireAuth, isAdmin, async (req, res) => {
  if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
  }
  try {
      const customers = await Customer.find({});
      if (customers.length === 0) {
          return res.status(404).json({ message: "No customers found." });
      }

      let csv = '';

      // Extract column names
      const columns = Object.keys(customers[0].toObject());

      // Add column names to CSV
      csv += columns.join(",") + "\n";

      // Iterate over each customer
      customers.forEach(customer => {
          const customerData = customer.toObject(); // Convert Mongoose document to plain JavaScript object

          // Convert usage object to a string with a custom delimiter
          const usageString = JSON.stringify(customerData.usage).replace(/,/g, ';');

          // Replace the usage object in the customer data with the string representation
          customerData.usage = usageString;

          // Convert object to CSV row
          const row = columns.map(column => {
              const value = customerData[column];
              return typeof value === 'object' ? JSON.stringify(value) : value;
          }).join(",");

          csv += row + "\n"; // Append row to CSV string
      });

      // Write CSV to file
      fs.writeFileSync("customers.csv", csv, "utf8");

      // Send CSV file as a download
      res.download("customers.csv");
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: err.message });
  }
});

router.put("/customer", requireAuth, async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.user._id, // Use req.user._id directly
      req.body,
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(updatedCustomer);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.delete(
  "/customer/:customerId",
  requireAuth,
  isAdmin,
  async (req, res) => {
    try {
      const customerIdToDelete = req.params.customerId;
      const deletedCustomer = await Customer.findByIdAndDelete(
        customerIdToDelete
      );

      if (!deletedCustomer) {
        return res.status(404).json({ message: "Customer not found" });
      }

      res.json({ message: "Customer deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

module.exports = router;
