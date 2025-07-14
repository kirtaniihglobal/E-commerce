const Sletter = require("../models/newsletter");

const addNewSletter = async (req, res) => {
  const { email } = req.body;
  try {
    const newSletter = new Sletter({ email: email });
    await newSletter.save();
    return res.status(201).json({
      msg: "NewSletter Add",
      status: true,
      rating: newSletter,
    });
  } catch (error) {
    console.error("Rating Error:", error);
    return res
      .status(500)
      .json({ status: false, msg: "Failed to Submit newSletter Add" });
  }
};

module.exports = { addNewSletter };
