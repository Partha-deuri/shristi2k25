const User = require('../models/User');
const OTP = require('../models/OTP');
const sendMail = require('./mailer');

exports.sendOtp = async (req, res) => {
    try {
        console.log("email", req.params.email);
        const oldUser = await User.findOne({ email: req.params.email });

        if (!oldUser) {
            let otp = 0;
            while (otp < 100000) otp = Math.floor((Math.random() * 1000000) + 1);
            const newOTP = new OTP({
                email: req.params.email,
                otp, 
            });
            const savedOtp = await newOTP.save();
            sendMail({
                userEmail: req.params.email,
                code: otp,
            });
            console.log("email", req.params.email);
            return res.status(200).json({ msg: "all ok", otpId: savedOtp._id });
        } else {
            return res.status(200).json({ msg: "email already in use" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.verifyOtp = async (req, res) => {
    try {
        const oldOTP = await OTP.findById(req.body.otpId);
        if (!oldOTP) return res.status(404).json({ msg: "otp expired" });
        if (oldOTP.otp === req.body.otp && oldOTP.email === req.body.email) {
            await oldOTP.deleteOne();
            await OTP.deleteMany({ email: req.body.email });
            return res.status(200).json({ msg: "success" });
        }
        return res.status(403).json({ msg: "otp mismatch" });
    } catch (err) {
        res.status(500).json(err);
    }
};
