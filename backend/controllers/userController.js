const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateJWTToken } = require("./auth");

const register = async (req, res) => {
  try {
    console.log("Incoming registration data:", req.body);
    const {
      fullName,
      number,
      email,
      password,
      confirmPassword,
      role = "user",
    } = req.body;

    if (!fullName || !number || !email || !password || !confirmPassword) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newuser = new User({
      fullName,
      number,
      email,
      password: hashedPassword,
      role,
    });

    const saveduser = await newuser.save();
    console.log(saveduser);
    const { password: _, ...userWithoutPassword } = saveduser._doc;

    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ msg: "Error in registration" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const payload = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      number: user.number,
      role: user.role,
    };
    const accessToken = generateJWTToken(payload);
    return res.json({
      user: { ...payload, accessToken },
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ msg: "Error in login" });
  }
};



module.exports = { register, login };
