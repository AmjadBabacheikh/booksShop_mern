import express from 'express';
const router = express.Router();
import {
  userAuth,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
} from '../controllers/userController.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';

// Post /api/users/login
//public
router.post('/login', userAuth);

//Get /api/users/profile
//private

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Post /api/users/
//public

router.post('/', registerUser);
router.get('/', protect, isAdmin, getUsers);
router.delete('/:id', protect, isAdmin, deleteUser);

export default router;
