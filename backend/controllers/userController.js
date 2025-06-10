const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateJWTToken } = require("../middleware/auth");

const register = async (req, res) => {
  try {
    console.log("Incoming registration data:", req.body);
    const {
      fullName,
      number,
      email,
      password,
      confirmPassword,
      role = "user"
    } = req.body;

    if (!fullName || !number || !email || !password || !confirmPassword) {
      return res.status(400).json({ msg: "All fields are required", status: 400 });
    }
    const findEmail = await User.findOne({ email });
    if (findEmail) {
      return res.status(400).json({ msg: "Email is Already used", status: 400 });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      number,
      email,
      password: hashedPassword,
      role,
    })
    console.log(newUser);

    return res.status(201).json({ status: 200, msg: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ status: 500, msg: "Registration Failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetails = await User.findOne({ email });

    if (!userDetails) {
      return res.status(400).json({ status: 400, msg: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, userDetails.password);
    if (!isMatch) {
      return res.status(400).json({ status: 400, msg: "Invalid credentials" });
    }
    const user = {
      id: userDetails.id,
      fullName: userDetails.fullName,
      email: userDetails.email,
      number: userDetails.number,
      role: userDetails.role,
    };
    const token = generateJWTToken(user);
    return res.status(200).json({ status: 200, msg: "User login successfully", user, token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ status: 500, msg: "Login Failed" });
  }
};
const profileDetail = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ status: 500, message: "Error fetching user" });
  }
}



module.exports = { register, login, profileDetail };
