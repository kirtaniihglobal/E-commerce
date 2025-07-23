const express = require("express");
const router = express.Router();
const { payment } = require("../controllers/paymentController");
const { webhook } = require("../controllers/webhookController");
const { verifyToken } = require("../middleware/auth");

router.post("/sendPayment", verifyToken, payment);

router.post("/webhook", webhook);

module.exports = router;
