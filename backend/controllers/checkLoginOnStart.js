const checkLoginOnStart = async (req, res) => {
  try {
    // req.user is set by checkAuth middleware
    res.status(200).json({
      username: req.user.username,
      email: req.user.email
    });
  } catch (error) {
    console.error('Check login error:', error);
    res.status(500).json({ message: 'Error checking login status' });
  }
};

module.exports = checkLoginOnStart;