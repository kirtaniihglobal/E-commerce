const NewsLetter = require("../models/newsletter");

const addNewSletter = async (req, res) => {
  const { email } = req.body;
  try {
    const findEmail = await NewsLetter.findOne({ email: email });
    console.log("findEmail", findEmail);
    if (!findEmail) {
      const newSletter = new NewsLetter({ email: email });
      await newSletter.save();
      return res.status(201).json({
        msg: "Email Added to NewsLetter",
        status: true,
        newSletter,
      });
    } else {
      return res.status(400).json({ msg: "Email Already ADD !", status: true });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, msg: "Failed to Submit newSletter Add" });
  }
};
const getAllEmails = async (req, res) => {
  try {
    const allEmails = await NewsLetter.find({});
    console.log(allEmails);
    return res
      .status(200)
      .json({ msg: "Fetch All Emails", status: true, allEmails });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Failed to Fetch Emails", status: false });
  }
};
const deleteEmail = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteEmail = await NewsLetter.findByIdAndDelete(id);
    console.log(deleteEmail);
    return res
      .status(200)
      .json({ msg: "Delete Email SuccessFully !", status: true, deleteEmail });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Failed to delete Email", status: false });
  }
};

module.exports = { addNewSletter, getAllEmails, deleteEmail };
