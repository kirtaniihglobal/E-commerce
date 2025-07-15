const express = require("express");
const router = express.Router();
const {
  addNewSletter,
  getAllEmails,
  deleteEmail,
} = require("../controllers/sletterController");

router.post("/addSletter", addNewSletter);
router.get("/getEmails", getAllEmails);
router.delete("/deleteEmail/:id", deleteEmail);

module.exports = router;
