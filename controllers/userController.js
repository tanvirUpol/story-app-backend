import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.JWT_SECRET_KEY, {expiresIn: '9999 years'})
}

// @access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  
  if(user && (await user.matchPassword(password))){
      // for cookies
      // generateToken(res, user._id)
      const token = createToken(user._id)
      res.status(201).json({
          _id: user._id,
          email: user.email,
          user: user.username,
          token: token
      });
  } else {
      res.status(401);
      throw new Error('Invalid email or password');
  }
});

// Create a new user
const createUser =asyncHandler( async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({email: email})

    if (userExists) {
      res.status(400);
      throw new Error('User already exists')
    }

    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get all users
const getAllUsers =asyncHandler(  async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific user
const getUser =asyncHandler(  async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user
const updateUser = asyncHandler(  async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, password },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a user
const deleteUser = asyncHandler( async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export  {
  authUser,
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
