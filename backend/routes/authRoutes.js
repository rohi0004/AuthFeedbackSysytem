const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const verifyOtp = require('../middlewares/verifyOtp');

// Import controllers
const loginUser = require('../controllers/loginUser');
const registerUser = require('../controllers/registerUser');
const logoutUser = require('../controllers/logoutUser');
const sendOtp = require('../controllers/sendOtp');
const forgotPassword = require('../controllers/forgotPassword');
const resetPassword = require('../controllers/resetPassword');
const changePassword = require('../controllers/changePassword');
const checkLoginOnStart = require('../controllers/checkLoginOnStart');
const googleLoginUser = require('../controllers/googleLoginUser');

// Public routes
router.post('/login', loginUser);
router.post('/google-login', googleLoginUser);
router.post('/generate-otp', sendOtp);
router.post('/register', verifyOtp, registerUser);
router.post('/forgot-pass', forgotPassword);
router.post('/reset-pass/:token', resetPassword);

// Protected routes (require authentication)
router.use(checkAuth);
router.get('/check-login-on-start', checkLoginOnStart);
router.post('/change-pass', changePassword);
router.post('/logout', logoutUser);

module.exports = router;