const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtp } = require('./mailContoller');

router.get('/email/:email', sendOtp);
router.post('/otp', verifyOtp);

module.exports = router;
