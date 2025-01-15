const mongoose = require("mongoose");
const User = require("../models/user.model");
require("dotenv").config();

async function assignAdminRole(email) {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return;
    }

    user.role = "admin";
    await user.save();
    console.log(`Admin role assigned to ${email}`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.connection.close();
  }
}

assignAdminRole("pubudushehankarunarathna@gmail.com"); // Replace with the actual admin email
