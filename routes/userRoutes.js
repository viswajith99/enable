const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../Model/userModel');

router.use(express.json());

const saltRounds = 10;


router.post('/signup', async (req, res, next) => {
  try {
    const { name, password, email, mobile } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const user = new User({ name, password: hashedPassword, email, mobile });
    await user.save();

    res.status(201).json({ message: 'New user created.' });
  } catch (error) {
    next(error);
  }
});


router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    next(error);
  }
});


router.get('/users', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});


router.put('/users/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, mobile } = req.body;

    const user = await User.findByIdAndUpdate(id, { name, email, mobile }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    next(error);
  }
});

router.delete('/users/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully', user });
  } catch (error) {
    next(error);
  }
});

module.exports = { userRouter: router };
