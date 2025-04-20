const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authmid');
const User = require('../models/User');

router.get('/profile', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Remove password from response
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});
module.exports = router;