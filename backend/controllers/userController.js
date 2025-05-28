const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { fullName, number, email, password, confirmPassword } = req.body;

    console.log("Incoming registration data:", req.body);

    if (!req.file) {
      return res.status(400).json({ msg: "Profile image is required" });
    }

    if (!fullName || !number || !email || !password || !confirmPassword) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const profileImage = req.file.filename;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newuser = new User({
      fullName,
      number,
      email,
      password: hashedPassword,
      profileImage,
    });

    const saveduser = await newuser.save();
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

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.fullName,
        email: user.email,
        number: user.number,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ msg: "Error in login" });
  }
};

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).send("Invalid token.");
  }
}

module.exports = { register, login, verifyToken };
