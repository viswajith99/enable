const express = require('express');

const router = express.Router()
router.use(express.json());
const bcrypt = require('bcrypt');
const { User } = require('../Model/userModel');






router.post('/signup', async (req, res, next) => {
  try {
    const { name, password, email, mobile } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const user = new User({ name, password: hashedPassword, email, mobile });
    await user.save();

    res.status(201).json({
      message: "New user created."
    });
  } catch (error) {
    next(error);
  }
});



// router.get('/');

// router.put('/');

// router.delete('/')

module.exports = { userRouter: router }