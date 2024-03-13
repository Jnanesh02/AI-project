const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const AdminModel = require("../../model/adminmodel");
const jwt = require("jsonwebtoken");
const { requireAuth } = require("../../../middleware/auth");

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
      // User is an admin
      next();
  } else {
      res.status(403).json({ message: "Unauthorized. Admin access required." });
  }
};



// router.post("/create/newAdmin", async (req, res) => {
//   try {

//     const { firstName, lastName, phoneNumber, Address, email,role } = req.body;
    
//     const existingAdmin = await AdminModel.findOne({ email: email });
//     let newAdmin;
//     if (existingAdmin) {
//       return res.status(409).json({ message: "already emails exist" });
//     } else {
//       // const generatePassword = `TEMP_${Math.random().toString(36).slice(-8)}`;
//       const saltRounds = 10;
//       console.log(saltRounds);
//       const hashedPassword = await bcrypt.hash(password, saltRounds);
//       console.log(hashedPassword);
  

//       newAdmin = await AdminModel.create({
//         email: email,
//         role:role,
//         firstName: firstName,
//         lastName: lastName,
//         phoneNumber: phoneNumber,
//         Address: Address,
//         password: hashedPassword ,
//       });

//       await newAdmin.save();
//     }
//     return res.status(200).json({ newAdmin });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });
// Assuming adminModel.js is in the same directory

router.post("/create/newAdmin", async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, Address, email, role } = req.body;

        const existingAdmin = await AdminModel.findOne({ email: email });
        if (existingAdmin) {
            return res.status(409).json({ message: "Email already exists" });
        } else {
            const generatePassword = `TEMP_${Math.random().toString(36).slice(-8)}`;
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(generatePassword, saltRounds);

            const newAdmin = await AdminModel.create({
                email: email,
                role: role,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                Address: Address,
                password: hashedPassword,
                // TEMP_ivpyn9hs
            });
console.log("new admin",newAdmin);
            // Construct the response object with both newAdmin data and generatedPassword
            const response = {
                ...newAdmin.toObject(),
                password: generatePassword 
            };
            // const studentdetail={name:"rakesh", age:23,name:"ramesh"}
          //   const response = {
          //     email: email,
          //     password: generatePassword,
          //     message: "Signup successful"
          // };

            return res.status(200).json(response);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// router.post("/admin/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const existingAdmin = await AdminModel.findOne({ email: email });
//     const existingAdminPassword = await AdminModel.findOne({
//       password: password,
//     });

//     if (!existingAdmin) {
//       return res.status(409).json({ message: "Invalid email" });
//     } else if (!existingAdminPassword) {
//       return res.status(409).json({ message: "Invalid password" });
//     }
//     if (!existingAdmin.password.startsWith("TEMP_")) {
//       // Check if the provided password matches the stored hashed password
//       const isMatch = await bcrypt.compare(password, existingUser.password);

//       if (!isMatch) {
//         return res.status(409).json({ message: "Invalid password" });
//       }
//     }
//     const token = jwt.sign({ adminId: existingAdmin._id,role:existingAdmin.role}, process.env.JWT_SECRET, {
//       expiresIn: "1h", // Token expires in 1 hour (adjust as needed)
//     });

//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(500).message(error.message);
//   }
// });
router.post("/admin/login", async (req, res) => {
try {
  const { email, password } = req.body;
  console.log("mailuserId", email, "password", password);
  const user = await AdminModel.findOne({email });
  
console.log("user",user);
  if (!user) {
    return res.status(403).json({ message: "Invalid Credentials" });
  }
  console.log("t",password,user.password);
  const matchedPassword = await bcrypt.compare(password, user.password);
  console.log("matchedpassword",matchedPassword );
  if (!matchedPassword) {
    return res.status(401).json({ error: "Invalid credential" });
  }
  const token = jwt.sign({ userId: user._id,userRole:user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Token expires in 1 hour (adjust as needed)
  });

  res.status(200).json({ token });
} catch (error) {
  console.error(error);
  res.status(500).json({ error: "Internal Server Error" });
};
});
router.get("/admins", async (req, res) => {
  try {
    const admins = await AdminModel.find();
    res.status(200).json({ admins });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get admin by ID
router.get("/admin/:id", async (req, res) => {
  try {
    const admin = await AdminModel.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Update admin by ID
router.put("/admin/edit",requireAuth, async (req, res) => {
  console.log(req.body,req.user);
  try {
    const { firstName, lastName, Address } = req.body;

    const updatedAdmin = await AdminModel.findByIdAndUpdate(
      req.user.id,
      {
        firstName,
        lastName,
        Address,  
      },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ updatedAdmin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete("/admin/delete",requireAuth ,async (req, res) => {
  try {
    // console.log("userId",req.user.userId)
    const deletedAdmin = await AdminModel.findByIdAndDelete(req.user._id);
    console.log("userId",req.user._id)
    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ deletedAdmin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put("/admin/changepassword",requireAuth,isAdmin,async (req,res)=> {
  try {
  
    const{oldPassword,newPassword}=req.body;
    console.log("old",oldPassword,"new",newPassword,req.user.password);
      

      // Check if the provided old password matches the one stored in the database
      const isMatch = await bcrypt.compare(oldPassword, req.user.password);
      console.log("isMatch",isMatch);
      if (!isMatch) {
          throw new Error('Old password is incorrect');
      }
    // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      console.log("before",req.user.password)

      req.user.password = hashedPassword;
      console.log("after",req.user.password)

      await req.user.save();
      res.status(200).json({ success: true, message: 'Password changed successfully'  });

      
  } catch (error) {
      return { success: false, message: error.message };
  }
});

module.exports = router;
