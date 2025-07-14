const express = require("express");
const router = express.Router();
const { addNewSletter } = require("../controllers/sletterController");

router.post("/addSletter", addNewSletter);

module.exports = router;
