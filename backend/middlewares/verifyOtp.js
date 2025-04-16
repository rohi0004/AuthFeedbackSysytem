const Otp = require('../models/Otp');

const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) {
      return res.status(400).json({ message: 'OTP expired or invalid' });
    }

    if (otpRecord.otp !== otp) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    await Otp.deleteOne({ email });
    next();
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ message: 'Error verifying OTP' });
  }
};

module.exports = verifyOtp;