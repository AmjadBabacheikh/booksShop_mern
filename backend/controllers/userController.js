import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { generateToken } from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

const userAuth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('email or password invalid');
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('user not found');
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashed_password = await bcrypt.hash(req.body.password, salt);
      user.password = hashed_password || user.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('user not found');
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    res.status(400);
    throw new Error('user existed already');
  }
  const salt = await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hash(password, salt);
  const newUser = new User({
    name: name,
    email: email,
    password: hashed_password,
  });
  const userRegistred = await newUser.save();
  if (userRegistred) {
    res.send({
      _id: userRegistred._id,
      name: userRegistred.name,
      email: userRegistred.email,
      isAdmin: userRegistred.isAdmin,
      token: generateToken(userRegistred._id),
    });
  } else {
    res.status(400);
    throw new Error('wrong user data');
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (user) {
    await user.remove();
    res.json({ message: 'user removed ' });
  } else {
    res.status(404);
    throw new Error('user not found');
  }
});

export {
  userAuth,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
};
